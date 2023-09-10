import { useSearchParams } from "react-router-dom"
import FilterButton, { StyledFilter } from "./Filter"


export default function FilterBy({filterField, options}) {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleFilter(filterBy) {
    searchParams.set(filterField, filterBy)
    setSearchParams(searchParams)
  }

  const currentValueInUrl = searchParams.get('discount') || 'all'

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