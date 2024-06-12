import { Container, Heading, Text } from '@chakra-ui/react'
import Departments from './Departments'
// import ErrorPage from '../Pages/Error-Page'

export default function Contents () {
  return (
    <Container size="lg">
      <Heading m="20px" p="10px"> Hospital Reservation System </Heading>
      <Text ml="10px" color="blue" fontWeight="bold" >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, modi ad! Labore, doloremque saepe consequuntur quasi ratione molestiae veritatis possimus beatae pariatur magnam esse amet odit similique vel. Ea, exercitationem!</Text>
      <Departments/>
    </Container>
  )
}
