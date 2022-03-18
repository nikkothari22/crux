import { useState, useEffect } from 'react'
import { auth } from './firebaseInit';
import { onAuthStateChanged, User } from 'firebase/auth'

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<null | User>(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState: User) => {
        if (!authState) {
            setAuthUser(null)
        } else {
            setAuthUser(authState);
        }
        setLoading(false)

    };

    // listen for Firebase auth state change when mounted
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged)
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading
    };
}