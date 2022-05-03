import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { Docfield, Doctype } from 'types/doctypes'
import { GenerateDummyDataForm } from 'ui/doctype'
import AdminPanelPage from '../../../components/AdminPanelPage'
import enforceAuthenticated from '../../../utils/enforceAuthenticated'
import getDocfieldsForDoctype from '../../../utils/getDocfieldsDetailsFromDatabase'
import { getDoctypeData } from '../../../utils/getDoctypeData'

type Props = {}

const GenerateDummyData = (props: Props) => {

    const router = useRouter()
    const { doctype } = router.query
    const doctypeID = typeof doctype === "string" ? doctype : doctype[0]

    const getDoctypeDataCallback = (): Promise<Doctype> => {
        return getDoctypeData(doctypeID)
    }

    const getDocfields = (): Promise<Docfield[]> => {
        return getDocfieldsForDoctype(doctypeID)
    }

    return (
        <>
            <GenerateDummyDataForm getDoctypeData={getDoctypeDataCallback} getDocfields={getDocfields} />
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