import { ReactElement } from "react";
import ProtectedPageProvider from "../auth/ProtectedPageProvider";
import AdminPanelPage from "../components/AdminPanelPage";

interface Props {

}

export default function Index(props: Props) {
  // console.log(user)
  return (
    <>
      <ProtectedPageProvider>
        <p>Firebase</p>
      </ProtectedPageProvider>
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