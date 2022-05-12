import { Provider } from '@supabase/supabase-js'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CustomError, LoginProvider, LoginSettings } from 'types'
import { SignupForm } from 'ui/auth'
import { supabase } from '../config/supabaseInit'
import { getLoginSettings } from '../utils/db/settings'

interface Props {
    metadata: LoginSettings
}

const Signup = ({ metadata }: Props) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | CustomError>(null)

    const router = useRouter()

    useEffect(() => {

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {

            //Set the cookie for the auth state change
            fetch("/api/auth", {
                method: "POST",
                headers: new Headers({ "Content-Type": "application/json" }),
                credentials: "same-origin",
                body: JSON.stringify({ event, session }),
            }).then((res) => res.json())

            //If user signed in, then redirect to the index page
            if (event === "SIGNED_IN" && session.user) {
                router.replace('/')
            }
        })
        return () => {
            authListener.unsubscribe()
        }
    }, [router])

    const signUpWithProvider = (provider: LoginProvider,
        options?: { email?: string, password?: string }
    ) => {

        if (provider === "password") {
            passwordSignup(options.email, options.password)
        } else if (provider === "magic_link") {
            magicLinkSignup(options.email)
        } else {
            providerSignup(provider as Provider)
        }
    }

    /** Function to Signup using email and password */
    const passwordSignup = (email: string, password: string) => {

        setLoading(true)
        supabase.auth.signUp({ email, password })
            .then((result) => {
                setLoading(false)
                if (result.error) {
                    console.error(result.error)
                    setError({
                        code: result.error.status.toString(),
                        message: result.error.message
                    })
                }
            })
            .catch(error => {
                console.error(error)
                setError(error)
            })
    }

    /** Function to Signup using email - magic link */
    const magicLinkSignup = (email: string) => {

        setLoading(true)
        supabase.auth.signIn({ email })
            .then(() => {
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setError(error)
            })
    }

    /** Function to Signup using provider */
    const providerSignup = (provider: Provider) => {

        setLoading(true)
        supabase.auth.signIn({ provider })
            .then(() => {
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setError(error)
            })
    }

    return (
        <>
            <SignupForm metadata={metadata}
                callback={signUpWithProvider}
                state={{
                    loading, error
                }} />
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    } else {
        return {
            props: {
                metadata: await getLoginSettings(),
            },
        };
    }

}

export default Signup