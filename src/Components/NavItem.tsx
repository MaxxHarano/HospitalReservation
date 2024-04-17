import { Flex, Icon, IconProps, Link, Menu, MenuButton, Text, textDecoration } from '@chakra-ui/react'
import React from 'react'

type navProps = {
    navSize: string;
    title: string;
    icon: IconProps;
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
                backgroundColor={active && "#aecbca"}
                p={3}
                borderRadius={8}
                _hover={{textDecoration:"none", backgroundColor:"#aecbca"}}
                w={navSize=="large" && "100%"}
            >
                <MenuButton>
                    <Flex>
                        <Icon as ={icon} fontSize="xl" color={active ? "#82aaad":"gray.500"}/>
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