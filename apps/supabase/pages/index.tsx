import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoginSettings } from "types";
import { Navbar, Sidebar } from "ui/layout";
import { supabase } from "../config/supabaseInit";

interface Props {
  metadata: LoginSettings
}

export default function Index({ metadata }: Props) {

  const router = useRouter()
  // const { logo } = metadata

  const logout = () => {
    supabase.auth.signOut()
  }

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

  return (
    <div>
      <Navbar logout={logout} />
      <Sidebar />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const { user, error } = await supabase.auth.api.getUserByCookie(req)

  console.log(user)
  console.log(error)

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  } else {
    return {
      props: {}
    }
  }
}