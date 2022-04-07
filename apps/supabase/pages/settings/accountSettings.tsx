import { Heading } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { BreadCrumb } from 'ui/layout';
import AdminPanelPage from '../../components/AdminPanelPage';
import enforceAuthenticated from '../../utils/enforceAuthenticated';

type Props = {};

const accountSettings = (props: Props) => {
    return (
        <>
            <BreadCrumb
                pages={
                    [{
                        name: "Settings",
                        url: '/settings',
                    },
                    {
                        name: "Account Settings",
                        url: '/settings/accountSettings',
                        isCurrent: true
                    }]
                } />
            <Heading>Account Settings</Heading>
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

export const getServerSideProps = enforceAuthenticated();

export default accountSettings;