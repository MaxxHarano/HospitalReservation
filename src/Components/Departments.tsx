// import { Image, Button, ButtonGroup,  Divider, Heading, Stack, Text,  } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Container, Box, ChakraProvider, theme, SimpleGrid, GridItem } from '@chakra-ui/react'
import { docCards } from '../data/Doctors'
import { DepInfo } from '../data/Departments';
import Doctors from './Doctors';

export default function Departments() {

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

    const basicDoct = [{
        id: "01",
        name: "Basic Doctor",
        Department: {
            id: "1",
            name: "cardiovacular",
            detailURL: "string",
        },
        thumbnailURL: "https://avatar.iran.liara.run/public/job/doctor/female",
        profileURL: "jkaxhs"
    }]

    const departmentTabs = DepInfo.map(dep =>
        <Tab m={2} key={dep.id}>
            {dep.name}
        </Tab>
    )

    const departmentPanels = DepInfo.map(dep =>
        <TabPanel key={dep.id}>
            <h5>{dep.name}</h5>
            <Doctors docList={basicDoct}/>
        </TabPanel>
    )
    return (
        <Tabs variant='soft-rounded' colorScheme='blue'>
            <TabList>
                <Tab m={2}>Specialists </Tab>
                {departmentTabs}
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Doctors docList={docCards}/>
                </TabPanel>
                {departmentPanels}
            </TabPanels>
        </Tabs>
    )

}
