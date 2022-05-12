import React, { ReactElement } from 'react'
import AdminPanelPage from '../components/AdminPanelPage'
import { DoctypesList } from "ui/doctype";
import { enforceAuthenticated } from '../utils/auth'
import { supabase } from '../config/supabaseInit';

interface Props {
}

const Doctypes = (props: Props) => {

    const getDoctypesFromDatabase = async () => {
        let { data, error } = await supabase.from('crux_doctypes')
            .select(`id, name, source, updated_on, created_at`)
            .order('updated_on', { ascending: false })
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            return data
        }
    }

    return (
        <>
            <DoctypesList getDoctypes={getDoctypesFromDatabase} />
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