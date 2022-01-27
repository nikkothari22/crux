import { Box } from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoginSettings } from "types";
import { Navbar, Sidebar } from "ui/layout";
import { supabase } from "../config/supabaseInit";
import getSettingsFromDatabase from "../utils/getSettingsFromDatabase";

interface Props {
  metadata: LoginSettings,
  user: User
}

export default function Index({ metadata, user }: Props) {

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

  console.log(user)

  return (
    <div>
      <Navbar logout={logout} logo={metadata.logo} userEmail={user.email} />
      <Box pt="50px">
        <Sidebar />
      </Box>

    </div>
  );
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
        user: user,
        metadata: await getSettingsFromDatabase(),
      },
    }
  }
}