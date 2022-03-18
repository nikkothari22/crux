import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useAuth } from '../context/userContext';

const ProtectedPageProvider = ({ children }) => {
    const { authUser, loading } = useAuth();
    const router = useRouter();

    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        if (!loading && !authUser)
            router.push('/login')
    }, [authUser, loading])

    return (
        <>
            {!loading && authUser ? children : <p>Loading...</p>}
        </>
    )
}

export default ProtectedPageProvider