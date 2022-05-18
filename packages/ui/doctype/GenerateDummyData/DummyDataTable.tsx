import { Box, Button, ButtonGroup, Center, Code, FormControl, FormLabel, HStack, Stack, Switch, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useBoolean, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { Docfield } from "types/doctypes"
import { VscJson } from 'react-icons/vsc'
import { useMemo } from "react"
import { getBooleanField, getIntegerField, getStringField } from "../DataVisualization/DocfieldVisualRepresentation"
import { JSONView } from "./JSONView"
import { FiDatabase } from "react-icons/fi"
import { CSVDownloadButton } from "./CSVDownloadButton"
import Image from 'next/image'
import NextLink from 'next/link'
const emptyStateGraphic = require("../../assets/noDataFound.svg") as string;
const noDataStateGraphic = require("../../assets/almostThereGenerateData.svg") as string;

interface Props {
    docfields: Docfield[]
    data: any[]
    doctype: string
}

export const DummyDataTable = ({ docfields, data, doctype }: Props) => {

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
                    case "string": return <Td key={field.id}>{getStringField(field, row)}</Td>
                    default: return <Td key={field.id}></Td>
                }
            })}
        </Tr>
        )
    }, [docfields, data])

    return (

        <>
            {/* No docfields have been defined yet, fake data cannot be generated */}
            {docfields.length === 0 && <NoDocfieldStateForDummyDataTable doctype={doctype} />}

            {/* Docfields have been defined but user has not generated any data, there is nothing to display */}
            {docfields.length > 0 && data.length === 0 && <NoDataStateForDummyDataTable />}

            {/* User has generated fake data, show data table with options to download */}
            {docfields.length > 0 && data.length > 0 &&
                <Box>
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
                            <CSVDownloadButton data={data} docfields={docfields} />
                            <Button leftIcon={<FiDatabase />}>
                                Upload to Database
                            </Button>
                        </ButtonGroup>
                    </HStack>

                    <Box mt={6}>
                        <TableContainer mb={16}>
                            <Table variant="striped" size={'sm'} colorScheme="gray">
                                <Thead>
                                    <Tr>
                                        <Th py="4">#</Th>
                                        {docfields.map((df) =>
                                            <Th py="4" key={df.id} isNumeric={df.dataType === "int" || df.dataType === "float"}>{df.label} {df.isRequired && <Text as="span" color="red.400">*</Text>}</Th>
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
                </Box>
            }
        </>
    )
}

interface EmptyStateProps {
    doctype: string
}

export const NoDocfieldStateForDummyDataTable = ({ doctype }: EmptyStateProps) => {

    return (
        <Center mt="40px">
            <Stack align="center" spacing={{ base: 8, md: 6 }}>
                <Box>
                    <Image src={emptyStateGraphic} alt="empty state graphic" height={260} />
                </Box>
                <Stack align="center" spacing={10}>
                    <Stack align="center" spacing={1} px={2}>
                        <Text as="p" fontSize="xl" fontWeight="semibold" mt="2" color={useColorModeValue('gray.800', 'gray.100')} align="center">You have not defined any fields for this doctype.</Text>
                        <Text as="p" fontSize="sm" mt="2" color={useColorModeValue('gray.600', 'gray.300')} align="center">Please add the fields to generate appropriate fake data.</Text>
                    </Stack>
                </Stack>
                <Button colorScheme="blue">
                    <NextLink
                        href={`/doctypes/${doctype}`}>
                        Add Docfields
                    </NextLink>
                </Button>
            </Stack>
        </Center>
    )
}

export const NoDataStateForDummyDataTable = () => {

    return (
        <Center mt={20}>
            <Stack align="center" spacing={{ base: 8, md: 6 }}>
                <Box>
                    <Image src={noDataStateGraphic} alt="empty state graphic" height={260} />
                </Box>
                <Stack align="center" spacing={10}>
                    <Stack align="center" spacing={1} px={2}>
                        <Text as="p" fontSize="xl" fontWeight="semibold" mt="2" color={useColorModeValue('gray.800', 'gray.100')} align="center">All set.</Text>
                        <Text as="p" fontSize="sm" mt="2" color={useColorModeValue('gray.600', 'gray.300')} align="center">Click on "Generate Fake Data" on the top right corner.</Text>
                    </Stack>
                </Stack>
            </Stack>
        </Center>
    )
}