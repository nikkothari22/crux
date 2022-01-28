import { Heading, SimpleGrid } from "@chakra-ui/react";
import { ReactElement } from "react";
import AdminPanelPage from "../components/AdminPanelPage";
import { SettingsButton, BreadCrumb } from "ui/layout/";
import { FiLogIn, FiSettings, FiUser } from "react-icons/fi";
import enforceAuthenticated from "../utils/enforceAuthenticated";

interface Props {

}

const Settings = (props: Props) => {
    return (
        <>
            <BreadCrumb currentPage="Settings" />
            <Heading>Settings</Heading>
            <SimpleGrid columns={3} spacing={6} mt={8} mr={8}>
                <SettingsButton icon={FiLogIn} title="Login Settings" link="/settings/loginSettings" />
                <SettingsButton icon={FiUser} title="Account Settings" link="/settings/accountSettings" />
                <SettingsButton icon={FiSettings} title="System Settings" link="/settings/systemSettings" />
            </SimpleGrid>
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

export const getServerSideProps = enforceAuthenticated();

export default Settings