import { styled } from "styled-components"

import Logo from './Logo'
import MainNav from './MainNav'
import Uploader from "../data/Uploader"

const Aside = styled.aside`
  padding: 2rem;
  border-right: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`
function Sidebar() {
  return (
    <Aside>
      <Logo />
      <MainNav />

      <Uploader />
    </Aside>
  )
}

export default Sidebar