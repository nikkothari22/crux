import React, { ReactElement } from 'react'
import AdminPanelPage from '../../components/AdminPanelPage'
import { CreateNewDoctypeUI } from "ui/doctype";
import enforceAuthenticated from '../../utils/enforceAuthenticated'

interface Props {
}

const CreateNewDoctype = (props: Props) => {
    return (
        <>
            <CreateNewDoctypeUI />
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