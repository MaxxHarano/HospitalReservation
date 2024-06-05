import { GridItem, Grid} from "@chakra-ui/react"
import TopNav from '../Components/RootLayout/TopNav'
import SideNav from '../Components/RootLayout/SideNav'
import { Outlet } from "react-router-dom"

export default function 
RootLayout() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" bg="gray.50">
        <GridItem
          as="aside"
          colSpan={{base: 3, sm:0, lg: 1}}
          bg="gray.100"
          minHeight={{lg: '100vh'}}
          p={{base: '20px', lg:'30px'}}
        >
          <SideNav/>
        </GridItem>
        <GridItem
          as="main"
          colSpan={{base: 3, sm:3, lg: 2}}
          w='100vh'
          p={4}
        >
          <TopNav/>
          <Outlet p="20px"/>
        </GridItem>
        
    </Grid>

  )
}
