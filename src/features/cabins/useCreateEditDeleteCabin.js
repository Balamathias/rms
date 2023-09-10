import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createEditCabin, deleteCabin as deleteCabinApi, getCabins } from "../../services/apiCabins"
import { toast } from "react-hot-toast"


export const useGetCabins = () => {
  const {data: cabins, isLoading, error} = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  })

  return {cabins, isLoading, error}
}


export const useCreateCabin = () => {
  const queryClient = useQueryClient()

  const { mutate: createCabin, isLoading: isCreating} = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success(`Cabin was added successfully.`)
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },
    onError: err => toast.error(err)
  })

  return { createCabin, isCreating}
} 


export const useEditCabin = () => {
  const queryClient = useQueryClient()

  const { mutate: editCabin, isLoading: isEditing} = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success(`Cabin was updated successfully.`)
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: err => toast.error(err)
  })

  return { editCabin, isEditing}
}


export const useDeleteCabin = () => {
  const queryClient = useQueryClient()

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cabins']})
      // toast.success('Cabin deleted successfully')
    },
    onError: err => toast.error(err),
  })

  return { deleteCabin, isDeleting}
}