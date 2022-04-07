import { Badge, Box, Button, chakra, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Spinner, Stack, useDisclosure, useToast } from '@chakra-ui/react'
import { BreadCrumb } from '../../layout'
import { DocType } from 'types/doctypes'
import { DocFieldForm } from '../common/DocFieldForm/DocFieldForm'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

interface props {
    create: (doctypeData: DocType) => Promise<any>
}

export const CreateDocTypeForm = ({ create }: props) => {

    const [updating, setUpdating] = useState(false)
    const [saved, isSaved] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<DocType>()
    const [docTypeName, setDocTypeName] = useState("Untitled Doctype1")
    const toast = useToast()
    const router = useRouter()

    const createDocType = (doctypeData: DocType) => {
        setUpdating(true)
        create(doctypeData).then((x) => {
            console.log("created doctype:", x)
            toast({
                title: 'DocType created',
                status: 'success',
                duration: 1000,
                position: 'bottom',
                variant: 'solid',
                isClosable: true,
            })
            isSaved(true)
            setDocTypeName(doctypeData.name)
            router.push(`/doctypes/${doctypeData.name}`)
        }).catch((error) => {
            console.error("error creating doctype", error)
            toast({
                duration: 1000,
                position: 'bottom',
                variant: 'solid',
                isClosable: true,
                status: 'error',
                description: `There was an error while processing your request. ${error.message}`
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

            <chakra.form id="doctypeForm" onSubmit={handleSubmit(createDocType)}>

                <Flex
                    justifyContent="space-between"
                    align="center">
                    <HStack>
                        <Heading fontSize={{ base: '20px', md: '30px', lg: '40px' }}>
                            {docTypeName}
                        </Heading>
                        {saved ?
                            <Badge ml="1"
                                colorScheme="green">
                                saved
                            </Badge>
                            :
                            <Badge ml="1"
                                colorScheme="orange">
                                not saved
                            </Badge>
                        }
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
                <Divider mt={{ base: 4, md: 4, lg: 6 }} maxW="90vw" />

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
                    <Divider mt={{ base: 4, md: 6, lg: 8 }} maxW="90vw" />
                    <DocFieldForm />
                </Box>

            </chakra.form>
        </>
    )
}