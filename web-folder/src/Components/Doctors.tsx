import { Card, CardBody, CardFooter, CardHeader, Button, Heading, Image, SimpleGrid, ChakraProvider, } from '@chakra-ui/react'
import { reserveContext } from './reserveContext'
import TimeRange from './TimeRange'
import './layout.css'
import theme from '../Styles/rootTheme'
import { useContext, useState } from 'react'
// import {  ButtonGroup, Container, Divider,  Stack, Text, Box } from '@chakra-ui/react'

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


export interface reserveObject {
    id: string;
    department: string;
    doctor: string;
    timeRange: string;
  }

export default function 
Doct({docList}:{docList:Doctors[]}) {
    const [showTime, setShowTime]=useState(false);
    //let docName = useRef<string>('default');
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
            <Button onClick={()=>{setShowTime(!showTime)}} m={2} >Reserve</Button>
            
        </CardFooter>
    </Card>
    </ChakraProvider>
    
    )

    const reservation = useContext<reserveObject>(reserveContext)

  return (
    <reserveContext.Provider value={reservation}>
        <SimpleGrid spacing={2} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {listItems}
        </SimpleGrid>  
        {showTime && <TimeRange/>} 
    </reserveContext.Provider>
  )
}
