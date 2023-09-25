import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updateBooking as updateBookingApi, deleteBooking as deleteBookingApi, getBooking, getBookings, createBooking as createBookingApi } from "../../services/apiBookings"
import { toast } from "react-hot-toast"


export const useBookings = () => {
  const {data: bookings, isLoading, error} = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  })

  return {bookings, isLoading, error}
}


export const useCreateBooking = () => {
  const queryClient = useQueryClient()

  const { mutate: createBooking, isLoading: isCreating} = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success(`Booking was added successfully.`)
      queryClient.invalidateQueries({
        queryKey: ['bookings']
      })
    },
    onError: err => toast.error(err)
  })

  return { createBooking, isCreating}
} 


export const useUpdateBooking = () => {
  const queryClient = useQueryClient()

  const { mutate: updateBooking, isLoading: isEditing} = useMutation({
    mutationFn: ({newBookingData, id}) => updateBookingApi(newBookingData, id),
    onSuccess: () => {
      toast.success(`Booking was updated successfully.`)
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
    },
    onError: err => toast.error(err)
  })

  return { updateBooking, isEditing}
}


export const useDeleteBooking = () => {
  const queryClient = useQueryClient()

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['bookings']})
    },
    onError: err => toast.error(err),
  })

  return { deleteBooking, isDeleting}
}