import { Box, Button, Container, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, useRadio, useRadioGroup, useToast } from '@chakra-ui/react'
import { useContext, useId, useRef } from 'react'
import { ReserveContext, reserveObject } from './reserveContext.ts'
import axios from 'axios'
// import Cookies from 'js-cookie';
// import { ChangeEvent, ReactNode } from 'react';

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'blue.400',
          color: 'white',
          borderColor: 'blue.400',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export default function TimeRange() {
  const reservation = useContext(ReserveContext);
  const options = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00']
  const dateUTC = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
  const timeArray = options.filter((t)=>t>dateUTC);
  const time = useRef('13:00')
  const isTomorrow = useRef(false)
  const handleChange = (value) => {
    time.current = value
  }
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: handleChange,
  })

  const group = getRootProps()
  reservation.id = useId();
  reservation.timeRange = convertTimeToUTCDate(time.current, isTomorrow.current)

  return (
    <Container p={10} m={5}>
      <Tag size={'lg'} colorScheme={'twitter'}> Choose time range you'd like to reserve:</Tag>
      <Tabs variant='enclosed'>
        <TabList>
          <Tab>Today</Tab>
          <Tab>Tomorrow</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack {...group}>
              {timeArray.map((value) => {
              const radio = getRadioProps({ value })
              isTomorrow.current = false;
              return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
              )
            })}
            </HStack>
          </TabPanel>
          <TabPanel>
            <HStack {...group}>
              {options.map((value) => {
              const radio = getRadioProps({ value })
              isTomorrow.current = true;
              return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
              )
            })}
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <SubmitPopover reserveObj={reservation}/>
    </Container>
  )

}

const SubmitPopover= ({reserveObj}:{reserveObj:reserveObject})=>{

  return(
    <Popover>
    <PopoverTrigger>
      <Button>Next</Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>Confirmation!</PopoverHeader>
      <PopoverBody>
        <p>Are you ready to make the reservation?</p>
        <Button onClick={()=>makeReservation(reserveObj)}>Submit</Button>
      </PopoverBody>
    </PopoverContent>
  </Popover>
  )
}

function makeReservation(obj:reserveObject){
  const reserveObj = {
    department: "string",
    doctor: "string",
    username: "demo1",
    time_range: "string",
  };

  const axiosConfig = {
    headers: {
      'content-Type': 'application/json',
      "Accept": "/",
      // "Cookie": document.cookie,
      // "crossDomain":true,
      },
  };

  reserveObj.department = obj.department;
  reserveObj.doctor = obj.doctor;
  reserveObj.time_range = obj.timeRange;


  // const Record = (JSON.stringify(reserveObj));
  // const cookieValue = Cookies.get('loginCookie');

  console.log(reserveObj);

  axios.post('http://localhost:8080/api/rpc', {
    "jsonrpc": '2.0',
    "method": 'create_reservation',
    "params": {
      "data": reserveObj,
    },
    "id":7474,
    }, 
    axiosConfig
)
  .then(function (response) {
    console.log(response);
    const toast = useToast()
    return (
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  )})
  .catch(function (error) {
    console.log(error);
  });
}

function convertTimeToUTCDate(time: string, isTomorrow:boolean): string {
  // Split the input time string into hour and minute components
  const [hour, minute] = time.split(":").map(Number);
  
  // Get the current date in UTC
  const currentDate = new Date();
  
  if(isTomorrow){
    currentDate.setTime(currentDate.getTime() + (24 * 60 * 60 * 1000));
  }

  // Set the UTC hours and minutes
  currentDate.setUTCHours(hour);
  currentDate.setUTCMinutes(minute);
  currentDate.setUTCSeconds(0);
  currentDate.setUTCMilliseconds(0);

  return currentDate.toUTCString();
}

// {
//   headers: {
//     'Content-Type': 'application/json',
//     // 'Cookie': document.cookie // `auth-token=${Cookies.get('auth-token')}`,
//   }
// },