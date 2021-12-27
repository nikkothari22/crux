import { Button } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Navbar } from "ui/layout";
import { supabase } from "../config/supabaseInit";

export default function Index() {

  const router = useRouter()

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
      <Navbar />
      <h1>Supabase</h1>
      <Button onClick={logout}>Logout</Button>
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



