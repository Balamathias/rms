import Input from "../../ui/Input";
import Form from "../../ui/Form"
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { ClipLoader } from 'react-spinners'
import { LoaderRow } from "../../ui/Row";
import { useCreateCabin, useEditCabin } from "./useCreateEditDeleteCabin";
import { Img } from "./CabinRow";


function CreateCabinForm({cabin = {}, onClose }) {

  const {id: editId, ...editValues} = cabin
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  })

  const { errors } = formState

  const {createCabin, isCreating} = useCreateCabin()
  const { editCabin, isEditing} = useEditCabin()
  
  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (isEditSession) {
      const newCabin = {newCabinData: {...data, image }, id: editId}
      editCabin(newCabin, {
        onSuccess: () => {
          reset()
          onClose?.()
        }
      })
    } else {
      createCabin({...data, image: image}, {
          onSuccess: () => {
            reset()
            onClose?.()
          }
      })
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onClose ? 'modal' : 'regular'}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking} {...register('name', {
          required: 'This field is required.',
        })}/>
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register('maxCapacity', {
          required: 'This field is required.',
          max: {
            value: 100,
            message: 'Max capacity should not exceed 100.'
          },
          min: {
            value: 1,
            message: 'Min capacity should not be less than 1.'
          }
        })} />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register('regularPrice', {
          required: 'This field is required.',
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" {...register('discount', {
          required: 'This field is required.',
          validate: value => { value <= getValues().regularPrice  || 'Discount price must be less than the regular price.'}
        })} defaultValue={0} disabled={isWorking} />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description" {...register('description', {
          required: 'This field is required.',
        })} disabled={isWorking} defaultValue={editValues?.description} />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput id="image" disabled={isWorking} {...register('image', {
          required: isEditSession ? false : 'This field is required.',
        })} accept="image/*" />
        {isEditSession && <Img src={getValues()?.image} style={{marginLeft: 4}}/>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}><LoaderRow><ClipLoader loading={isWorking} size={20} color='white' /> <span style={{marginLeft: '5px'}}>{isEditSession ? isWorking?'Updating...' : 'Update': isWorking?'Creating...' :'Create'}</span></LoaderRow></Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
