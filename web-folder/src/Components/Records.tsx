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
import { useEffect, useState } from 'react'
import api from '../api/records'
import Cookies from 'js-cookie';
  
export default function Records() {

    const [records, setRecords] = useState<reserveObject[]>([])
    
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const cookieValue = Cookies.get('loginCookie');
          const response = await api.get('/api/rpc',{
            headers: {
              'Content-Type': 'application/json',
              'Cookie': `loginCookie=${cookieValue}`
          }});
          setRecords(response.data);
        } catch (err) {
          if (err.response) {
            // Not in the 200 response range 
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            console.log(`Error: ${err.message}`);
          }
        }
      }
      fetchPosts();
    }, [])

    const recordItems = records.map(record =>
    <AccordionItem key={record.id}>
        <h2>
        <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
            Reservation at {record.department}
            
            </Box>
            <AccordionIcon />
        </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        Record ID: {record.id}
        <br/>
        Reservation with {record.doctor},
        <br/>
        at {record.timeRange}
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
