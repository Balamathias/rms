import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking, useDeleteBooking } from "./useCreateUpdateDeleteBooking";
import { MiniPuffSpinner } from "../../ui/Spinner";
import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiTrash } from "react-icons/hi2";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking = {}, isLoading } = useBooking()

  
  const moveBack = useMoveBack();
  const navigate = useNavigate()
  const { checkout, isCheckingOut } = useCheckout()
  const { deleteBooking, isDeleting } = useDeleteBooking()
  const { status } = booking || '';

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <MiniPuffSpinner color="blue" />

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking?.id}</Heading>
          <Tag type={statusToTagName[status]}>{status?.replace?.("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {
        status === 'unconfirmed' && <Button onClick={() => navigate(`/check-in/${booking?.id}`)}>Check In</Button>
        }
        {
        status === 'checked-in' && <Button icon={<HiArrowCircleUp />} onClick={() => {
          checkout(booking?.id)
        }} disabled={isCheckingOut}>Check Out</Button>
        }
        <Modal>
          <Modal.Open opens='booking-delete'>
            <Button icon={<HiTrash />} variation="danger">Delete</Button>
          </Modal.Open>

          <Modal.Window name="booking-delete">
            <ConfirmDelete resourceName={`Booking #${booking?.id}`} disabled={isDeleting} onConfirm={() => deleteBooking(booking?.id)} />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
