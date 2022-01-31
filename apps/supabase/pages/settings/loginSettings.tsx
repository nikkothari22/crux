import { Divider, Heading } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { BreadCrumb } from 'ui/layout'
import { LoginSettingsUI } from 'ui/settings'
import AdminPanelPage from '../../components/AdminPanelPage'
import enforceAuthenticated from '../../utils/enforceAuthenticated'

type Props = {};

const LoginSettings = (props: Props) => {

    return (
        <>
            <BreadCrumb
                currentPage="Login Settings"
                previousPage="Settings"
                previousPageLink="/settings" />
            <Heading>Login Settings</Heading>
            <Divider mt={2} maxW="90vw" />
            <LoginSettingsUI />
        </>
    );
}

LoginSettings.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export const getServerSideProps = enforceAuthenticated();

export default LoginSettings;