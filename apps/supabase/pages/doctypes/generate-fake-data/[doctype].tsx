import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { Docfield, Doctype } from 'types/doctypes'
import { GenerateDummyDataForm } from 'ui/doctype'
import AdminPanelPage from '../../../components/AdminPanelPage'
import { supabase } from '../../../config/supabaseInit'
import { enforceAuthenticated } from '../../../utils/auth'
import { getDoctype, getDocfields } from '../../../utils/db'

type Props = {}

const GenerateDummyData = (props: Props) => {

    const router = useRouter()
    const { doctype } = router.query
    const doctypeID = typeof doctype === "string" ? doctype : doctype[0]

    const getDoctypeDataCallback = (): Promise<Doctype> => {
        return getDoctype(doctypeID)
    }

    const getDocfieldsCallback = (): Promise<Docfield[]> => {
        return getDocfields(doctypeID)
    }

    const uploadDataset = async (data: any[], doctype: Doctype) => {
        Promise.all(data.map(d => uploadData(d, doctype)))
    }

    const uploadData = async (data: any, doctype: Doctype) => {
        const { error } = await supabase
            .from(doctype.source)
            .insert({
                ...data
            })
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            return
        }
    }

    return (
        <>
            <GenerateDummyDataForm getDoctypeData={getDoctypeDataCallback} getDocfields={getDocfieldsCallback} uploadData={uploadDataset} />
        </>
    );

}

GenerateDummyData.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export const getServerSideProps = enforceAuthenticated();

export default GenerateDummyData;