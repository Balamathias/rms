import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function useCheckin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {mutate: checkin, isLoading: isCheckingin} = useMutation({
    mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, {
      status: "checked-in",
      hasPaid: true,
      ...breakfast
    }),

    onSuccess: (data) => {
      toast.success(`Booking ${data?.id} checked in Successfully.`)
      queryClient.invalidateQueries({active: true})
      navigate('/dashboard')
    },
    onError: () => {
      toast.error(`Booking could not be checked in..`)
    }
  })

  return { checkin, isCheckingin }
}