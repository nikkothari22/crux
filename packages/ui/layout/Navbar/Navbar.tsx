import { Avatar, Box, Flex, HStack, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, VStack, Text, useColorModeValue, Heading, Skeleton, Link } from '@chakra-ui/react'
import { ColorModeButton } from '../../theme';

interface Props {
    logo?: {
        light: string,
        dark: string
    },
    logout: VoidFunction,
    userEmail?: string,
    loading: boolean
}

export const Navbar = ({ logo, logout, userEmail, loading }: Props) => {

    const colorLogo = useColorModeValue(logo?.light, logo?.dark)
    const navBackgroundColor = useColorModeValue("white", "gray.800")

    return (
        <Flex
            pos="fixed"
            width="full"
            h="50px"
            px="4"
            zIndex="999"
            justifyContent='space-between'
            align='center'
            bgColor={navBackgroundColor}
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.08)">

            <Box>
                {loading ? <Skeleton width="100px" height="30px" /> : colorLogo ? <Image src={colorLogo} mx="auto" h="6" />
                    : <Heading>crux</Heading>}
            </Box>

            <Flex px={4}>
                <HStack spacing={{ base: '4', md: '6' }}>
                    <ColorModeButton size="sm" />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                py={1}
                                transition="all 0.3s"
                                _focus={{ boxShadow: 'none' }}>
                                <HStack>
                                    <Avatar
                                        size={'sm'}
                                        name={userEmail ?? 'User'}
                                    />
                                    <Text fontSize="sm" color={useColorModeValue('gray.700', 'gray.400')}>{userEmail ?? 'User Email'}</Text>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                <MenuItem>Profile</MenuItem>
                                <MenuItem as="a" href="/settings">Settings</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={logout}>Sign out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            </Flex>
        </Flex>
    )
}