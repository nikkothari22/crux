import { Flex, IconButton, Box } from '@chakra-ui/react'
import { FiBriefcase, FiCalendar, FiMenu, FiSettings, FiUser, FiX } from "react-icons/fi";
import { useState } from 'react'
import NavItem from './NavItems';


interface Props {
    children?: React.ReactNode
}

export const Sidebar = ({ children }: Props) => {

    // the sidebar is in closed state initially and can be expanded by the user
    const [navSize, setNavSize] = useState("small")

    return (
        <Flex>
            <Flex
                pos="fixed"
                height="full"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.08)"
                w={navSize == "small" ? "60px" : "160px"}
                flexDirection="column"
                justifyContent="space-between"
            >
                <Flex
                    p="5%"
                    flexDirection="column"
                    alignItems={navSize == "small" ? "center" : "flex-start"}
                    as="nav"
                >
                    <IconButton
                        background="none"
                        mt={6}
                        aria-label="open menu icon"
                        _hover={{ background: "none" }}
                        icon={navSize == "large" ? <FiX /> : <FiMenu />}
                        onClick={() => {
                            if (navSize == "small") {
                                setNavSize("large")
                            }
                            else {
                                setNavSize("small")
                            }
                        }}
                    />
                    <NavItem navSize={navSize} icon={FiCalendar} title="Calendar" link="/" />
                    <NavItem navSize={navSize} icon={FiUser} title="Users" link="/" />
                    <NavItem navSize={navSize} icon={FiBriefcase} title="Doctypes" link="/doctypes" />
                    <NavItem navSize={navSize} icon={FiSettings} title="Settings" link="/settings" />
                </Flex>
            </Flex>
            <Box pl={navSize == "small" ? "80px" : "180px"} pt={4} pr="6" width="full">
                <main>
                    {children}
                </main>
            </Box>
        </Flex>
    )
}