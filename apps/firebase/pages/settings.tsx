import { ReactElement } from "react";
import AdminPanelPage from "../components/AdminPanelPage";
import { SettingsPage } from "ui/settings";
import ProtectedPageProvider from "../auth/ProtectedPageProvider";

interface Props {

}

const Settings = (props: Props) => {
    return (
        <>
            <ProtectedPageProvider>
                <SettingsPage />
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