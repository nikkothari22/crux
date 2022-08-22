import { ChakraProvider } from '@chakra-ui/react'
import { ReactElement, ReactNode, useEffect } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { supabase } from '../config/supabaseInit'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import '../nprogress.css'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function SupabaseAdminApp({ Component, pageProps }: AppPropsWithLayout) {

    const router = useRouter()

    useEffect(() => {
        NProgress.configure({ showSpinner: false });
    }, [])

    useEffect(() => {
        router.events.on('routeChangeStart', () => NProgress.start());
        router.events.on('routeChangeComplete', () => NProgress.done());
        router.events.on('routeChangeError', () => NProgress.done());
    }, [router]);

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

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <ChakraProvider>
            {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
    )
}

export default SupabaseAdminApp