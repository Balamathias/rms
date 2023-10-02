import { useNavigate } from "react-router-dom"
import { useUser } from "../features/authentication/useUser"
import { MiniPuffSpinner } from "./Spinner"
import styled from "styled-components"
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

function ProtectedRoutes({children}) {
  const navigate = useNavigate()

  const {isLoading, isAuthenticated } = useUser()

  useEffect(()=> {
    if (!isAuthenticated && !isLoading) navigate('/login')
  }, [navigate, isLoading, isAuthenticated])

  if (isLoading) return <FullPage>
    <MiniPuffSpinner color="blue" />
  </FullPage>

  if (isAuthenticated) return children
}

export default ProtectedRoutes