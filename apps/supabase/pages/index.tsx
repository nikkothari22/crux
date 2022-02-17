import { ReactElement } from "react";
import { Table } from "ui/layout";
import AdminPanelPage from "../components/AdminPanelPage";
import enforceAuthenticated from "../utils/enforceAuthenticated";
interface Props {

}

export default function Index(props: Props) {
  // console.log(user)
  return (
    <>
      <p>Hello</p>
      <Table />
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