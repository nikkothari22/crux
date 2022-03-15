import { ChakraProvider } from '@chakra-ui/react'
import { ReactElement, ReactNode, useEffect } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function FirebaseAdminApp({ Component, pageProps }: AppPropsWithLayout) {

    const router = useRouter()

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default FirebaseAdminApp