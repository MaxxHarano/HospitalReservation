import { Container, Heading, Text } from '@chakra-ui/react'
import Departments from './Departments'
// import ErrorPage from '../Pages/Error-Page'

export default function Contents () {
  return (
    <Container size="lg">
      <Heading m="20px" p="10px"> Hospital Reservation System </Heading>
      <Text ml="10px" color="blue" fontWeight="bold" >1. Choose among the tabs for your desired department,
        <br/>2.In order to make a reservation, click the button ,
        <br/>3. Choose the time you prefer, note that the time for today won't be showing if it's already past.
        </Text>
      <Departments/>
    </Container>
  )
}
