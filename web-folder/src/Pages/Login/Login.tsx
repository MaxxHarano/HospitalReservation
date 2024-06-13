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
import Cookies from 'js-cookie';

interface UserRequest {
    acc: string;
    pwd: string;
    }

export default function Login() {
  const [account, setAccount] = useState('d');
  const [password, setPassword] = useState('d') ;
  
  const usr:UserRequest = {
    acc: account,
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

  const u = JSON.stringify(usr)

    api.post('/api/login', {
      u,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(u => {
      console.log(u);
      Cookies.set('loginCookie', 'default.Cookie.Value', { expires: 0.5, path: '/api/login' }); // Expires in 12 hours
    })
    .then(res => console.log(res))
    .catch(err => console.error(err))

}