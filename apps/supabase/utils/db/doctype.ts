import { Doctype, Docfield } from 'types/doctypes'
import { supabase } from '../../config/supabaseInit'

export const getDoctype = async (id: string): Promise<Doctype> => {

    let { data, error } = await supabase.from('crux_doctypes')
        .select(`id, name, source, metadata`)
        .eq('id', id)
        .maybeSingle()

    if (error) {
        console.error("error:", error)
        throw error
    } else if (!data) {
        throw { message: 'The doctype does not exist', code: 'not-found' }
    } else {
        return data
    }
}

/**
 * 
 * @param doctypeID ID of the Doctype
 * @returns Promise that resolves with an array of Docfields
 */
export const getDocfields = async (doctypeID: string): Promise<Docfield[]> => {

    let { data, error } = await supabase.from('crux_docfields')
        .select(`id, name, label, dataType, fieldType, isRequired, isReadOnly, order, metadata, defaultValue, description`)
        .eq('doctype', doctypeID)
        .order('created_at', { ascending: true })

    if (error) {
        console.error("error:", error)
        throw error
    } else {
        return data
    }
}


export const deleteDoctype = async (id: string) => {
    return deleteAllDocfields(id).then(async () => {
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
    })
}

export const deleteDocfield = async (id: string) => {
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