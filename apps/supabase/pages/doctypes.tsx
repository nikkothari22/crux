import React, { ReactElement } from 'react'
import AdminPanelPage from '../components/AdminPanelPage'
import { DocTypesList } from "ui/doctype";
import enforceAuthenticated from '../utils/enforceAuthenticated'

interface Props {
}

const Doctypes = (props: Props) => {
    return (
        <>
            <DocTypesList />
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