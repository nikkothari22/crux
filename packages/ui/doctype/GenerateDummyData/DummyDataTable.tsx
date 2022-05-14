import { Box, BoxProps, Button, ButtonGroup, ButtonProps, Code, Flex, FormControl, FormLabel, HStack, Switch, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useBoolean, useClipboard, useDisclosure } from "@chakra-ui/react"
import { Docfield } from "types/doctypes"
import { VscJson } from 'react-icons/vsc'
import { GrDocumentCsv } from 'react-icons/gr'
import { useMemo } from "react"
import { getBooleanField, getIntegerField } from "../DataVisualization/DocfieldVisualRepresentation"
import { JSONView } from "./JSONView"
interface Props {
    docfields: Docfield[]
    data: any[]
}

export const DummyDataTable = ({ docfields, data }: Props) => {

    // console.log(docfieldData)

    const [visualOn, { toggle }] = useBoolean(true);

    const jsonModal = useDisclosure();

    const visualData = useMemo(() => {
        return data.map((row) => <Tr key={row.id}>
            <Td>{row.id}.</Td>
            {docfields.map((field) => {
                switch (field.dataType) {
                    case "int": return <Td isNumeric key={field.id}>{getIntegerField(field, row)}</Td>
                    case 'float': return <Td isNumeric key={field.id}>{getIntegerField(field, row)}</Td>
                    case "boolean": return <Td key={field.id}>{getBooleanField(field, row)}</Td>
                    default: return <Td key={field.id}></Td>
                }
            })}
        </Tr>
        )
    }, [docfields, data])

    return (
        <>
            <HStack justify={'between'} mt="4">
                <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='visual' mb='0' >
                        Show data with visual representation
                    </FormLabel>
                    <Switch id='visual' isChecked={visualOn} onChange={toggle} />
                </FormControl>
                <ButtonGroup size={'sm'}>
                    <Button leftIcon={<VscJson />} onClick={jsonModal.onOpen}>
                        JSON
                    </Button>
                    <Button leftIcon={<GrDocumentCsv />}>
                        CSV
                    </Button>
                </ButtonGroup>

            </HStack>
            <Box mt={6}>
                <TableContainer mb={16}>
                    <Table variant="striped" size={'sm'} colorScheme="gray">
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                {docfields.map((df) =>
                                    <Th key={df.id} isNumeric={df.dataType === "int" || df.dataType === "float"}>{df.label} {df.isRequired && <Text as="span" color="red.400">*</Text>}</Th>
                                )}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {visualOn ? visualData :

                                data.map(d => <Tr key={d.id}>
                                    <Td>{d.id}.</Td>
                                    {docfields.map(df => <Td isNumeric={df.dataType === "float" || df.dataType === "int"}>{
                                        df.dataType === "boolean" ? <Code>{d[df.name] ? "true" : "false"}</Code> : d[df.name]}</Td>)}
                                </Tr>
                                )}
                        </Tbody>
                    </Table>
                </TableContainer>
                <JSONView data={data} {...jsonModal} />
            </Box>

        </>
    )
}
