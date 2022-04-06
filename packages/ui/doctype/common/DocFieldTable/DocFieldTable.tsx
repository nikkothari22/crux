import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { HStack, IconButton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

type Props = {}

export const DocFieldTable = (props: Props) => {
    return (
        <>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Selector</Th>
                        <Th>Data Type</Th>
                        <Th>Field Type</Th>
                        <Th>Default Validations</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Employee name</Td>
                        <Td>emp_name</Td>
                        <Td>string</Td>
                        <Td>short text</Td>
                        <Td>isRequired</Td>
                        <Td>
                            <HStack spacing={2}>
                                <IconButton
                                    size="lg"
                                    variant="ghost"
                                    colorScheme="blue"
                                    aria-label='edit'
                                    icon={<EditIcon />} />
                                <IconButton
                                    size="lg"
                                    variant="ghost"
                                    colorScheme="red"
                                    aria-label='delete'
                                    icon={<DeleteIcon />} />
                            </HStack>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </>
    )
}