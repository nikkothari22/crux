import { supabase } from '../config/supabaseInit'

const getDocTypeDetailsFromDatabase = async (doctype: string) => {

    let { data, error } = await supabase.from('crux_doctypes')
        .select(`name, source, metadata`)
        .eq('name', doctype)
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

export default getDocTypeDetailsFromDatabase