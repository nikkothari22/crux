import { Text, Button, Divider, Flex, Heading, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { BreadCrumb } from '../../layout'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

interface DocTypeListElement {
    name: string,
    source: string,
    updated_on: Date
}
interface props {
    getDoctypes: () => Promise<any>,
}

export const DocTypesList = ({ getDoctypes }: props) => {

    const [doctypeList, setDoctypeList] = useState<DocTypeListElement[]>([])
    useEffect(() => {
        getDoctypes().then((data) => {
            console.log(data)
            setDoctypeList(data)
        });
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

            <Divider mt={{ base: 4, md: 4, lg: 6 }} maxW="90vw" />

            <Stack spacing={2}>
                <TableContainer mt={10}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Source</Th>
                                <Th>Last Modified</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {doctypeList?.map(doctype =>
                                <Tr key={doctype.name}>
                                    <Td>
                                        <NextLink
                                            href={`/doctypes/${doctype.name}`}>
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
                                            {doctype.updated_on}
                                        </Text>
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>

        </>
    )
}