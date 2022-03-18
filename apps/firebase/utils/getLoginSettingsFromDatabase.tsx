import { doc, getDoc } from "firebase/firestore";
import { LoginSettings } from "types";
import { firestore } from "../config/firebaseInit";

const GetLoginSettingsFromDatabase = async (): Promise<LoginSettings> => {

    const docRef = doc(firestore, "crux_system_settings", "login");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let loginSettings: LoginSettings = docSnap.data().settings as LoginSettings;
        return loginSettings
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");

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