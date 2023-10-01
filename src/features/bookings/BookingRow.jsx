import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowCircleDown, HiArrowCircleUp, HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { HiEllipsisVertical, HiTrash } from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useCreateUpdateDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  }}) {

    const statusToTagName = {
      unconfirmed: "blue",
      "checked-in": "green",
      "checked-out": "silver",
    };

    const { checkout, isCheckingOut } = useCheckout()
    const {deleteBooking, isDeleting} = useDeleteBooking()

    const navigate = useNavigate()

    return (
      <Modal>
        <Table.Row>
          <Cabin>{cabinName}</Cabin>

          <Stacked>
            <span>{guestName}</span>
            <span>{email}</span>
          </Stacked>

          <Stacked>
            <span>
              {isToday(new Date(startDate))
                ? "Today"
                : formatDistanceFromNow(startDate)}{" "}
              &rarr; {numNights} night stay
            </span>
            <span>
              {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
              {format(new Date(endDate), "MMM dd yyyy")}
            </span>
          </Stacked>

          <Tag type={statusToTagName[status]}>{status?.replace("-", " ")}</Tag>

          <Amount>{formatCurrency(totalPrice)}</Amount>
          <Menus>
            <Menus.Toggle id={bookingId}>
              <HiEllipsisVertical />
            </Menus.Toggle> 
            <Menus.List id={bookingId}>
              <Menus.Button icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}>See details</Menus.Button>
              {
              status === 'unconfirmed' && <Menus.Button icon={<HiArrowCircleDown />} onClick={() => navigate(`/check-in/${bookingId}`)}>Check In</Menus.Button>
              }
              {
              status === 'checked-in' && <Menus.Button icon={<HiArrowCircleUp />} onClick={() => {
                checkout(bookingId)
              }} disabled={isCheckingOut}>Check Out</Menus.Button>
              }
              <Modal.Open opens='booking-delete_'>
                <Menus.Button icon={<HiTrash />} variation="danger">Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="booking-delete_">
              <ConfirmDelete resourceName={`Booking #${bookingId}`} disabled={isDeleting} onConfirm={() => deleteBooking(bookingId)} />
            </Modal.Window>
          </Menus>    
        </Table.Row>
      </Modal>
    );
}

export default BookingRow;
