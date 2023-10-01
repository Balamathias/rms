import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser() {
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    onSuccess: (user) => queryClient.setQueriesData(['user', user])
  })

  return { user, isLoading, isAuthenticated: user?.role === 'authenticated'}
}