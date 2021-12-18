import { ChakraProvider } from '@chakra-ui/react'
import { supabase } from '../config/supabaseInit'

function SupabaseAdminApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default SupabaseAdminApp