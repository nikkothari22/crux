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
                    pages={
                        [{
                            name: "Settings",
                            url: '/settings',
                        },
                        {
                            name: "System Settings",
                            url: '/settings/systemSettings',
                            isCurrent: true
                        }]
                    } />
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