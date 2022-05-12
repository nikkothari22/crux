import { Badge, Box, Button, chakra, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Stack, useToast } from '@chakra-ui/react'
import { BreadCrumb } from '../../layout'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Doctype } from 'types/doctypes'

interface props {
    create: (doctypeData: Doctype) => Promise<void>
}

//TODO: Define better types for DocType form in useForm and form submission

export const CreateDoctypeForm = ({ create }: props) => {

    const [updating, setUpdating] = useState(false)
    const { register, handleSubmit, formState: { errors }, } = useForm<Doctype>()
    const toast = useToast()

    const createDoctype = (submittedData: Doctype) => {
        setUpdating(true)
        create(submittedData)
            .catch((error) => {
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
            })
            .finally(() => setUpdating(false))
    }

    return (
        <>
            <BreadCrumb
                pages={
                    [{
                        name: "Doctypes",
                        url: '/doctypes',
                    },
                    {
                        name: "Create New Doctype",
                        url: '/doctypes/create',
                        isCurrent: true
                    }]
                } />

            <chakra.form id="doctypeForm" onSubmit={handleSubmit(createDoctype)}>

                <Flex
                    justifyContent="space-between"
                    align="center">
                    <HStack>
                        <Heading fontSize={{ base: '20px', md: '30px', lg: '40px' }}>
                            New Doctype
                        </Heading>
                        {/* <Badge ml="1"
                            colorScheme="orange">
                            not saved
                        </Badge> */}
                    </HStack>
                    <Button
                        fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                        ml={{ base: 16, md: 0, lg: 0 }}
                        colorScheme="blue"
                        type="submit"
                        isLoading={updating}
                        loadingText="Saving..."
                    >
                        Save
                    </Button>
                </Flex>
                <Divider mt={{ base: 4, md: 4, lg: 6 }} />

                <Box>
                    <Stack spacing={8} mt={{ base: 4, md: 4, lg: 6 }}>

                        <FormControl
                            isRequired
                            isInvalid={!!errors?.name}>
                            <Stack spacing={2}>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <Input
                                    {...register("name",
                                        {
                                            required: "The doctype name should not be blank",
                                            maxLength: {
                                                value: 100,
                                                message: "The name can not be more than 100 characters."
                                            }
                                        })}
                                    fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                                    maxW="50vw"
                                    placeholder="The display label for your doctype"
                                />
                                <FormErrorMessage>
                                    {errors?.name?.message}
                                </FormErrorMessage>
                            </Stack>
                        </FormControl>

                        <FormControl
                            isRequired
                            isInvalid={!!errors?.source}>
                            <Stack spacing={2}>
                                <FormLabel>
                                    Fetch from
                                </FormLabel>
                                <Input
                                    {...register("source",
                                        {
                                            required: "The table name should not be blank",
                                            maxLength: {
                                                value: 100,
                                                message: "The table name can not be more than 100 characters."
                                            }
                                        })}
                                    fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                                    maxW="50vw"
                                    placeholder="The table name from where we will fetch your data"
                                />
                                <FormErrorMessage>
                                    {errors?.source?.message}
                                </FormErrorMessage>
                            </Stack>
                        </FormControl>

                    </Stack>
                    <Divider mt={{ base: 4, md: 6, lg: 8 }} />
                </Box>

            </chakra.form>

        </>
    )
}