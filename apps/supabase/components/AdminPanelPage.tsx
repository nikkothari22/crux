import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Navbar, Sidebar } from 'ui/layout';
import { supabase } from '../config/supabaseInit';
import { getLoginSettings } from '../utils/db';

interface Props {
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
        getLoginSettings().then(metadata => {
            setLogo(metadata.logo)
            setLoading(false)
        })

        //Fetch user
        setUserEmail(supabase.auth.user()?.email)

    }, [])

    const logout = () => {
        supabase.auth.signOut()
    }

    return <>
        <Navbar logout={logout} logo={logo} userEmail={userEmail} loading={loading} />
        <Box pt="70px" px="8">
            {/* <Sidebar> */}
            {children}
            {/* </Sidebar> */}
        </Box>
    </>
};

export default AdminPanelPage;