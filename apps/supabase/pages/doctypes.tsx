import React, { ReactElement } from 'react'
import AdminPanelPage from '../components/AdminPanelPage'
import { DoctypesList } from "ui/doctype";
import { enforceAuthenticated } from '../utils/auth'
import { supabase } from '../config/supabaseInit';
import { deleteDoctype } from '../utils/db';

interface Props {
}

const Doctypes = (props: Props) => {

    const user = supabase.auth.user()

    const getDoctypesFromDatabase = async () => {
        let { data, error } = await supabase.from('crux_doctypes')
            .select(`id, name, source, updated_on, created_at, created_by`)
            .eq('created_by', user.id)
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
            <DoctypesList getDoctypes={getDoctypesFromDatabase} deleteDoctype={deleteDoctype} />
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