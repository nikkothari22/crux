import { Heading } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { BreadCrumb } from 'ui/layout';
import ProtectedPageProvider from '../../auth/ProtectedPageProvider';
import AdminPanelPage from '../../components/AdminPanelPage';

type Props = {};

const accountSettings = (props: Props) => {
    return (
        <>
            <ProtectedPageProvider>
                <BreadCrumb
                    currentPage="Account Settings"
                    previousPage="Settings"
                    previousPageLink="/settings" />
                <Heading>Account Settings</Heading>
            </ProtectedPageProvider>
        </>
    );
}

accountSettings.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export default accountSettings;