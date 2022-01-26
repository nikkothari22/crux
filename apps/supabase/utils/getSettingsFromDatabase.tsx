import { supabase } from '../config/supabaseInit'

const getSettingsFromDatabase = async () => {

    let { data, error } = await supabase.from('crux_system_settings')
        .select('settings')
        .eq('name', 'login')


    if (data.length !== 0 && error === null) {
        return data[0].settings
    } else {
        return {
            logo: {
                light: "https://supabase.com/brand-assets/supabase-logo-wordmark--light.svg",
                dark: "https://supabase.com/brand-assets/supabase-logo-wordmark--dark.svg"
            },
            heading: {
                login: "Welcome back",
                signup: "Create your account"
            },
            text: {
                login: "Sign in to your admin panel",
                signup: "Sign up"
            },
            signup_enabled: true,
            providers: ["password"]
        }
    }
}

export default getSettingsFromDatabase
