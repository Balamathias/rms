import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useCreateUpdateDeleteBooking";
import { MiniPuffSpinner } from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import { useSettings } from '../settings/useSettings'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmedPaid, setConfirmPaid] = useState(false)
  const [addBreakFast, setAddBreakFast] = useState(false)
  const {settings, isLoading: isLoadingSettings} = useSettings()
  const { checkin, isCheckingin } = useCheckin()

  const { booking, isLoading } = useBooking();
  
  useEffect(() => {
    setConfirmPaid(booking?.hasPaid ?? false)
  }, [booking])
  

  const {
    id: bookingId,
    guests,
    totalPrice,
    numOfGuests,
    hasBreakfast,
    numOfNights,
  } = booking || {};
  
  const optionalBreakFast = settings?.breakFastPrice * numOfNights * numOfGuests

  function handleCheckin() {
    if (!confirmedPaid) return
    if (addBreakFast) {
      checkin({
        bookingId,
        breakfast: {
          hasPaid: true,
          extraPrice: optionalBreakFast,
          totalPrice: totalPrice + optionalBreakFast
        }
      })
    } else checkin({bookingId, breakfast: {}})
  }

  if (isLoading || isLoadingSettings) return <MiniPuffSpinner color="blue" />

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      { !hasBreakfast && <Box>
        <Checkbox onChange={() => {
            setAddBreakFast(prev => !prev)
            setConfirmPaid(false)
          }} checked={addBreakFast} id="breakfast">
          <span>Add breakfast for guest <b>{guests?.fullName}</b> for the price <strong>{formatCurrency(optionalBreakFast)}</strong>?</span>
        </Checkbox>
      </Box>}
      <Box>
        <Checkbox onChange={() => setConfirmPaid(prev => !prev)} disabled={confirmedPaid || isCheckingin || !addBreakFast} checked={confirmedPaid || isCheckingin} id={bookingId}>
          <span>I hereby confirm that <b>{guests?.fullName}</b> has complete his/her payments for a total of <strong>
            {!addBreakFast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakFast)} (Breakfast Price: ${formatCurrency(optionalBreakFast)} + Cabin: ${formatCurrency(totalPrice)})`}
            </strong></span>
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmedPaid}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
