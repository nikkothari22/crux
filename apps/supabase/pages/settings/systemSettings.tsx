import { Heading } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { BreadCrumb } from 'ui/layout';
import AdminPanelPage from '../../components/AdminPanelPage';
import enforceAuthenticated from '../../utils/enforceAuthenticated';

type Props = {};

const systemSettings = (props: Props) => {
    return (
        <>
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
            <Heading>System Settings</Heading>
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

export const getServerSideProps = enforceAuthenticated();

export default systemSettings;