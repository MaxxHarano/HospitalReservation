// import { Image, Button, ButtonGroup,  Divider, Heading, Stack, Text,  } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Container, Box, ChakraProvider, theme, SimpleGrid, GridItem } from '@chakra-ui/react'
import { docCards } from '../data/Doctors'
import Doctors from './Doctors';

export default function Departments() {
    // const depStyles = {
    //     p: '15px',
    //     bg: "gray100",
    //     m: "5px",
    // }

  return (
    <ChakraProvider theme={theme}>
    <Box>
        <SimpleGrid columns={[1, 1, 1]} spacing={12}>
            <GridItem>
            <TabComponent></TabComponent>
            </GridItem>
        </SimpleGrid>
    </Box>
        
    </ChakraProvider>
    
  )
}

function TabComponent(){

    // const doct1 = docCards.filter(checkDept)

    // function checkDept(Doctors){
    //     return Doctors.Department.id == 1;
    // }

    return (
        <Tabs variant='soft-rounded' colorScheme='blue'>
            <TabList>
                <Tab>cardiovacular</Tab>
                <Tab>respiratory</Tab>
                <Tab>neural</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Doctors/>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )

}
