import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { Docfield, Doctype } from 'types/doctypes'
import { GenerateDummyDataForm } from 'ui/doctype'
import AdminPanelPage from '../../../components/AdminPanelPage'
import { enforceAuthenticated } from '../../../utils/auth'
import { getDoctype, getDocfields } from '../../../utils/db'

type Props = {}

const GenerateDummyData = (props: Props) => {

    const router = useRouter()
    const { doctype } = router.query
    const doctypeID = typeof doctype === "string" ? doctype : doctype[0]

    const getDoctypeDataCallback = (): Promise<Doctype> => {
        return getDoctype(doctypeID)
    }

    const getDocfieldsCallback = (): Promise<Docfield[]> => {
        return getDocfields(doctypeID)
    }

    return (
        <>
            <GenerateDummyDataForm getDoctypeData={getDoctypeDataCallback} getDocfields={getDocfieldsCallback} />
        </>
    );

}

GenerateDummyData.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export const getServerSideProps = enforceAuthenticated();

export default GenerateDummyData;