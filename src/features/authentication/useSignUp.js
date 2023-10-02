import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignUp() {

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success('Signed Up successfully. Ensure to verify User\'s email.')
    },
    onError: (err) => toast.error(err?.message)
  })

  return { signup, isLoading }
}