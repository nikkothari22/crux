import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useContext } from 'react'
import { LoginProvider, LoginSettings } from 'types'
import { LoginForm } from 'ui/auth'
import { auth } from "../config/firebaseInit";
import { Error } from "../customHooks/FirestoreHooks";
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import getLoginSettingsFromDatabase from '../utils/getLoginSettingsFromDatabase'
import UserContext from '../commonFunctions/userContext'

interface Props {
    metadata: LoginSettings
}

const Login = ({ metadata }: Props) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null);

    const router = useRouter()
    const user = useContext(UserContext)

    useEffect(() => {
        if (user) {
            router.replace('/')
        }
    }, [user, router])

    const loginWithProvider = (provider: LoginProvider,
        options?: { email?: string, password?: string }
    ) => {

        if (provider === "password") {
            passwordLogin(options.email, options.password)
        } else if (provider === "google") {
            signInWithGoogle()
        }
    }

    /** Function to login using email and password */
    const passwordLogin = (email: string, password: string) => {

        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // router.replace('/')
                // The signed-in user info.
                // const user = result.user
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }

    /** Function to login using provider (Google) */
    const signInWithGoogle = () => {

        const googleProvider = new GoogleAuthProvider();
        const googleAuth = getAuth();

        signInWithPopup(googleAuth, googleProvider)
            .then((result) => {
                // The signed-in user info.
                // const user = result.user
            }).catch((error) => {
                setError(error);
                console.error(error)
            });
    };

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

    const { user } = await auth.api.getUserByCookie(req)

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
                metadata: await getLoginSettingsFromDatabase(),
            },
        };
    }

}

export default Login