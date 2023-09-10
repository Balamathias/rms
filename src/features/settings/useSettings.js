import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSettings, updateSetting as updateSettingApi } from "../../services/apiSettings"
import { toast } from "react-hot-toast"

export function useSettings() {
  const {data: settings, error, isLoading} = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings
  })

  return {settings, isLoading, error}
}


export const useUpdateSetting = () => {
  const queryClient = useQueryClient()

  const { mutate: updateSetting, isLoading: isUpdating} = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success(`Setting was updated successfully.`)
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      })
    },
    onError: err => toast.error(err)
  })

  return { updateSetting, isUpdating }
}