import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import AdminPanelPage from '../../components/AdminPanelPage'
import enforceAuthenticated from '../../utils/enforceAuthenticated'
import { Docfield, Doctype } from 'types/doctypes';
import { supabase } from '../../config/supabaseInit';
import { EditDoctypeForm } from 'ui/doctype';
import { getDoctypeData } from '../../utils/getDoctypeData';
import getDocfieldsForDoctype from '../../utils/getDocfieldsDetailsFromDatabase';
import { DocfieldTable } from 'ui/doctype/Docfields/DocfieldTable/DocfieldTable';

interface Props {

}

const EditDoctype = (props: Props) => {

    const router = useRouter()
    const { doctype } = router.query

    const doctypeID = typeof doctype === "string" ? doctype : doctype[0]

    const [doctypeFetched, setDoctypeFetched] = useState(false)

    const getDoctypeDataCallback = async () => {
        return getDoctypeData(doctypeID).then((data) => {
            setDoctypeFetched(true)
            return data
        })
    }

    const getDocfieldData = () => {
        return getDocfieldsForDoctype(doctypeID)
    }

    const editDoctype = async (id: string, doctypeData: Doctype) => {
        const { data, error, status, statusText } = await supabase
            .from('crux_doctypes')
            .update({
                name: doctypeData.name,
                source: doctypeData.source,
                updated_on: (new Date()).toISOString(),
                metadata: {

                }
            })
            .match({ id })
        console.log("edited doctype", doctypeData.name)
        console.log(status, statusText)
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            return data[0]
        }
    }

    const editDocfield = async (docfieldData: Docfield) => {
        const { error } = await supabase
            .from('crux_docfields')
            .update({
                updated_on: (new Date()).toISOString(),
                name: docfieldData.name,
                label: docfieldData.label,
                dataType: docfieldData.dataType,
                fieldType: docfieldData.fieldType,
                isRequired: docfieldData.isRequired,
                isReadOnly: docfieldData.isReadOnly,
                doctype: docfieldData.doctype,
                order: docfieldData.order
            })
            .match({ id: docfieldData.id })
        console.log("edited docfield", docfieldData)
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            return
        }
    }

    const createDocfield = async (docfieldData: Docfield) => {
        const { error } = await supabase
            .from('crux_docfields')
            .insert({
                name: docfieldData.name,
                label: docfieldData.label,
                dataType: docfieldData.dataType,
                fieldType: docfieldData.fieldType,
                isRequired: docfieldData.isRequired,
                isReadOnly: docfieldData.isReadOnly,
                doctype: doctypeID,
                order: docfieldData.order
            })
        console.log("created docfield: ", docfieldData)
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            return
        }
    }

    const updateDoctypeMetadata = async (id: string, doctypeData: Doctype) => {
        return checkForDuplicateDoctype(doctypeData.name, doctypeData.source)
            .then((duplicateExists) => {
                if (duplicateExists) {
                    throw new Error('Doctype with the given name/source already exists.')
                } else {
                    return (
                        editDoctype(id, doctypeData)
                    )
                }
            })
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

    const deleteDoctype = async (id: string) => {
        deleteAllDocfields(id).then
        const { error } = await supabase
            .from('crux_doctypes')
            .delete()
            .match({ id })
        // console.log("deleted doctype: ", id)
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            return
        }
    }

    const deleteDocfield = async (id: string) => {
        console.log(id)
        const { error } = await supabase
            .from('crux_docfields')
            .delete()
            .match({ id })
        // console.log("deleted docfield: ", id)
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            return
        }
    }

    const deleteAllDocfields = async (doctypeID: string) => {
        const { error } = await supabase
            .from('crux_docfields')
            .delete()
            .match({ doctype: doctypeID })
        console.log("deleted docfield: ", doctypeID)
        if (error) {
            console.error("error:", error)
            throw error
        } else {
            return
        }
    }

    return (
        <>
            <EditDoctypeForm
                getDoctypeData={getDoctypeDataCallback}
                editDoctype={updateDoctypeMetadata}
                deleteDoctype={deleteDoctype} />
            {doctypeFetched && <DocfieldTable
                deleteField={deleteDocfield}
                addField={createDocfield}
                editField={editDocfield}
                getDocfields={getDocfieldData} />}
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