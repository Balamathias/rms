import { styled } from "styled-components"
import Logout from "../features/authentication/Logout"

const StyledHeader = styled.header`
  padding: 2.6rem 4rem 2.8rem;
  border-bottom: var(--color-grey-100);
  background-color: var(--color-grey-0);
`

function Header() {
  return (
    <StyledHeader>
      <Logout />
    </StyledHeader>
  )
}

export default Header