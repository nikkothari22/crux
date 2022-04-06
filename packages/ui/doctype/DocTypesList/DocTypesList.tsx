import { Box, Button, Divider, Flex, Heading, Stack } from '@chakra-ui/react'
import { BreadCrumb } from '../../layout'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

interface DocTypeListElement {
    name: string
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
                currentPage="Doctypes" />

            <Flex justifyContent="space-between">
                <Heading fontSize={{ base: '20px', md: '30px', lg: '40px' }}>
                    DocTypes
                </Heading>
                <NextLink href='/doctypes/create'>
                    <Button mr={20} colorScheme="blue" as="a">
                        Create New DocType
                    </Button>
                </NextLink>
            </Flex>

            <Divider mt={{ base: 4, md: 4, lg: 6 }} maxW="90vw" />

            <Stack spacing={2}>
                {doctypeList?.map(doctype =>
                    <>
                        <Box mt={10}>
                            <NextLink
                                href={`/doctypes/${doctype.name}`}
                                key={doctype.name}>
                                {doctype.name}
                            </NextLink>
                        </Box>
                    </>
                )}
            </Stack>

        </>
    )
}