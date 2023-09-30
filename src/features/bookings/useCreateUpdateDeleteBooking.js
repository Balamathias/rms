import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updateBooking as updateBookingApi, deleteBooking as deleteBookingApi, getBooking, getBookings, createBooking as createBookingApi } from "../../services/apiBookings"
import { toast } from "react-hot-toast"
import { useParams, useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../utils/constants"


export const useBookings = () => {

  const [searchParams] = useSearchParams()
  
  const status = searchParams.get("status")
  const queryClient = useQueryClient()
  
  //Filtering
  const filter = !status || status === 'all' ? null : {
    field: "status",
    value: status
  }
  
  //Sorting
  const sortByRaw = searchParams.get('sort_by') || 'startDate-desc'
  const [field, direction] = sortByRaw.split('-')
  const sortBy = {
    field: field,
    direction: direction
  }

  // Paginate
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))
  
  const {data: {data: bookings, count} = {}, isLoading, error} = useQuery({
    queryKey: ['bookings', status, sortBy, page],
    queryFn: () => getBookings({filter, sortBy, page})
  })

  const pageCount = Math.ceil(count / PAGE_SIZE)
  
  // PREFETCHING
  
  if (page < pageCount)
  queryClient.prefetchQuery({
queryKey: ['bookings', status, sortBy, page+1],
      queryFn: () => getBookings({filter, sortBy, page: page + 1})
  })

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', status, sortBy, page-1],
      queryFn: () => getBookings({filter, sortBy, page: page - 1})
  })

  return {bookings, isLoading, error, count}
}


export const useBooking = () => {
  const { bookingId } = useParams()

  const {data: booking, isLoading, error} = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId)
  })

  return { booking, isLoading, error }

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
