// import { Image, Button, ButtonGroup,  Divider, Heading, Stack, Text,  } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Container, Box, ChakraProvider, theme, SimpleGrid, GridItem } from '@chakra-ui/react'
import { docCards } from '../data/Doctors'
import { DepInfo } from '../data/Departments';
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

    const basicDoct = [{
        id: "01",
        name: "Basic Doctor",
        title: "basic",
        Department: {
            id: "1",
            name: "cardiovacular",
            detailURL: "string",
        },
        thumbnailURL: "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
        profileURL: "jkaxhs"
    }]

    const departmentTabs = DepInfo.map(dep =>
        <Tab m={2}>{dep.name}</Tab>
    )

    const departmentPanels = DepInfo.map(dep =>
        <TabPanel>
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
