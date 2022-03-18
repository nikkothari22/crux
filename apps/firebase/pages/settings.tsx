import { Heading, SimpleGrid } from "@chakra-ui/react";
import { ReactElement } from "react";
import AdminPanelPage from "../components/AdminPanelPage";
import { BreadCrumb } from "ui/layout/";
import { SettingsButton } from "ui/settings";
import { FiLogIn, FiSettings, FiUser } from "react-icons/fi";
import ProtectedPageProvider from "../auth/ProtectedPageProvider";

interface Props {

}

const Settings = (props: Props) => {
    return (
        <>
            <ProtectedPageProvider>
                <BreadCrumb currentPage="Settings" />
                <Heading>Settings</Heading>
                <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacing={6} mt={8} mr={8}>
                    <SettingsButton icon={FiLogIn} title="Login Page Settings" link="/settings/loginPageSettings" />
                    <SettingsButton icon={FiUser} title="Account Settings" link="/settings/accountSettings" />
                    <SettingsButton icon={FiSettings} title="System Settings" link="/settings/systemSettings" />
                </SimpleGrid>
            </ProtectedPageProvider>
        </>
    );
}

Settings.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export default Settings