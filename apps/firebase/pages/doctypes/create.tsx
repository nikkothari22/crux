import React, { ReactElement } from 'react'
import AdminPanelPage from '../../components/AdminPanelPage'
import { CreateNewDoctypeUI } from "ui/doctype";
import ProtectedPageProvider from '../../auth/ProtectedPageProvider';

interface Props {
}

const CreateNewDoctype = (props: Props) => {
    return (
        <>
            <ProtectedPageProvider>
                <CreateNewDoctypeUI />
            </ProtectedPageProvider>
        </>
    );
}

CreateNewDoctype.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export default CreateNewDoctype;