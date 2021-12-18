import { ChakraProvider } from '@chakra-ui/react'

function FirebaseAdminApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default FirebaseAdminApp