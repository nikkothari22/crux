import React, { ReactElement } from 'react'
import AdminPanelPage from '../../components/AdminPanelPage'
import { CreateDocTypeForm } from "ui/doctype";
import ProtectedPageProvider from '../../auth/ProtectedPageProvider';
import { DocField, DocType } from 'types/doctypes';

interface Props {
}

const CreateNewDoctype = (props: Props) => {

    const createDoctype = (doctypeData: DocType, docFields: DocField) => {

    }
    return (
        <>
            <ProtectedPageProvider>
                <CreateDocTypeForm create={createDoctype} />
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