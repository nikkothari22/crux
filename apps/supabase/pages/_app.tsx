import { ChakraProvider } from '@chakra-ui/react'
import { supabase } from '../config/supabaseInit'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function SupabaseAdminApp({ Component, pageProps }: AppPropsWithLayout) {

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <ChakraProvider>
            {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
    )
}

export default SupabaseAdminApp