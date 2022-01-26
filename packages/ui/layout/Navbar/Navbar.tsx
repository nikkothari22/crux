import { Box, Center, useColorModeValue as mode } from '@chakra-ui/react'
import { NavbarLayout } from './NavbarLayout'
import { NavLink } from './NavLink'
import { UserProfile } from './UserProfile'

export const Navbar = () => (
    <Box minH="24rem" bg={mode('gray.50', 'gray.700')}>
        <NavbarLayout>
            <NavbarLayout.Brand>
                {/* <Center marginEnd="10">
                    <Logo h="6" iconColor={mode('blue.600', 'blue.300')} />
                </Center> */}
            </NavbarLayout.Brand>
            <NavbarLayout.Links>
                <NavLink isActive>Start</NavLink>
                <NavLink>Features</NavLink>
                <NavLink>Documentation</NavLink>
                <NavLink>Pricing</NavLink>
            </NavbarLayout.Links>
            <NavbarLayout.UserProfile>
                <UserProfile
                    name="Christian Schröter"
                    avatarUrl="https://ca.slack-edge.com/T024F7F15-UJVQ359SP-81fc55875723-512"
                    email="mail@chidori-ui.com"
                />
            </NavbarLayout.UserProfile>
        </NavbarLayout>
    </Box>
)