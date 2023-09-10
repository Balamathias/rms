import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { LoaderRow } from "./Row";
import { MiniPuffSpinner } from "./Spinner";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onClose }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}?</Heading>
      <p>
        Are you sure you want to delete <strong>{resourceName}</strong> permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={onClose}>
          Cancel
        </Button>
        <Button variation="danger" onClick={onConfirm} disabled={disabled}>
          {disabled ? <LoaderRow><MiniPuffSpinner size={17} color='white' /> Deleting...</LoaderRow> : 'Delete' }
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
