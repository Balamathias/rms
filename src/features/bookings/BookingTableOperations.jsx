import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import FilterBy from "../../ui/FilterBy";
import { useSearchParams } from "react-router-dom";

function BookingTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleChange(e) {
    searchParams.set('sort_by', e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <TableOperations>
      <FilterBy
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
        onChange={handleChange}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
