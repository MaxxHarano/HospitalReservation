import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Input,
    IconButton,
  } from '@chakra-ui/react'
// import axios from 'axios'
import {reserveObject} from './reserveContext.ts'
import { SearchIcon } from '@chakra-ui/icons'
  
export default function Records() {

    const records:reserveObject[] = [{
        id: '12345',
        department: "default",
        doctor: "basic",
        timeRange: "13:00",
    },
    {
        id: '12345',
        department: "default",
        doctor: "basic",
        timeRange: "13:00",
    } 
 ]
    // axios({
    //     method: 'get',
    //     url: 'http://bit.ly/2mTM3nY',
    //     responseType: 'stream'
    //   })
    //     .then(function (response) {
    //       response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    //     });
    const recordItems = records.map(record =>
    <AccordionItem key={record.id}>
        <h2>
        <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
            Reservation Record {record.id}
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Lorem ipsum 
        </AccordionPanel>
  </AccordionItem>
    )

  return (
    <>
    <Input placeholder='Search for records' size={"lg"}/>
    <IconButton aria-label='Search database' icon={<SearchIcon />} />
    <Accordion>
        {recordItems}
    </Accordion>
    </>
  )
}
