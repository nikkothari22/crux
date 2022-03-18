import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Navbar, Sidebar } from 'ui/layout';
import { signOut } from 'firebase/auth'
import getLoginSettingsFromDatabase from '../utils/getLoginSettingsFromDatabase';
import { auth } from '../config/firebaseInit';
import { useAuth } from '../context/userContext';

interface Props {
    children: React.ReactNode
};

interface Logo {
    light: string,
    dark: string
}

const AdminPanelPage = ({ children }: Props) => {

    const [logo, setLogo] = useState<Logo | undefined>()
    const { authUser } = useAuth();
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        console.log("Mounted")

        //Fetch metadata
        //TODO: Store login settings in Cache
        getLoginSettingsFromDatabase().then(metadata => {
            setLogo(metadata.logo)
            setLoading(false)
        })

    }, [])

    const logout = () => {
        signOut(auth)
    }

    return <>
        <Navbar logout={logout} logo={logo} userEmail={authUser?.email ?? ""} loading={loading} />
        <Box pt="50px">
            <Sidebar>
                {children}
            </Sidebar>
        </Box>
    </>
};

export default AdminPanelPage;