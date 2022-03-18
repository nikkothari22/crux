import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CustomError, LoginProvider, LoginSettings } from 'types'
import { SignupForm } from 'ui/auth'
import { useAuth } from '../context/userContext'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import getLoginSettingsFromDatabase from '../utils/getLoginSettingsFromDatabase'

const Signup = () => {

    const { loading, authUser } = useAuth();
    const router = useRouter();

    const [loginSettings, setLoginSettings] = useState<null | LoginSettings>(null)
    const [loadingSettings, setLoadingSettings] = useState(true)

    //State to track whether the system is attempting to login
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [signupError, setSignupError] = useState<CustomError | null>(null);

    //Fetch signup settings on mount if user is not logged in. Else redirect to home page
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

    const signUpWithProvider = (provider: LoginProvider,
        options?: { email?: string, password?: string }
    ) => {

        if (provider === "password") {
            passwordSignup(options.email, options.password)
        } else if (provider === "google") {
            signUpWithGoogle()
        }
    }

    /** Function to Signup using email and password */
    const passwordSignup = (email: string, password: string) => {

        const auth = getAuth();
        setIsSigningUp(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setSignupError(error)
                setIsSigningUp(false);
                // ..
            });
    }

    /** Function to signup using provider (Google) */
    const signUpWithGoogle = () => {

        const googleProvider = new GoogleAuthProvider();
        const googleAuth = getAuth();

        setIsSigningUp(true)
        signInWithPopup(googleAuth, googleProvider)
            .then((result) => {
                // The signed-in user info.
                // const user = result.user
            }).catch((error) => {
                setSignupError(error);
                setIsSigningUp(false);
                console.error(error)
            });
    };

    return (
        <>
            {loadingSettings ? <p>Loading...</p> : <SignupForm metadata={loginSettings}
                callback={signUpWithProvider}
                state={{
                    loading: isSigningUp, error: signupError
                }} />}

        </>
    )
}

export default Signup