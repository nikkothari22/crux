import { ReactElement } from "react";
import AdminPanelPage from "../components/AdminPanelPage";
import { enforceAuthenticated } from "../utils/auth";
interface Props {

}

export default function Index(props: Props) {
  // console.log(user)
  // const randomBoolean = randomBoolean()


  return (
    <>
      <p>Supabase</p>
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