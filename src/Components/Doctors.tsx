import { Card, CardBody, CardFooter, CardHeader, Button, Heading, Image, SimpleGrid, chakra, ChakraProvider, HStack} from '@chakra-ui/react'
// import {  ButtonGroup, Container, Divider,  Stack, Text, Box } from '@chakra-ui/react'
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

// function Reserve(){
//     return()
// }

export default function 
Doct({docList}:{docList:Doctors[]}) {
    const listItems = docList.map(doct =>
    <ChakraProvider theme={theme}>
        <Card key={doct.id} border='2px' borderColor='blue' >
        <CardHeader>
            <Image src={doct.thumbnailURL}/>
            <Heading size='md'> {doct.name}</Heading>
        </CardHeader>
        <CardBody>

            <p>
            <b>{doct.title}</b>
            <p>
                {'Department:'+ doct.Department.name}
            </p>
            </p>
        </CardBody>
        <CardFooter>
            <Button m={2} p={1} colorScheme='gray'>on {doct.name}</Button>
            <Button m={2} colorScheme='twitter' >Reserve</Button>
            
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
