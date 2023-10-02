import { styled } from "styled-components"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from "../features/authentication/UserAvatar"

const StyledHeader = styled.header`
  padding: 2.6rem 4rem 2.8rem;
  border-bottom: var(--color-grey-100);
  background-color: var(--color-grey-0);

  display: flex;
  gap: 0.4;
  justify-content: flex-end;
`

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  )
}

export default Header