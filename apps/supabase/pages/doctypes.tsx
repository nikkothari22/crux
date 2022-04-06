import React, { ReactElement } from 'react'
import AdminPanelPage from '../components/AdminPanelPage'
import { DocTypesList } from "ui/doctype";
import enforceAuthenticated from '../utils/enforceAuthenticated'
import { supabase } from '../config/supabaseInit';

interface Props {
}

const Doctypes = (props: Props) => {

    const getDocTypesFromDatabase = async () => {
        let { data, error } = await supabase.from('crux_doctypes')
            .select(`name`)
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            return data
        }
    }

    return (
        <>
            <DocTypesList getDoctypes={getDocTypesFromDatabase} />
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