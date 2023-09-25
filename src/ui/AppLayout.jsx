import { styled } from "styled-components"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from 'react-router-dom'

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`
const Main = styled.main`
  padding: 4rem 6rem 4rem;
  background-color: var(--color-grey-50);
  overflow: scroll;
`
const Container = styled.div`
  max-width: 120rem;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  gap: 2;
`

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  )
}

export default AppLayout