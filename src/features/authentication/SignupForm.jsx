import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
import SpinnerMini from '../../ui/SpinnerMini'

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {

  const {register, formState, reset, handleSubmit, getValues} = useForm()
  const { errors } = formState
  const {signup, isLoading} = useSignUp()

  function onSubmit({fullName, email, password}) {
    signup({fullName, email, password}, {
      onSettled: reset
    })
    
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register('fullName', {
          required: "This field is required."
        })}
        disabled={isLoading} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" {...register('email', {
          required: "This field is required.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Make sure you provide a valid email"
          }
        })}
        disabled={isLoading} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register('password', {
          required: "This field is required.",
          minLength: {
            value: 8,
            message: "Your password must be up to 8 characters or more."
          }
        })}
        disabled={isLoading} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register('passwordConfirm', {
          required: "This field is required.",
          validate: value => value === getValues().password || "Passwords do not match!"
        })}
        disabled={isLoading} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>{isLoading ? <SpinnerMini /> : 'Create new user'}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
