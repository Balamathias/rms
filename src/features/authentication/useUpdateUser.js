import toast from "react-hot-toast"
import { updateUser as updateUserApi } from "../../services/apiAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateUser() {
  const queryClient = useQueryClient()

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success('Updated Successfully')
      queryClient.invalidateQueries(['user'])
    },
    onError: (err) => toast.error(err?.message)
  })

  return { updateUser, isUpdating }
}
