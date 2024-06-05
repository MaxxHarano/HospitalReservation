import { Box, Button, Container, Divider, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tag, useRadio, useRadioGroup } from '@chakra-ui/react'
import { useContext } from 'react'
import { reserveObject } from './Doctors'
import { reserveContext } from './reserveContext'
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
  const options = ['9:00', '10:00', '13:00', '14:00', '15:00']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  })

  const group = getRootProps()

  return (
    <Container p={8}>
      <Tag size={'lg'} colorScheme={'cyan'}> Choose time range you'd like to reserve:</Tag>
      <Divider/>
      <HStack {...group}>
        {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
        )
      })}
      </HStack>
      <SubmitPopover/>
    </Container>
  )
}

function SubmitPopover(){
  const reservation = useContext<reserveObject>(reserveContext)

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
        <Button onClick={()=>makeReservation(reservation)}>Submit</Button>
      </PopoverBody>
    </PopoverContent>
  </Popover>
  )
}

function makeReservation(obj){
  const reserveObj = {
    department: "string",
    doctor: "string",
    timeRange: "string",
  };
  
  reserveObj.department = obj.department;
  reserveObj.doctor = obj.doctor;
  reserveObj.timeRange = obj.timeRange;


  const Record = (JSON.stringify(reserveObj));
  console.log(Record);
}