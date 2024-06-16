import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Button,
    useToast,
    Text,
  } from '@chakra-ui/react'
// import axios from 'axios'
import {reserveObject} from './reserveContext.ts'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import api from '../api/records'
// import Cookies from 'js-cookie';
 
const recordMap = new Map();

recordMap.set(1,"cardiovacular");
recordMap.set(2,"respiratory");
recordMap.set(3,"neural");

export default function Records() {

    const [records, setRecords] = useState<reserveObject[]>([])
    const departArray:string[] = ["cardiovacular", "respiratory", "neural"]
    // const [depart, setDepart] = useState('all')

    // useEffect(() => {
    //   const fetchPosts = async () => {
    //     try {
    //       // const cookieValue = Cookies.get('loginCookie');
    //       const response = await api.get('/api/rpc',{
    //         data:{
    //           jsonrpc: "2.0",
    //         method: "list_reservations",
    //         params:{
             
    //         },
    //         id: 7474,
    //       },
    //         headers: {
    //           'Content-Type': 'application/json',
    //           // 'Cookie': `loginCookie=${cookieValue}`
    //       }});
    //       console.log(response);
    //       setRecords(response.data);
    //     } catch (err) {
    //       if (err.response) {
    //         // Not in the 200 response range 
    //         console.log(err.response.data);
    //         console.log(err.response.status);
    //         console.log(err.response.headers);
    //       } else {
    //         console.log(`Error: ${err.message}`);
    //       }
    //     }
    //   }
    //   fetchPosts();
    // }, [])

    useEffect(()=>{
      const axiosConfig = {
        headers: {
          'content-Type': 'application/json',
          "Accept": "/",
          // "Cookie": document.cookie,
          // "crossDomain":true,
          },
      };
      api.post('http://localhost:8080/api/rpc', {
        "jsonrpc": '2.0',
        "method": 'list_reservations',
        "params": {
          
        },
        "id":7474,
        }, 
        axiosConfig
    )
      .then(function (response) {
        console.log(response);
        setRecords(response.data.result.data);

      })
      .catch(function (error) {
        console.log(error);
      });
    },[]
  )

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

    const departs = departArray.map(depart =>
      <MenuItem>{depart}</MenuItem>
      // <MenuItem onClick={()=>setDepart(depart)}>{depart}</MenuItem>
    )

  return (
    <>
    <Text ml="10px" color="blue" fontWeight="bold">
      Choose the department of your record in the options menu,
      <br/> Then, hit the filter button:
    </Text>
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} m={"10px"}>
        Options 
      </MenuButton>
      <MenuList>
        <MenuItem>All</MenuItem>
        {departs}
      </MenuList>
    </Menu>
    <Button onClick={()=>filterRecords()}>Filter</Button>
    <Accordion>
        {recordItems}
    </Accordion>
    </>
  )
}


function filterRecords(){

    api.get('/api/rpc',{
      data:{
        jsonrpc: "2.0",
      method: "list_reservations",
      params:{
       
      },
      id: 7474,
    },
      headers: {
        'content-Type': 'application/json',
        "Accept": "/",
      },
    },
  )
    .then(res=>{
        console.log(res);
        FilterToast()
    })
}

function FilterToast() {
  const toast = useToast()
  return (
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 8000,
      isClosable: true,
    })
  )
}