import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Text, HStack, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, Button, Flex, Stack, Skeleton, Center, Box, Heading, Icon, useColorModeValue } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { Docfield } from "types/doctypes"
import { CustomError } from "types/error"
import { AlertBanner } from "../../../layout"
import { DocfieldForm } from "../DocfieldForm/DocfieldForm"
import Image from 'next/image'

interface Props {
    getDocfields: () => Promise<Docfield[]>,
    addField: (f: Partial<Docfield>) => Promise<void>,
    editField: (f: Partial<Docfield>) => Promise<void>,
    deleteField: (name: string) => Promise<void>
}

export const DocfieldTable = ({ getDocfields, addField, editField, deleteField }: Props) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<CustomError | null>(null)
    const [fields, setFields] = useState<Docfield[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [fieldBeingEdited, setFieldBeingEdited] = useState<null | Docfield>(null)

    useEffect(() => {
        // console.log("Table mounted")
        getDocfields()
            .then(fields => {
                setFields(fields)
                setError(null)
            })
            .catch((e) => setError(e))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const openEditForm = useCallback((field: Docfield) => {
        onOpen()
        setFieldBeingEdited(field)
        console.log("Opening Editing", field.name)
    }, [])

    const openAddForm = useCallback(() => {
        console.log("Opening Adding")
        setFieldBeingEdited(null)
        onOpen()
    }, [])

    const addNewField = useCallback((f: Partial<Docfield>) => {
        console.log("Adding actually", f)
        addField(f)
            .then(() => getDocfields())
            .then(f => setFields(f))
        onClose()
    }, [])

    const editExistingField = useCallback((f: Partial<Docfield>) => {
        console.log("Editing", f)
        editField(f)
            .then(() => getDocfields())
            .then(f => setFields(f))
        onClose()
    }, [])

    const deleteAction = (id: string) => {
        deleteField(id)
            .then(() => getDocfields())
            .then(f => setFields(f))
    }

    return (
        <Box mt="8">
            <Heading as="h4" size="md">Fields</Heading>

            {loading ? <Flex width="full"><Stack><Skeleton height='20px' /><Skeleton height='20px' /><Skeleton height='20px' /></Stack></Flex> :

                error ? <AlertBanner status="error" heading="There was an error while fetching the docfields.">{error.message} - {error.code}</AlertBanner> :

                    fields.length === 0 ? <EmptyStateForDocfieldstable openAddForm={openAddForm} /> :

                        <>
                            <Button
                                my={8}
                                colorScheme="blue"
                                onClick={openAddForm}>
                                Add Field
                            </Button>

                            <TableContainer mb={16}>
                                <Table variant="simple" size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th py={4}>#</Th>
                                            <Th py={4}>Label</Th>
                                            <Th py={4}>Name</Th>
                                            <Th py={4}>Data Type</Th>
                                            <Th py={4}>Field Type</Th>
                                            <Th py={4}>Required</Th>
                                            <Th py={4}>Actions</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {fields.map((field, index) => <Tr key={field.name}>
                                            <Td>{index + 1}</Td>
                                            <Td>{field.label}</Td>
                                            <Td>{field.name}</Td>
                                            <Td>{field.dataType}</Td>
                                            <Td>{field.fieldType}</Td>
                                            <Td>{field.isRequired === "NO" ? <Icon as={CloseIcon} color='red.400' /> : <Icon color="green.400" as={CheckIcon} />}</Td>
                                            <Td>
                                                <HStack spacing={2}>
                                                    <IconButton
                                                        size="md"
                                                        variant="ghost"
                                                        colorScheme="blue"
                                                        aria-label='edit'
                                                        onClick={() => openEditForm(field)}
                                                        icon={<EditIcon />} />
                                                    <IconButton
                                                        size="md"
                                                        variant="ghost"
                                                        colorScheme="red"
                                                        aria-label='delete'
                                                        onClick={() => deleteAction(field.id)}
                                                        icon={<DeleteIcon />} />
                                                </HStack>
                                            </Td>
                                        </Tr>)}

                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </>
            }

            <DocfieldForm isOpen={isOpen} onClose={onClose} initFieldData={fieldBeingEdited ?? undefined} onSubmit={fieldBeingEdited ? editExistingField : addNewField} />

        </Box>
    )
}

interface EmptyStateProps {
    openAddForm: VoidFunction
}

const emptyStateGraphic = require("../../../assets/emptyStateDocfieldsImage.svg") as string;

export const EmptyStateForDocfieldstable = ({ openAddForm }: EmptyStateProps) => {

    return (
        <Center>
            <Stack align="center" spacing={{ base: 6, md: 4 }}>
                <Stack align="center" spacing={10}>
                    <Box>
                        <Image src={emptyStateGraphic} alt="empty state graphic" height={200} />
                    </Box>
                    <Stack align="center" spacing={1}>
                        <Text as="p" fontSize="xl" fontWeight="semibold" mt="2" color={useColorModeValue('gray.800', 'gray.100')} align="center">Next step: Define fields</Text>
                        <Text as="p" fontSize="sm" mt="2" color={useColorModeValue('gray.600', 'gray.300')} align="center">Add fields (and their metadata) that are associated with your database table.</Text>
                    </Stack>
                </Stack>
                <Button
                    colorScheme="blue"
                    onClick={openAddForm}
                >
                    Add Field
                </Button>
            </Stack>
        </Center>
    )

}