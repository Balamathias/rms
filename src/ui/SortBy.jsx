import { useSearchParams } from "react-router-dom"
import StyledSelect from "./Select"


function SortBy({options,...props}) {

  const [searchParams] = useSearchParams()

  const sortBy = searchParams.get('sort_by')

  return <StyledSelect value={sortBy} {...props}>
    {options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}
  </StyledSelect>
}

export default SortBy