import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'

interface navItemsProps {
    icon: React.ReactElement,
    title: string,
    active?: boolean,
    navSize: string
}

export default function NavItem({ icon, title, active, navSize }: navItemsProps) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    backgroundColor={active ? "gray.200" : "none"}
                    p={2}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "gray.200" }}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
                <MenuList
                    py={0}
                    border="none"
                    ml={5}
                >
                </MenuList>
            </Menu>
        </Flex>
    )
}