import React, { ReactElement } from 'react'
import AdminPanelPage from '../components/AdminPanelPage'
import { DoctypesUI } from "ui/doctype";
import enforceAuthenticated from '../utils/enforceAuthenticated'

interface Props {
}

const Doctypes = (props: Props) => {
    return (
        <>
            <DoctypesUI />
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

export const getServerSideProps = enforceAuthenticated();

export default Doctypes;