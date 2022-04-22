import { supabase } from '../config/supabaseInit'

const getDocfieldsDetailsFromDatabase = async (doctypeID: string) => {

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

export default getDocfieldsDetailsFromDatabase