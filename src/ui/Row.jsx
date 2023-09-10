import { styled } from "styled-components";

const Row = styled.div`
  display: flex;
  gap: ${props => props.spacing};
  flex-direction: ${props => props.direction};
  align-items: center;
  justify-content: space-between;
`;

Row.defaultProps = {
  direction: 'row'
}

export const LoaderRow = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Row