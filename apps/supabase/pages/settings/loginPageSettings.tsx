import React, { ReactElement } from 'react'
import { LoginSettings } from 'types'
import { LoginSettingsFormLayout } from 'ui/settings'
import AdminPanelPage from '../../components/AdminPanelPage'
import { supabase } from '../../config/supabaseInit'
import enforceAuthenticated from '../../utils/enforceAuthenticated'
import getLoginSettingsFromDatabase from '../../utils/getLoginSettingsFromDatabase'

interface Props {
}

const LoginPageSettings = (props: Props) => {

    const updateSettings = async (loginSettings: LoginSettings) => {
        // console.log("updated settings in db", loginSettings)
        const { data, error, status, statusText } = await supabase
            .from('crux_system_settings')
            .update({ settings: loginSettings, updated_on: (new Date()).toISOString(), updated_by: supabase.auth.user().email ?? "admin" })
            .match({ name: 'login' })

        console.log(status, statusText)
        if (error) {
            console.error("test", error)
            throw error
        } else {
            return data
        }

    }

    return (
        <>
            <LoginSettingsFormLayout
                getSettings={getLoginSettingsFromDatabase}
                updateSettings={updateSettings} />
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

export const getServerSideProps = enforceAuthenticated();

export default LoginPageSettings;