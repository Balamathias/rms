import Heading from "../ui/Heading";
import Row from "../ui/Row";
import {Box} from '../ui/Box'
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm'

function Account() {
  return (
    <Box>
      <Heading as="h1">Update your account</Heading>

      <Box>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Box>

      <Box>
        <Heading as="h3">Update password</Heading>
        <p>Update user password form</p>
      </Box>
    </Box>
  );
}

export default Account;
