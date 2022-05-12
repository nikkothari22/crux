import React, { ReactElement } from 'react'
import AdminPanelPage from '../../components/AdminPanelPage'
import { CreateDoctypeForm } from "ui/doctype";
import { enforceAuthenticated } from '../../utils/auth'
import { Doctype } from 'types/doctypes';
import { supabase } from '../../config/supabaseInit';
import { useRouter } from 'next/router';

interface Props {

}

const CreateNewDoctype = (props: Props) => {

    const router = useRouter()
    const createDoctype = async (doctypeData: Doctype) => {

        // 1. check if this doctype name or source already exists
        // 2. if yes, throw error
        // 3. else create doctype

        return checkForDuplicateDoctype(doctypeData.name, doctypeData.source)
            .then((duplicateExists) => {
                if (duplicateExists) {
                    throw new Error('Doctype with the given name/source already exists.')
                } else {
                    return uploadDoctypeToDatabase(doctypeData)
                }
            })

    }

    const uploadDoctypeToDatabase = async (doctypeData: Doctype) => {
        const { error, data } = await supabase.from('crux_doctypes').insert({
            created_at: new Date(),
            name: doctypeData.name,
            source: doctypeData.source,
            metadata: {

            }
        })
        // console.log("created doctype", doctypeData.name)
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            router.push(`/doctypes/${data[0].id}`)
            return
        }
    }

    const checkForDuplicateDoctype = async (name: string, source: string): Promise<boolean> => {
        let { count, error } = await supabase.from('crux_doctypes')
            .select('name', { count: "exact" })
            .or(`name.eq.${name},source.eq.${source}`)
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            return count > 0
        }
    }

    return (
        <>
            <CreateDoctypeForm create={createDoctype} />
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