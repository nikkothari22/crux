import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import AdminPanelPage from '../../components/AdminPanelPage'
import { EditDocTypeForm } from "ui/doctype";
import enforceAuthenticated from '../../utils/enforceAuthenticated'
import { DocType } from 'types/doctypes';
import { supabase } from '../../config/supabaseInit';
import getDocTypeDetailsFromDatabase from '../../utils/getDocTypeDetailsFromDatabase';

interface Props {

}

const EditDoctype = (props: Props) => {

    const router = useRouter()
    const { doctype } = router.query

    const updateDoctypeMetadata = async (doctypeData: DocType) => {

        //TODO: Dev research: Check if primary key can be edited

        //1. Update metadata for doctype
        const { data, error, status, statusText } = await supabase
            .from('crux_doctypes')
            .update({
                updated_on: (new Date()).toISOString(),
                metadata: {

                }
            }, { returning: 'minimal' })
            .match({ name: doctypeData.name })
        // console.log("edited doctype", DocType)
        console.log(status, statusText)
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            return data
        }
    }

    return (
        <>
            <EditDocTypeForm
                getData={getDocTypeDetailsFromDatabase}
                edit={updateDoctypeMetadata}
                doctype={typeof doctype === "string" ? doctype : doctype[0]} />
        </>
    );
}

EditDoctype.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export const getServerSideProps = enforceAuthenticated();

export default EditDoctype;