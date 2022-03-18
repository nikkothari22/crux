import { Badge, Box, Button, chakra, Divider, Flex, FormLabel, Heading, HStack, Input, Stack, useDisclosure } from '@chakra-ui/react'
import { BreadCrumb } from '../../layout'
import { AddMetadata } from '../AddMetadata/AddMetadata'

interface props {

}

export const CreateNewDoctypeUI = (props: props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <BreadCrumb
                currentPage="Create new doctype"
                previousPage="Doctypes"
                previousPageLink="/doctypes" />

            <chakra.form
                id="doctypeForm">

                <Flex
                    mr="16"
                    justifyContent="space-between"
                    align="center">
                    <HStack>
                        <Heading fontSize={{ base: '20px', md: '30px', lg: '40px' }}>
                            Untitled Doctype1
                        </Heading>
                        <Badge ml="1"
                            colorScheme="orange">
                            not saved
                        </Badge>
                    </HStack>
                    <Button
                        fontSize={{ base: '10px', md: '12px', lg: '16px' }}
                        ml={{ base: 16, md: 0, lg: 0 }}
                        colorScheme="blue">
                        Save
                    </Button>
                </Flex>
                <Divider mt={{ base: 4, md: 4, lg: 6 }} maxW="90vw" />

                <Box>
                    <Stack spacing={8} mt={{ base: 4, md: 4, lg: 6 }}>
                        <Stack spacing={1}>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <Input
                                maxW="60%"
                                placeholder="The display label for your doctype"
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <FormLabel>
                                Fetch from
                            </FormLabel>
                            <Input
                                maxW="60%"
                                placeholder="The table name from where we will fetch your data" />
                        </Stack>
                    </Stack>
                    <Divider mt={{ base: 4, md: 6, lg: 8 }} maxW="90vw" />
                    <AddMetadata />
                </Box>

            </chakra.form>
        </>
    )
}