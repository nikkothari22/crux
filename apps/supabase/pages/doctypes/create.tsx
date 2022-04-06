import React, { ReactElement } from 'react'
import AdminPanelPage from '../../components/AdminPanelPage'
import { CreateDocTypeForm } from "ui/doctype";
import enforceAuthenticated from '../../utils/enforceAuthenticated'
import { DocType } from 'types/doctypes';
import { supabase } from '../../config/supabaseInit';

interface Props {
}

const CreateNewDoctype = (props: Props) => {

    const createDoctype = async (doctypeData: DocType) => {

        // 1. check if this doctype already exists
        // 2. if yes, throw error
        // 3. else create doctype

        let { count } = await supabase.from('crux_doctypes')
            .select('name', { count: "exact" })
            .eq('name', doctypeData.name)
        if (count > 0) {
            throw new Error('This doctype already exists.')
        } else {
            const { error, } = await supabase.from('crux_doctypes').insert({
                created_at: new Date(),
                name: doctypeData.name,
                source: doctypeData.source,
                metadata: {

                }
            }, { returning: 'minimal' })
            // console.log("created doctype", DocType)
            if (error) {
                console.error("error:", error)
                throw error
            } else {
                return doctypeData
            }
        }
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