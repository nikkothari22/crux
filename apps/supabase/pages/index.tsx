import { GetServerSideProps } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import AdminPanelPage from "../components/AdminPanelPage";
import { supabase } from "../config/supabaseInit";
interface Props {
}

export default function Index(props: Props) {

  // console.log(user)

  return (
    <>
      <p>Hello</p>
      <Link href="/settings">
        Settings
      </Link>
    </>
  );
}


Index.getLayout = function getLayout(page: ReactElement) {
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