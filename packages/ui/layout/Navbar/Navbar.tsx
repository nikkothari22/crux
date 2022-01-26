import { Avatar, Box, Flex, HStack, IconButton, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, VStack, Text, useColorModeValue, Button } from '@chakra-ui/react'
import { FiBell, FiChevronDown } from 'react-icons/fi'
import { ColorModeButton } from '../../theme';

interface Props {
    logo: {
        light: string,
        dark: string
    },
    logout: VoidFunction
}

export const Navbar = ({ logout }: Props) => {

    // const colorLogo = useColorModeValue(logo.light, logo.dark)
    const colorLogo = useColorModeValue("https://supabase.com/brand-assets/supabase-logo-wordmark--light.svg", "https://supabase.com/brand-assets/supabase-logo-wordmark--dark.svg")

    return (
        <Flex
            pos="sticky"
            h="10vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.08)">
            {colorLogo && <Image src={colorLogo} mx="auto" h="8" position="absolute" top="6" left="4" />}

            <Flex position="absolute" top={4} right={4} px={4}>
                <HStack spacing={{ base: '0', md: '6' }}>
                    <IconButton
                        size="lg"
                        variant="ghost"
                        aria-label="open menu"
                        icon={<FiBell />}
                    />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                py={2}
                                transition="all 0.3s"
                                _focus={{ boxShadow: 'none' }}>
                                <HStack>
                                    <Avatar
                                        size={'sm'}
                                        src={
                                            'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                        }
                                    />
                                    <VStack
                                        display={{ base: 'none', md: 'flex' }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2">
                                        <Text fontSize="sm">Justina Clark</Text>
                                        <Text fontSize="xs" color="gray.600">
                                            Admin
                                        </Text>
                                    </VStack>
                                    <Box display={{ base: 'none', md: 'flex' }}>
                                        <FiChevronDown />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                <MenuItem>Profile</MenuItem>
                                <MenuItem>Settings</MenuItem>
                                <MenuItem>Theme: <ColorModeButton variant="ghost" /></MenuItem>
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
