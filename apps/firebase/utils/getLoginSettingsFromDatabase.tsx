import { useFirestoreCollectionPathFetch } from "../customHooks/FirestoreHooks"
import { LoginSettings } from 'types'

const GetLoginSettingsFromDatabase = () => {

    const [data, error] = useFirestoreCollectionPathFetch<LoginSettings>("crux_system_settings/settings")

    if (data.length !== 0 && error === null) {
        return data
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

export default GetLoginSettingsFromDatabase