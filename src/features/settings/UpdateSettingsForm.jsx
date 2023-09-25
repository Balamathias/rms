import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import {useSettings, useUpdateSetting} from './useSettings';
import { MiniPuffSpinner } from '../../ui/Spinner';

function UpdateSettingsForm() {

  const {settings: {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakFastPrice

  } = {}, isLoading} = useSettings()

  const {updateSetting, isUpdating} = useUpdateSetting()

  function handleUpdateSetting(e, field) {
    const { value } = e.target || null
    updateSetting({[field]: value})
  }

  if (isLoading) return <MiniPuffSpinner color='blue' />

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} onBlur={e => handleUpdateSetting(e, 'minBookingLength')} disabled={isUpdating} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} onBlur={e => handleUpdateSetting(e, 'maxBookingLength')} disabled={isUpdating} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} onBlur={e => handleUpdateSetting(e, 'maxGuestsPerBooking')} disabled={isUpdating} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakFastPrice} onBlur={e => handleUpdateSetting(e, 'breakFastPrice')} disabled={isUpdating} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
