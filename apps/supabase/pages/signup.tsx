import React from 'react'
import { LoginSettings } from 'types'
import { SignupForm } from 'ui/auth'

interface Props {

}

export const Signup = (props: Props) => {

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
        providers: ["google", "facebook", "github", "twitter", "password"]
    }

    return (
        <div>
            <SignupForm metadata={metadata} />
        </div>
    )
}

export default Signup
