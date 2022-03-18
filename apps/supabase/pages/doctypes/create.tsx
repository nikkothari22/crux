import React, { ReactElement } from 'react'
import AdminPanelPage from '../../components/AdminPanelPage'
import { CreateDocTypeForm } from "ui/doctype";
import enforceAuthenticated from '../../utils/enforceAuthenticated'
import { DocField, DocType } from 'types/doctypes';

interface Props {
}

const CreateNewDoctype = (props: Props) => {

    const createDoctype = (doctypeData: DocType, docFields: DocField) => {

    }

    return (
        <>
            <CreateDocTypeForm create={createDoctype} />
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

export const getServerSideProps = enforceAuthenticated();

export default CreateNewDoctype;