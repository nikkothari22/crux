import { ReactElement } from "react";
import { DoctypesList } from "ui/doctype";
import AdminPanelPage from "../components/AdminPanelPage";
import { supabase } from "../config/supabaseInit";
import { enforceAuthenticated } from "../utils/auth";
interface Props {

}

export default function Index(props: Props) {
  const getDoctypesFromDatabase = async () => {
    let { data, error } = await supabase.from('crux_doctypes')
      .select(`id, name, source, updated_on, created_at`)
      .order('updated_on', { ascending: false })
    if (error) {
      console.error("error:", error)
      throw error
    } else {
      return data
    }
  }

  return (
    <>
      <DoctypesList getDoctypes={getDoctypesFromDatabase} />
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

export const getServerSideProps = enforceAuthenticated();