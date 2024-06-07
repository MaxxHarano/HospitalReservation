import { Box } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <h2>About</h2>

      <nav>
        <Box>
        <NavLink to="faq">View the FAQ </NavLink>
        </Box>
        <Box>
        <NavLink to="contact">Contact Us</NavLink>
        </Box>
      </nav>
      
    </div>
  )
}
