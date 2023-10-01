import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";


export default function useCheckout() {
  const queryClient = useQueryClient()
  const {mutate: checkout, isLoading: isCheckingOut} = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, {
      status: "checked-out"
    }),

    onSuccess: (data) => {
      toast.success(`Booking ${data?.id} checked out Successfully.`)
      queryClient.invalidateQueries({active: true})
    },
    onError: () => {
      toast.error(`Booking could not be checked out..`)
    }
  })

  return { checkout, isCheckingOut }
}