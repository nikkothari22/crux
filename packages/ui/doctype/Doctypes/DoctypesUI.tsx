import { Button, Divider, Heading } from '@chakra-ui/react'
import { BreadCrumb } from '../../layout'
import NextLink from 'next/link'

interface props {

}

export const DoctypesUI = (props: props) => {
    return (
        <>
            <BreadCrumb
                currentPage="Doctypes" />
            <Heading fontSize={{ base: '20px', md: '30px', lg: '40px' }}>
                Doctypes
            </Heading>
            <Divider mt={{ base: 4, md: 4, lg: 6 }} maxW="90vw" />

            <NextLink href='/doctypes/create'>
                <Button mt={8} colorScheme="blue" as="a">
                    Create New Doctype
                </Button>
            </NextLink>
        </>
    )
}