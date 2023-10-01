import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;



function Pagination({count}) {

    const [searchParams, setSearchParams] = useSearchParams()

    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))
    const num_of_pages = Math.ceil(count / PAGE_SIZE)
    
    function prevPage() {
      const prev = page === 1 ? page : page - 1
      searchParams.set('page', prev)
      setSearchParams(searchParams)
    }
    
    function nextPage() {
      const next = page === num_of_pages ? page : page + 1
      searchParams.set('page', next)
      setSearchParams(searchParams)
    }

    if (num_of_pages <= 1) return null

  return (
    <StyledPagination>
      { isNaN(num_of_pages) &&
      <P>
        Showing <b>{page}</b> of <b>{isNaN(num_of_pages) ? '' : num_of_pages }</b> pages of <b>{count} items</b>.
      </P>}
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={page === 1}>
          <HiChevronLeft />
          <span>Prev</span>
        </PaginationButton>
        <PaginationButton onClick={nextPage} disabled={page === num_of_pages}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  )
}

export default Pagination