import styled from "styled-components";
import { StyledPuffSpinner } from '../../ui/Spinner'
import CabinRow from "./CabinRow";
import { useGetCabins } from "./useCreateEditDeleteCabin";
import { useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr ;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;


function CabinTable() {

  const {cabins, isLoading, error } = useGetCabins()
  const [searchParams] = useSearchParams()

  if (isLoading) return <StyledPuffSpinner size={60} color="blue" />
  // if (error) return <ErrorFallback message={error.message}/>

  // FILTERING

  let filteredCabins = []
  const currentValueInUrl = searchParams.get('discount') || 'all'

  if (currentValueInUrl === 'with-discount') filteredCabins = cabins?.filter(cabin => cabin.discount > 0)
  if (currentValueInUrl === 'no-discount') filteredCabins = cabins?.filter(cabin => cabin.discount === 0)
  if (currentValueInUrl === 'all') filteredCabins = cabins

  // SORTING

  const sort_by = searchParams.get('sort_by') || 'name-asc'
  const [field, direction] = sort_by.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  const sortedCabins = filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier)

  return (
    <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      <Table.Body 
        data={sortedCabins} 
        render={cabin => <CabinRow 
        key={cabin.id} 
        cabin={cabin} />} />
    </Table>
  )
}

export default CabinTable