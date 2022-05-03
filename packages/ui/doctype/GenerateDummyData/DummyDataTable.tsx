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
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                {docfields.map((df) =>
                                    <Th key={df.id}>{df.name}</Th>
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
                                            return <Td>
                                                {d[df.label] ? "Yes" : "No"}
                                            </Td>
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