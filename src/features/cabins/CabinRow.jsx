import styled from "styled-components";
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import { MiniPuffSpinner } from "../../ui/Spinner";
import { useCreateCabin, useDeleteCabin } from "./useCreateEditDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import { LoaderRow } from "../../ui/Row";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

export const Img = styled.img`
  display: block;
  width: 6.4rem;
  border-radius: 4px;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
  `


function CabinRow({ cabin }) {
  
  const { id: cabinId, image, name, maxCapacity, regularPrice, discount, description } = cabin
  
  const { deleteCabin, isDeleting } = useDeleteCabin()
  const {createCabin, isCreating} = useCreateCabin()

  function handleDuplicate() {
      createCabin({
      name: `Copy of ${name}`,
      image, maxCapacity, regularPrice, discount, description
    })
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <Cabin>{maxCapacity}</Cabin>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <LoaderRow as='div'>
          <Button variation='secondary' size='small' onClick={handleDuplicate}>
          {isCreating ? <LoaderRow><MiniPuffSpinner size={17} color='blue' /></LoaderRow>: <HiSquare2Stack /> }
          </Button>
          
        <Modal>
          <Modal.Open opens="delete-confirm">
            <Button variation='danger' size='small'>
              <HiTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name="delete-confirm">
            <ConfirmDelete resourceName={cabin?.name} disabled={isDeleting} onConfirm={() => deleteCabin(cabinId)} />
          </Modal.Window>
          
          <Modal.Open opens='cabin-detail-form'>
            <Button size='small' ><HiPencil /></Button>
          </Modal.Open>
          <Modal.Window name="cabin-detail-form">
            <CreateCabinForm cabin={cabin} />
          </Modal.Window>
        </Modal>
        </LoaderRow>
      </TableRow>
    </>
  )
}

export default CabinRow