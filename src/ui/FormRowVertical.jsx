import { styled } from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 2.4rem;
  flex-direction:column;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;


function FormRowVertical({label, children, error}) {
  return (
    <StyledFormRow>
      <Label htmlFor={children?.props?.id}>{label}</Label>
      {children}
      { error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

export default FormRowVertical