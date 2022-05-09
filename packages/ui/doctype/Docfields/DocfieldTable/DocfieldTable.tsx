import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Text, HStack, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, Button, Flex, Spinner, Stack, Skeleton } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { Docfield } from "types/doctypes"
import { CustomError } from "types/error"
import { AlertBanner } from "../../../layout"
import { DocfieldForm } from "../DocfieldForm/DocfieldForm"

interface Props {
    getDocfields: () => Promise<Docfield[]>,
    addField: (f: Docfield) => Promise<void>,
    editField: (f: Docfield) => Promise<void>,
    deleteField: (name: string) => Promise<void>
}

export const DocfieldTable = ({ getDocfields, addField, editField, deleteField }: Props) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<CustomError | null>(null)
    const [fields, setFields] = useState<Docfield[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [fieldBeingEdited, setFieldBeingEdited] = useState<null | Docfield>(null)

    useEffect(() => {
        console.log("Table mounted")
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

    const addNewField = useCallback((f: Docfield) => {
        console.log("Adding actually", f)
        addField(f)
            .then(() => getDocfields())
            .then(f => setFields(f))
        onClose()
    }, [])

    const editExistingField = useCallback((f: Docfield) => {
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
        <>
            {loading ? <Flex width="full"><Stack><Skeleton height='20px' /><Skeleton height='20px' /><Skeleton height='20px' /></Stack></Flex> :

                error ? <AlertBanner status="error" heading="There was an error while fetching the docfields.">{error.message} - {error.code}</AlertBanner> :

                    <>
                        <Button
                            my={8}
                            colorScheme="blue"
                            onClick={openAddForm}>
                            Add Field
                        </Button>

                        <TableContainer mb={16}>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Label</Th>
                                        <Th>Name</Th>
                                        <Th>Data Type</Th>
                                        <Th>Field Type</Th>
                                        <Th>Default Validations</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {fields.map((field) => <Tr key={field.name}>
                                        <Td>{field.label}</Td>
                                        <Td>{field.name}</Td>
                                        <Td>{field.dataType}</Td>
                                        <Td>{field.fieldType}</Td>
                                        <Td>
                                            <Text>isRequired: {field.isRequired}</Text>
                                            <Text>isReadOnly: {field.isReadOnly}</Text>
                                        </Td>
                                        <Td>
                                            <HStack spacing={2}>
                                                <IconButton
                                                    size="lg"
                                                    variant="ghost"
                                                    colorScheme="blue"
                                                    aria-label='edit'
                                                    onClick={() => openEditForm(field)}
                                                    icon={<EditIcon />} />
                                                <IconButton
                                                    size="lg"
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

        </>
    )
}