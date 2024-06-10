import { Card, CardBody, CardFooter, CardHeader, Button, Heading, Image, SimpleGrid, ChakraProvider} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { ReserveContext, reserveObject} from './reserveContext'
import TimeRange from './TimeRange'
import './layout.css'
import theme from '../Styles/rootTheme'

type Doctors = {
    id: string
    name: string
    Department: {
        id: string
        name: string
        detailURL: string
    }
    thumbnailURL: string
    profileURL: string
}

export default function 
Doct({docList}:{docList:Doctors[]}) {
    const [showTime, setShowTime]=useState(false);
    const [doctName, setdoctName]=useState('default')
    const listItems = docList.map(doct =>
    <ChakraProvider theme={theme} key={doct.id}>
            <Card  border='2px' borderColor='blue' >
            <CardHeader>
                <Image src={doct.thumbnailURL}/>
                <Heading size='md'> {doct.name}</Heading>
            </CardHeader>
            <CardBody>
                <p>
                    {'Department:'+ doct.Department.name}
                </p>
            </CardBody>
            <CardFooter>
                <Button m={2} p={1} colorScheme='gray'>on {doct.name}</Button>
                <Button onClick={()=>{setShowTime(!showTime);setdoctName(doct.name)}} m={2} >Reserve</Button>
                
            </CardFooter>
            </Card>
    </ChakraProvider>
    )

    const reservation = useContext<reserveObject>(ReserveContext)
    reservation.doctor = doctName;

  return (
    <ReserveContext.Provider value={reservation}>
        <SimpleGrid spacing={2} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {listItems}
        </SimpleGrid>  
        {showTime && <TimeRange/>} 
    </ReserveContext.Provider>
  )
}
