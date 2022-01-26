import { Provider } from '@supabase/supabase-js'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { LoginProvider, LoginSettings, CustomError } from 'types'
import { LoginForm } from 'ui/auth'
import { supabase } from '../config/supabaseInit'
import getSettingsFromDatabase from '../utils/getSettingsFromDatabase'

interface Props {
    metadata: LoginSettings
}

const Login = ({ metadata }: Props) => {

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

    const loginWithProvider = (provider: LoginProvider,
        options?: { email?: string, password?: string }
    ) => {

        if (provider === "password") {
            passwordLogin(options.email, options.password)
        } else if (provider === "magic_link") {
            magicLinkLogin(options.email)
        } else {
            providerLogin(provider as Provider)
        }
    }

    /** Function to login using email and password */
    const passwordLogin = (email: string, password: string) => {

        setLoading(true)
        supabase.auth.signIn({ email, password })
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

    /** Function to login using email - magic link */
    const magicLinkLogin = (email: string) => {

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

    /** Function to login using provider */
    const providerLogin = (provider: Provider) => {

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
            <LoginForm metadata={metadata}
                callback={loginWithProvider}
                state={{
                    loading, error
                }} />
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { user, error } = await supabase.auth.api.getUserByCookie(req)

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
                metadata: await getSettingsFromDatabase(),
            },
        };
    }

}
export default Login