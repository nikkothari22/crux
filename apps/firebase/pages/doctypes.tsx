import React, { ReactElement } from 'react'
import AdminPanelPage from '../components/AdminPanelPage'
import { DoctypesUI } from "ui/doctype";
import ProtectedPageProvider from '../auth/ProtectedPageProvider';

interface Props {
}

const Doctypes = (props: Props) => {
    return (
        <>
            <ProtectedPageProvider>
                <DoctypesUI />
            </ProtectedPageProvider>
        </>
    );
}

Doctypes.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export default Doctypes;