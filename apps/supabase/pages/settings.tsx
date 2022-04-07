import { ReactElement } from "react";
import AdminPanelPage from "../components/AdminPanelPage";
import { SettingsPage } from "ui/settings";
import enforceAuthenticated from "../utils/enforceAuthenticated";

interface Props {

}

const Settings = (props: Props) => {
    return (
        <>
            <SettingsPage />
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