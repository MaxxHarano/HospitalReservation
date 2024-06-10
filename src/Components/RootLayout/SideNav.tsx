// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

import { Avatar, Heading, Divider, Text, Flex, IconButton, Icon } from "@chakra-ui/react"
import { useState } from "react";
import { CircleUser, Home, Info } from "lucide-react";
import NavItem from "./NavItem";
import './avt.png'
import { AddIcon, CheckIcon } from "@chakra-ui/icons";

const SideNav = () => {
  const [navSize, changeNavSize] = useState("large")
  return (
    <Flex
      pos="sticky"
      left="5"
      top={"2"}
      h="100vh"
      marginRight="2.5vh"
      boxShadow="0 0 12px 0 gray"
      borderRadius={navSize=="small"?"15px":"30px"}
      w={navSize=="small"?"75px":"200px"}
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
          _hover={{bg:"none"}}
          icon={<AddIcon/>}
          onClick={() => {
            if (navSize == "small")
              changeNavSize("large");
            else
              changeNavSize("small");
          } } aria-label={""} />
        <NavItem navSize={navSize} icon={Home} title="Home" />
        <NavItem navSize={navSize} icon={CheckIcon} title="Reserve" active/>
        <NavItem navSize={navSize} icon={CircleUser} title="Profile" />
        <NavItem navSize={navSize} icon={Info} title="About" />
      </Flex>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize=="small"?"center":"flex-start"}
        mb={4}
      >
        <Divider display={navSize=="small"?"none":"flex"}/>
        <Flex mt={4} align={"left"}>
          <Flex flexDir="column" ml={4} display={navSize=="small"?"none":"flex"}>
          <Avatar size='xs' src="./avt.png" w={20} />
            <Heading as="h3" size="sm">Mike Harvor</Heading>
            <Text>user</Text> 
          </Flex>
        </Flex>
        
      </Flex>
    </Flex>

    

  );
  
};

export default SideNav