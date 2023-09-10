import { css, styled } from "styled-components";

const Heading = styled.h1`
  ${props => props.as === 'h1' ? css`
    font-weight: 400;
    font-size: 36px;
    color: ${props => props.color};
  `: ''}

  ${props => props.as === 'h2' ? css`
    font-weight: 500;
    font-size: 30px;
  ` : ''};
`

export default Heading