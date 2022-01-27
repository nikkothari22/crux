import { GetServerSideProps } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import AdminPanelPage from "../components/AdminPanelPage";
import { supabase } from "../config/supabaseInit";
interface Props {
}

export default function Settings(props: Props) {

    return (
        <>
            <p>Settings</p>
            <Link href="/">
                Back to home
            </Link>
        </>
    );
}


Settings.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { user, error } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    } else {
        return {
            props: {
            },
        }
    }
}