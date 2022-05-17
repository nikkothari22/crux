import { Text, Button, Divider, Flex, Heading, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, ButtonGroup, IconButton, Tooltip, Spinner, Box, Center, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import { AlertBanner, BreadCrumb } from '../../layout'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { CustomError } from 'types/error'
import Image from 'next/image'
import { Doctype } from 'types/doctypes'
import { DeleteDoctype } from '../DeleteDoctype/DeleteDoctype'

interface DoctypeListElement {
    id: string,
    name: string,
    source: string,
    updated_on: string,
    created_at: string,
}
interface Props {
    getDoctypes: () => Promise<DoctypeListElement[]>,
    deleteDoctype: (doctypeID: string) => Promise<void>
}

export const DoctypesList = ({ getDoctypes, deleteDoctype }: Props) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<CustomError | null>(null)
    const [doctypeList, setDoctypeList] = useState<DoctypeListElement[]>([])
    const router = useRouter()
    const { onOpen, isOpen, onClose } = useDisclosure()
    const [doctypeToBeDeleted, setDoctypeToBeDeleted] = useState("")
    const toast = useToast()

    useEffect(() => {
        if (doctypeToBeDeleted) {
            onOpen();
        } else {
            onClose();
        }
    }, [doctypeToBeDeleted])

    const setDeleteDoctype = (doctypeID: string) => {
        setDoctypeToBeDeleted(doctypeID)
    }

    const deleteAction = async () => {
        return deleteDoctype(doctypeToBeDeleted)
            .then(() => {
                toast({
                    title: 'Doctype Deleted',
                    status: 'error',
                    duration: 1000,
                    position: 'bottom',
                    variant: 'solid',
                    isClosable: true,
                })
                refreshList()
            })
            .catch(e => showErrorToast(e))
    }

    const refreshList = () => {
        getDoctypes()
            .then(data => {
                setDoctypeList(data)
                setError(null)
            })
            .catch(e => setError(e))
    }
    const showErrorToast = (error: Error) => {
        console.error("error creating doctype", error)
        toast({
            duration: 2000,
            position: 'bottom',
            variant: 'solid',
            isClosable: true,
            status: 'error',
            title: 'Error',
            description: `${error.message}`
        })
    }
    const resetDelete = () => {
        setDoctypeToBeDeleted("")
    }

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
                        name: "Home",
                        url: '/',
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

            {loading ? <Flex align="center" justify="center" height="50vh" width="full"><Spinner /></Flex> :

                error ? <AlertBanner status="error" heading="There was an error while fetching the request.">{error.message} - {error.code}</AlertBanner> :


                    doctypeList.length === 0 ? <EmptyStateForDoctypeList /> :

                        <Stack spacing={2} py={12}>
                            <TableContainer>
                                <Table variant='simple' size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th py={4}>#</Th>
                                            <Th py={4}>Name</Th>
                                            <Th py={4}>Source</Th>
                                            <Th py={4}>Created On</Th>
                                            <Th py={4}>Last Modified</Th>
                                            <Th py={4}>Actions</Th>
                                            <Th py={4}>Fake Data</Th>
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
                                                        {(new Date(doctype.created_at)).toLocaleDateString()}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <Text>
                                                        {(new Date(doctype.updated_on)).toLocaleDateString()}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <ButtonGroup spacing={2}>
                                                        <IconButton
                                                            onClick={() => router.push(`/doctypes/${doctype.id}`)}
                                                            size="sm"
                                                            variant="ghost"
                                                            title="Edit"
                                                            colorScheme="blue"
                                                            aria-label='Edit'
                                                            icon={<EditIcon />} />
                                                        <IconButton
                                                            onClick={() => setDeleteDoctype(doctype.id)}
                                                            size="sm"
                                                            variant="ghost"
                                                            colorScheme="red"
                                                            aria-label='Delete'
                                                            title="Delete"
                                                            icon={<DeleteIcon />} />
                                                    </ButtonGroup>
                                                </Td>
                                                <Td>
                                                    <NextLink href={`/doctypes/generate-dummy-data/${doctype.id}`} passHref>
                                                        <Button variant="outline" colorScheme={'blue'} size="sm">
                                                            Generate
                                                        </Button>
                                                    </NextLink>
                                                </Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Stack>
            }
            <DeleteDoctype onClose={resetDelete} isOpen={isOpen} deleteAction={deleteAction} />
        </>
    )
}

const emptyStateGraphic = require("../../assets/emptyStateDoctypeListImage.svg") as string;

export const EmptyStateForDoctypeList = () => {

    return (
        <Center pt="100px">
            <Stack align="center" spacing={{ base: 8, md: 6 }}>
                <Stack align="center" spacing={10}>
                    <Stack align="center" spacing={1} px={2}>
                        <Text as="p" fontSize="xl" fontWeight="semibold" mt="2" color={useColorModeValue('gray.800', 'gray.100')} align="center">Get started by creating your first doctype.</Text>
                        <Text as="p" fontSize="md" maxW="40vw" mt="2" color={useColorModeValue('gray.600', 'gray.300')} align="center">Doctypes are essential metadata about your data tables, which allows the tool to generate high-quality fake data.</Text>
                    </Stack>
                    <Box>
                        <Image src={emptyStateGraphic} alt="empty state graphic" height={260} />
                    </Box>
                </Stack>
            </Stack>
        </Center>
    )

}