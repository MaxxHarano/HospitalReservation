import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Logo } from './Logo'
import { OAuthButtonGroup } from './OAuthButtonGroup'
import { PasswordField } from './PasswordField'
import { useState } from 'react';
import api from '../../api/records'
// import AxiosResponseHeaders from 'axios'
// import Cookies from 'js-cookie';

interface UserRequest {
    username: string;
    pwd: string;
    }

export default function Login() {
  const [account, setAccount] = useState('d');
  const [password, setPassword] = useState('d') ;
  
  const usr:UserRequest = {
    username: account,
    pwd: password,
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
            <Text color="fg.muted">
              Don't have an account? <Link href="#">Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" onChange={(input)=>setAccount(input.target.value)}/>
              </FormControl>
              <PasswordField onChange={(input)=>setPassword(input.target.value)}/>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button onClick={()=>handleSignIn(usr)}>Sign in</Button>
              <HStack>
                <Divider />
                <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}


function handleSignIn(usr:UserRequest){

  // const u = JSON.stringify(usr)

    api.post('/api/login', {
      username: usr.username,
      pwd: usr.pwd,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true ,
    })
    .then(res => {
      console.log(res)
      // const authToken:string[] = res.headers['set-cookie'];
      // console.log(String(authToken));
      // Cookies.set('loginCookie', authToken.toString(), { expires: 0.5, path: '/api/login' }); // Expires in 12 hours
    })
    .catch(err => console.error(err))

}