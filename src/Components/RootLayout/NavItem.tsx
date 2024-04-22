import { ComponentWithAs, Flex, Icon, IconProps,  Menu, MenuButton, Text, textDecoration } from '@chakra-ui/react'
import { Link } from "react-router-dom";

// import React, { ReactElement } from 'react'

type navProps = {
    navSize: string;
    title: string;
    icon: ComponentWithAs<"svg", IconProps>;
    active?: boolean;
}

function NavItem({navSize, title, icon, active}: navProps) {
  return (
    <Flex
        mt={30}
        flexDir="column"
        w="100%"
        alignItems={navSize == "small"?"center":"flex-start"}
    >
        <Menu placement='right'>
            <Link
                to={title}
                
                w={navSize == "small"? "0px":"20vh"}
            >
                <MenuButton p={4}>
                    <Flex
                    backgroundColor={active ? "#aecbca":"gray.400"}
                    _hover={{ backgroundColor:"#cfdbda"}}
                    p={5}
                    borderRadius={8}
                    >
                        <Icon as ={icon} fontSize="l" color={active ? "#82aaad":"gray.500"}/>
                        <Text ml={5} display={navSize == "small" ? "none":"flex"}>{title}</Text>
                    </Flex>
                </MenuButton>
            </Link>

            </Menu>
            
            </Flex>
        )
    }
    // <MenuList>
    //     <NavHoverBox></NavHoverBox>
    // </MenuList>
    
export default NavItem