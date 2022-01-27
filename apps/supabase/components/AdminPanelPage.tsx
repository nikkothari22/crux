import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Navbar, Sidebar } from 'ui/layout';
import { supabase } from '../config/supabaseInit';
import getSettingsFromDatabase from '../utils/getSettingsFromDatabase';

interface Props {
    // logo: {
    //     light: string,
    //     dark: string
    // },
    // userEmail?: string,
    children: React.ReactNode

};

interface Logo {
    light: string,
    dark: string
}

const AdminPanelPage = ({ children }: Props) => {

    const [logo, setLogo] = useState<Logo | undefined>()
    const [userEmail, setUserEmail] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("Mounted")
        //Fetch metadata
        getSettingsFromDatabase().then(metadata => {
            setLogo(metadata.logo)
            setLoading(false)
        })

        //Fetch user
        setUserEmail(supabase.auth.user().email)

    }, [])


    const router = useRouter()

    useEffect(() => {

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {

            fetch("/api/auth", {
                method: "POST",
                headers: new Headers({ "Content-Type": "application/json" }),
                credentials: "same-origin",
                body: JSON.stringify({ event, session }),
            }).then((res) => res.json());
            if (event === "SIGNED_OUT") {
                router.replace('/login')
            }
        })

        return () => {
            authListener.unsubscribe()
        }
    }, [router])

    const logout = () => {
        supabase.auth.signOut()
    }

    return <>
        <Navbar logout={logout} logo={logo} userEmail={userEmail} loading={loading} />
        <Box pt="50px">
            <Sidebar>
                {children}
            </Sidebar>
        </Box>
    </>
        ;
};

export default AdminPanelPage;