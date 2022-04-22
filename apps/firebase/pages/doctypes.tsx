import { ReactElement } from "react";
import AdminPanelPage from "../components/AdminPanelPage";
import ProtectedPageProvider from "../auth/ProtectedPageProvider";
import { Heading } from "@chakra-ui/react";

interface Props {

}

const Doctypes = (props: Props) => {
    return (
        <>
            <ProtectedPageProvider>
                <Heading>Doctypes</Heading>
            </ProtectedPageProvider>
        </>
    );
}

Doctypes.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export default Doctypes