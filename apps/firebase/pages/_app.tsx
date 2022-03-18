import { ChakraProvider } from '@chakra-ui/react'
import { ReactElement, ReactNode, useEffect } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { AuthUserProvider } from '../context/userContext'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function FirebaseAdminApp({ Component, pageProps }: AppPropsWithLayout) {

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <ChakraProvider>
            <AuthUserProvider>
                {getLayout(<Component {...pageProps} />)}
            </AuthUserProvider>
        </ChakraProvider>
    )
}

export default FirebaseAdminApp