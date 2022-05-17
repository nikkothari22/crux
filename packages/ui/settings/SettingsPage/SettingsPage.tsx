import { Heading, SimpleGrid } from '@chakra-ui/react'
import { FiLogIn, FiSettings, FiUser } from 'react-icons/fi'
import { BreadCrumb } from '../../layout'
import { SettingsButton } from '../SettingsButton/SettingsButton'

type Props = {}

export const SettingsPage = (props: Props) => {
    return (
        <>
            <BreadCrumb
                pages={
                    [{
                        name: "Home",
                        url: '/',
                    },
                    {
                        name: "Settings",
                        url: '/settings',
                        isCurrent: true
                    }]
                } />
            <Heading>Settings</Heading>
            <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacing={6} mt={8} mr={8}>
                <SettingsButton icon={FiLogIn} title="Login Page Settings" link="/settings/loginPageSettings" />
                {/* <SettingsButton icon={FiUser} title="Account Settings" link="/settings/accountSettings" />
                <SettingsButton icon={FiSettings} title="System Settings" link="/settings/systemSettings" /> */}
            </SimpleGrid>
        </>
    )
}