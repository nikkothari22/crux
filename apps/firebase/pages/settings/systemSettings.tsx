import { Heading } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { BreadCrumb } from 'ui/layout';
import ProtectedPageProvider from '../../auth/ProtectedPageProvider';
import AdminPanelPage from '../../components/AdminPanelPage';

type Props = {};

const systemSettings = (props: Props) => {
    return (
        <>
            <ProtectedPageProvider>
                <BreadCrumb
                    currentPage="System Settings"
                    previousPage="Settings"
                    previousPageLink="/settings" />
                <Heading>System Settings</Heading>
            </ProtectedPageProvider>
        </>
    );
}

systemSettings.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export default systemSettings;