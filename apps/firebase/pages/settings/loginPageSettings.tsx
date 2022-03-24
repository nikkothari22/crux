import React, { ReactElement } from 'react'
import { LoginSettings } from 'types'
import { LoginSettingsFormLayout } from 'ui/settings'
import ProtectedPageProvider from '../../auth/ProtectedPageProvider'
import AdminPanelPage from '../../components/AdminPanelPage'
import getLoginSettingsFromDatabase from '../../utils/getLoginSettingsFromDatabase'
import { doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebaseInit";
import { useAuth } from '../../context/userContext'

interface Props {
}

const LoginPageSettings = (props: Props) => {

    const { authUser } = useAuth();

    const updateSettings = (loginSettings: LoginSettings) => {

        return updateDoc(doc(firestore, 'crux_system_settings/login'), {
            settings: loginSettings,
            updated_on: serverTimestamp(),
            updated_by: authUser.uid
        })

    }

    return (
        <>
            <ProtectedPageProvider>
                <LoginSettingsFormLayout
                    getSettings={getLoginSettingsFromDatabase}
                    updateSettings={updateSettings} />
            </ProtectedPageProvider>
        </>
    );
}

LoginPageSettings.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export default LoginPageSettings;