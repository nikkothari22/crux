import { Text, Button, Divider, Flex, Heading, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, ButtonGroup, IconButton, Tooltip, Spinner, Box, Center } from '@chakra-ui/react'
import { AlertBanner, BreadCrumb } from '../../layout'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { CustomError } from 'types/error'
import Image from 'next/image'

interface DoctypeListElement {
    id: string,
    name: string,
    source: string,
    updated_on: string,
    created_at: string,
}
interface props {
    getDoctypes: () => Promise<any>,
}

export const DoctypesList = ({ getDoctypes }: props) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<CustomError | null>(null)
    const [doctypeList, setDoctypeList] = useState<DoctypeListElement[]>([])
    const router = useRouter()

    useEffect(() => {
        getDoctypes()
            .then((data) => {
                console.log(data)
                setDoctypeList(data)
                setError(null)
            })
            .catch((e) => setError(e))
            .finally(() => {
                setLoading(false)
            })
    }, []);

    return (
        <>
            <BreadCrumb
                pages={
                    [{
                        name: "Doctypes",
                        url: '/doctypes',
                    }]
                } />

            <Flex justifyContent="space-between">
                <Heading fontSize={{ base: '20px', md: '30px', lg: '40px' }}>
                    Doctypes
                </Heading>
                <NextLink href='/doctypes/create'>
                    <Button colorScheme="blue" as="a">
                        Create New Doctype
                    </Button>
                </NextLink>
            </Flex>

            <Divider mt={{ base: 4, md: 4, lg: 6 }} />

            {doctypeList !== null && doctypeList.length === 0 && <EmptyStateForDoctypeList />}

            {loading ? <Flex align="center" justify="center" height="50vh" width="full"><Spinner /></Flex> :

                error ? <AlertBanner status="error" heading="There was an error while fetching the request.">{error.message} - {error.code}</AlertBanner> :

                    doctypeList !== null && error === null && doctypeList.length > 0 &&

                    <Stack spacing={2} py={12}>
                        <TableContainer>
                            <Table variant='simple' size="sm">
                                <Thead>
                                    <Tr>
                                        <Th py={4}>#</Th>
                                        <Th>Name</Th>
                                        <Th>Source</Th>
                                        <Th>Last Modified</Th>
                                        <Th>Created On</Th>
                                        <Th>Generate Dummy Data</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {doctypeList?.map((doctype, index) =>
                                        <Tr key={doctype.name}>
                                            <Td>{index}</Td>
                                            <Td>
                                                <NextLink
                                                    href={`/doctypes/${doctype.id}`}>
                                                    {doctype.name}
                                                </NextLink>
                                            </Td>
                                            <Td>
                                                <Text>
                                                    {doctype.source}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text>
                                                    {doctype.updated_on.substring(0, 10)}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text>
                                                    {doctype.created_at.substring(0, 10)}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <NextLink href={`/doctypes/generate-dummy-data/${doctype.id}`} passHref>
                                                    <Button variant="outline" color="blue.600" size="sm">
                                                        generate data
                                                    </Button>
                                                </NextLink>
                                            </Td>
                                            <Td>
                                                <ButtonGroup spacing={2}>
                                                    <Tooltip label='Edit' fontSize='sm'>
                                                        <IconButton
                                                            onClick={() => router.push(`/doctypes/${doctype.id}`)}
                                                            size="sm"
                                                            variant="ghost"
                                                            colorScheme="blue"
                                                            aria-label='edit'
                                                            icon={<EditIcon />} />
                                                    </Tooltip>
                                                    <Tooltip label='Delete' fontSize='sm'>
                                                        <IconButton
                                                            // onClick={() => }
                                                            size="sm"
                                                            variant="ghost"
                                                            colorScheme="red"
                                                            aria-label='delete'
                                                            icon={<DeleteIcon />} />
                                                    </Tooltip>
                                                </ButtonGroup>
                                            </Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Stack>
            }
        </>
    )
}

const emptyStateGraphic = require("../../assets/emptyStateDoctypeListImage.svg") as string;

export const EmptyStateForDoctypeList = () => {

    return (
        <Center h={{ base: "calc(100vh - 350px)", md: "calc(100vh - 240px)" }}>
            <Stack align="center" spacing={{ base: 8, md: 6 }}>
                <Stack align="center" spacing={10}>
                    <Stack align="center" spacing={1} px={2}>
                        <Text as="p" fontSize="xl" fontWeight="semibold" mt="2" color="gray.800" align="center">You have not created any doctypes yet</Text>
                        <Text as="p" fontSize="sm" mt="2" color="gray.600" align="center">Doctypes help you to capture essential metadata about your data tables.</Text>
                    </Stack>
                    <Box mt={10}>
                        <Image src={emptyStateGraphic} alt="empty state graphic" height={260} />
                    </Box>
                </Stack>
            </Stack>
        </Center>
    )

}