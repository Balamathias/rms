import styled from "styled-components";
import Logout from "../features/authentication/Logout"
import ButtonIcon from "./ButtonIcon";
import {HiUser} from 'react-icons/hi2'
import { useNavigate } from "react-router-dom";


const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4;
  padding: 5px;
`;


function HeaderMenu() {
  const navigate = useNavigate()
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiUser />
        </ButtonIcon>
      </li>
      <li>
       <Logout />
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu