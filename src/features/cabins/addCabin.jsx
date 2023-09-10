
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

export default function AddCabin() {

  return (
  <Modal>
    <Modal.Open opens='cabin-form'>
      <Button>Add Cabin</Button>
    </Modal.Open>
    <Modal.Window name='cabin-form'>
      <CreateCabinForm />
    </Modal.Window>
  </Modal>
  )
}