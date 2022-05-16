import { Button } from "@chakra-ui/react"
import { GrDocumentCsv } from "react-icons/gr"
import { Docfield } from "types/doctypes"
import { CSVLink } from "react-csv";
import { useMemo } from "react";

interface Props {
    docfields: Docfield[]
    data: any[]
}

export const CSVDownloadButton = ({ data, docfields }: Props) => {

    const headers: { label: string, key: string }[] = useMemo(() => {
        return docfields.map(field => { return { label: field.label, key: field.name } })
    }, [docfields])

    return (
        <Button leftIcon={<GrDocumentCsv />} as={CSVLink} data={data} headers={headers} filename="fake-data.csv">
            CSV
        </Button>
    )
}