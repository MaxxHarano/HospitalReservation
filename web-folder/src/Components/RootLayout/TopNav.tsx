import { Flex, Heading, Spacer, Button, ButtonGroup } from '@chakra-ui/react'
import {Bell, Box, Settings, User } from "lucide-react"
import { Link } from 'react-router-dom'

export default function 
TopNav() {
  return (
    <Flex w='100vh' 
        p='20' 
        m={4}
        borderWidth='2px' 
        borderColor='gray.100'
        boxShadow="0 0 0 4px gray.400"
        >
        <Box >
           <Heading></Heading> 
        </Box>
        <Spacer/>
        <ButtonGroup>
            <Button variant="ghost">
                <Bell/>
            </Button>
            <Button variant="ghost">
            <Link to='/Profile'>
                <User/>
            </Link>
            </Button>
            <Button variant="ghost">
                <Link to='/login'>
                <Settings/>
                </Link>
            </Button>
        </ButtonGroup>
    </Flex>
  )
}
