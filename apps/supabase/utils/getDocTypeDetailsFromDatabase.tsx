import { supabase } from '../config/supabaseInit'

const getDoctypeDetailsFromDatabase = async (id: string) => {

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

export default getDoctypeDetailsFromDatabase