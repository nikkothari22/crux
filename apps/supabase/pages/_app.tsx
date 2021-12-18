import { ChakraProvider } from '@chakra-ui/react'

function SupabaseAdminApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default SupabaseAdminApp