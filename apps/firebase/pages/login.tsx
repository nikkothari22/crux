import React, { useEffect, useState } from 'react'
import { LoginProvider, LoginSettings } from 'types'
import { LoginForm } from 'ui/auth'
import { auth } from "../config/firebaseInit";
import { Error } from "../customHooks/FirestoreHooks";
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import getLoginSettingsFromDatabase from '../utils/getLoginSettingsFromDatabase'
import { useAuth } from '../context/userContext';
import { useRouter } from 'next/router';

const Login = () => {

    const { loading, authUser } = useAuth();
    const router = useRouter();

    const [loginSettings, setLoginSettings] = useState<null | LoginSettings>(null)
    const [loadingSettings, setLoadingSettings] = useState(true)

    //State to track whether the system is attempting to login
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [loginError, setLoginError] = useState<Error | null>(null);

    //Fetch login settings on mount if user is not logged in. Else redirect to home page
    useEffect(() => {
        if (!loading) {
            if (authUser) {
                router.replace('/')
            } else {
                getLoginSettingsFromDatabase().then(s => {
                    setLoginSettings(s)
                    setLoadingSettings(false)
                })
            }
        }
    }, [loading, authUser])

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

        setIsLoggingIn(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // The signed-in user info.
                // const user = result.user
            })
            .catch((error) => {
                setLoginError(error);
                setIsLoggingIn(false);
            });
    }

    /** Function to login using provider (Google) */
    const signInWithGoogle = () => {

        const googleProvider = new GoogleAuthProvider();
        const googleAuth = getAuth();

        setIsLoggingIn(true)
        signInWithPopup(googleAuth, googleProvider)
            .then((result) => {
                // The signed-in user info.
                // const user = result.user
            }).catch((error) => {
                setLoginError(error);
                setIsLoggingIn(false);
                console.error(error)
            });
    };

    return (
        <>
            {loadingSettings ? <p>Loading...</p> : <LoginForm metadata={loginSettings}
                callback={loginWithProvider}
                state={{
                    loading: isLoggingIn, error: loginError
                }} />}

        </>
    )
}

export default Login