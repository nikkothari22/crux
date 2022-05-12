import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Docfield } from "types/doctypes"

interface Props {
    docfields: Docfield[]
    data: any[]
}

export const DummyDataTable = ({ docfields, data }: Props) => {

    // console.log(docfieldData)

    return (
        <>

            <Box mt={10}>
                <TableContainer mb={16}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                {docfields.map((df) =>
                                    <Th key={df.id}>{df.label}</Th>
                                )}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map(d =>
                                <Tr key={d.id}>
                                    {docfields.map(df => {
                                        if (df.dataType === "string") {
                                            return <Td>{d[df.label]}</Td>
                                        } else if (df.dataType === "boolean") {
                                            if (df.fieldType === "Yes/No")
                                                return <Td>{d[df.label] ? "Yes" : "No"}</Td>
                                            else if (df.fieldType === "True/False")
                                                return <Td>{d[df.label] ? "True" : "False"}</Td>
                                            else if (df.fieldType === "1/0")
                                                return <Td>{d[df.label] ? "1" : "0"}</Td>
                                        }
                                    })}
                                </Tr>)}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

        </>
    )
}