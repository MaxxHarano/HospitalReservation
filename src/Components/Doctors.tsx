import { Card, CardBody, CardFooter, CardHeader, Button, Heading, Image, SimpleGrid, chakra, ChakraProvider} from '@chakra-ui/react'
// import {  ButtonGroup, Container, Divider,  Stack, Text, Box } from '@chakra-ui/react'
import { docCards } from '../data/Doctors'
import './layout.css'
import theme from '../Styles/rootTheme'

type Doctors = {
    id: string
    name: string
    title: string
    Department: {
        id: string
        name: string
        detailURL: string
    }
    thumbnailURL: string
    profileURL: string
}

export default function 
Doct() {
    const listItems = docCards.map(doct =>
    <ChakraProvider theme={theme}>
        <Card key={doct.id} border='2px' borderColor='blue' >
        <CardHeader>
            <Image src={doct.thumbnailURL}/>
            <Heading size='md'> {doct.name}</Heading>
        </CardHeader>
        <CardBody>

            <p>
            <b>{doct.title}</b>
            {'Department:'+ doct.Department+' '}
            </p>
        </CardBody>
        <CardFooter>
            <Button>learn more {doct.profileURL}</Button>
        </CardFooter>
    </Card>
    </ChakraProvider>
    
    )

  return (
    <SimpleGrid spacing={2} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {listItems}
    </SimpleGrid>  
  )
}
