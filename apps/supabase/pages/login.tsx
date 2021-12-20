import React from 'react'
import { LoginSettings } from 'types'
import { LoginForm } from 'ui/auth'

interface Props {

}

const Login = (props: Props) => {

    const metadata: LoginSettings = {
        logo: {
            light: "https://supabase.com/brand-assets/supabase-logo-wordmark--light.svg",
            dark: "https://supabase.com/brand-assets/supabase-logo-wordmark--dark.svg"
        },
        heading: {
            login: "Welcome back",
            signup: "Create your account"
        },
        text: {
            login: "Sign in to Supabase",
            signup: "Sign up for Supabase"
        },
        signup_enabled: true,
        providers: ["password", "google", "facebook", "github", "twitter"]
    }

    return (
        <div>
            <LoginForm metadata={metadata} />
        </div>
    )
}

export default Login