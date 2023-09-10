import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/addCabin";
import CabinOperations from "../features/cabins/CabinOperations";

function Cabins() {

  return (
    <>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <CabinOperations />
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Row>
        <AddCabin />
      </Row>
    </>


  );
}

export default Cabins;
