// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

import { Avatar, Divider, Flex, IconButton, Icon } from "@chakra-ui/react"
import { Heading } from "lucide-react";
import { useState } from "react";
import NavItem from "./NavItem";
import { CheckIcon } from "@chakra-ui/icons";

const SideNav = () => {
  const [navSize, changeNavSize] = useState("large")
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 gray"
      borderRadius={navSize=="small"?"15px":"30px"}
      w="200px"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex 
        p="5%"
        flexDir="column"
        alignItems="flex-start"
        as="nav"
      >
        <IconButton
          bg="none"
          mt={5}
          _hover={"none"}

          onClick={() => {
            if (navSize == "small")
              changeNavSize("large");

            else
              changeNavSize("small");
          } } aria-label={""} />
        <NavItem navSize={navSize} icon={CheckIcon} title="Dashboard" active/>
        <NavItem navSize={navSize} icon={CheckIcon} title="Dashboard" />
        <NavItem navSize={navSize} icon={CheckIcon} title="Dashboard" />
        <NavItem navSize={navSize} icon={CheckIcon} title="Dashboard" />
        <NavItem navSize={navSize} icon={CheckIcon} title="Dashboard" />
      </Flex>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems="flex-start"
        mb={4}
      >
        <Divider/>
        <Flex>
          <Avatar size='sm' src="avt.jpg" />
          <Flex flexDir="column" ml={4}>
            <Heading as="h3">Mike Harvor</Heading>
            <Text>usr</Text> 
          </Flex>
        </Flex>
        
      </Flex>
    </Flex>

    

  );
  
};

// <Link to='/departments'>Home</Link>

// <Link to='/doctors'>Login</Link>

// <Link to='/time'>Bill</Link>
export default SideNav