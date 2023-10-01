import { useSearchParams } from "react-router-dom"
import FilterButton, { StyledFilter } from "./Filter"


export default function FilterBy({filterField, options}) {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleFilter(filterBy) {
    searchParams.set(filterField, filterBy)
    setSearchParams(searchParams)
    if (searchParams.get('page')) searchParams.set('page', 1)
  }

  const currentValueInUrl = searchParams.get(filterField) || 'all'

  return (
    <StyledFilter>
      {options?.map(option => <FilterButton
      onClick={() => handleFilter(option.value)} 
      key={option.value}
      active={option.value === currentValueInUrl}
      >{option.label}</FilterButton>)}
    </StyledFilter>
  ) 
}