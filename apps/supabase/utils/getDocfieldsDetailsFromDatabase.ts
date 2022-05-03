import { Docfield } from 'types/doctypes'
import { supabase } from '../config/supabaseInit'

/**
 * 
 * @param doctypeID ID of the Doctype
 * @returns Promise that resolves with an array of Docfields
 */
const getDocfieldsForDoctype = async (doctypeID: string): Promise<Docfield[]> => {

    let { data, error } = await supabase.from('crux_docfields')
        .select(`id, name, label, dataType, fieldType, isRequired, isReadOnly, order`)
        .eq('doctype', doctypeID)
        .order('order', { ascending: true })

    if (error) {
        console.error("error:", error)
        throw error
    } else {
        return data
    }
}

export default getDocfieldsForDoctype