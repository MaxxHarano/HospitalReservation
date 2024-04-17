import { Flex, HStack, Heading, Spacer, Button, ButtonGroup } from '@chakra-ui/react'
import {Bell, Box, Settings, User } from "lucide-react"

export default function 
TopNav() {
  return (
    <Flex w='100vh' p='10' borderWidth='2px' borderColor='gray.100'>
        <Box>
           <Heading></Heading> 
        </Box>
        <Spacer/>
        <ButtonGroup>
            <Button variant="ghost">
                <Bell/>
            </Button>
            <Button variant="ghost">
                <User/>
            </Button>
            <Button variant="ghost">
                <Settings/>
            </Button>
        </ButtonGroup>
    </Flex>
  )
}
