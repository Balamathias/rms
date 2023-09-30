import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

export const TestElement = styled.main`
  background-color: var(--color-primary);
  padding: 4.2rem;
  display: flex;
  flex-direction: ${props => props.direction};
`
TestElement.defaultProps = {
  direction: 'row',
}

// const CommonRow = styled.div`
//   display: grid;
//   grid-template-columns: ${(props) => props.columns};
//   column-gap: 2.4rem;
//   align-items: center;
//   transition: none;
// `;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  };
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  };
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext()

function Table({children, columns}) {
  return <TableContext.Provider value={{columns}}>
    <StyledTable>{children}</StyledTable>
  </TableContext.Provider>
}

function Header({ children }) {
  const { columns } = useContext(TableContext)
  return <StyledRow columns={columns}>
    {children}
  </StyledRow>
}

function Row({ children, data, render }) {
  const { columns } = useContext(TableContext)
  return <CommonRow columns={columns}>
    {children}
  </CommonRow>
}

function Body({ data, render }) {
  return <StyledBody>
    {data?.map(render)}
  </StyledBody>
}

function Footer({children}) {
  return <StyledFooter>
    {children}
  </StyledFooter>
}

Table.Header = Header
Table.Row = Row
Table.Body = Body
Table.Footer = Footer

export default Table