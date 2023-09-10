import TableOperations from "../../ui/TableOperations"
import FilterBy from "../../ui/FilterBy"
import SortBy from "../../ui/SortBy"
import { useSearchParams } from "react-router-dom"

function CabinOperations() {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleChange(e) {
    searchParams.set('sort_by', e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <TableOperations>
      <FilterBy filterField="discount" options={[
          {value: "all", label: "All"},
          {value: "with-discount", label: "With discount"},
          {value: "no-discount", label: "No discount"},
        ]}  />

      <SortBy options={[
        {value: 'name-asc', label: 'Name in ascending'},
        {value: 'name-desc', label: 'Name in descending'},
        {value: 'regularPrice-asc', label: 'Price in ascending'},
        {value: 'regularPrice-desc', label: 'Price in descending'},
        {value: 'maxCapacity-asc', label: 'maxCapacity in ascending'},
        {value: 'maxCapacity-desc', label: 'maxCapacity in descending'},
      ]}
      onChange={handleChange}
      type="white"
      />
    </TableOperations>
  )
}

export default CabinOperations