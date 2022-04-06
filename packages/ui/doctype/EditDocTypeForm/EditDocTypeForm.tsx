import { Badge, Box, Button, chakra, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Spinner, Stack, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DocType } from 'types/doctypes'
import { BreadCrumb } from '../../layout'
import { DocFieldForm } from '../common'

interface Props {
    getData: (doctype: string) => Promise<any>,
    edit: (doctypeData: DocType) => Promise<any>
    doctype: string
}

export const EditDocTypeForm = ({ getData, edit, doctype }: Props) => {

    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState(null)
    const [saved, isSaved] = useState(true)
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<DocType>()
    const [docTypeName, setDocTypeName] = useState(doctype)
    const toast = useToast()

    useEffect(() => {
        getData(doctype).then((data) => {
            console.log(data)
            setValue('name', data.name)
            setValue('source', data.source)
            setError(null)
            setLoading(false)
        });
    }, []);

    const editDocType = (doctypeData: DocType) => {
        setUpdating(true)
        edit(doctypeData).then((x) => {
            console.log("edited doctype:", x)
            toast({
                title: 'DocType saved',
                status: 'success',
                duration: 1000,
                position: 'bottom',
                variant: 'solid',
                isClosable: true,
            })
            isSaved(true)
            setDocTypeName(doctypeData.name)
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
                currentPage={doctype}
                previousPage="Doctypes"
                previousPageLink="/doctypes" />

            {loading ? <Flex align="center" justify="center" height="50vh" width="full"><Spinner /></Flex> :

                <chakra.form id="doctypeForm" onSubmit={handleSubmit(editDocType)}>

                    <Flex
                        mr="16"
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
                                isRequired>
                                <Stack spacing={2}>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <Input
                                        isDisabled
                                        {...register("name")}
                                        fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                                        maxW="50vw"
                                    />
                                </Stack>
                            </FormControl>

                            <FormControl
                                isRequired>
                                <Stack spacing={2}>
                                    <FormLabel>
                                        Fetch from
                                    </FormLabel>
                                    <Input
                                        isDisabled
                                        {...register("source")}
                                        fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                                        maxW="50vw"
                                    />
                                </Stack>
                            </FormControl>

                        </Stack>
                        <Divider mt={{ base: 4, md: 6, lg: 8 }} maxW="90vw" />
                        <DocFieldForm />
                    </Box>

                </chakra.form>
            }
        </>
    )
}