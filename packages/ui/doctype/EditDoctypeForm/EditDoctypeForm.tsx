import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, ButtonGroup, chakra, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Spinner, Stack, useDisclosure, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CustomError } from 'types'
import { Doctype } from 'types/doctypes'
import { AlertBanner, BreadCrumb } from '../../layout'
import { DeleteDoctype } from '../DeleteDoctype/DeleteDoctype'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { FaClipboardList } from 'react-icons/fa'
import { RiFileList3Line } from 'react-icons/ri'

interface Props {
    getDoctypeData: () => Promise<Doctype>,
    editDoctype: (id: string, doctypeData: Doctype) => Promise<Doctype>,
    deleteDoctype: (id: string) => Promise<void>,
}

export const EditDoctypeForm = ({ getDoctypeData, editDoctype, deleteDoctype }: Props) => {

    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState<CustomError | null>(null)
    const [saved, isSaved] = useState(true)
    const [doctypeData, setDoctypeData] = useState<Doctype | null>(null)
    const { register, setValue, handleSubmit, formState: { errors, isDirty }, reset } = useForm<Doctype>()
    const toast = useToast()
    const { onOpen, isOpen, onClose } = useDisclosure()
    const router = useRouter()

    useEffect(() => {
        getDoctypeData()
            .then((data) => {
                console.log(data)
                setDoctypeData(data)
                setValue('name', data.name)
                setValue('source', data.source)
                setError(null)
            })
            .catch((e) => setError(e))
            .finally(() => {
                setLoading(false)
            })
    }, []);

    const updateDoctype = (submittedData: Doctype) => {
        if (doctypeData) {
            console.log('Edit doctype called - form submission', submittedData)
            setUpdating(true)
            editDoctype(doctypeData?.id, submittedData).then((x) => {
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
                reset({
                    name: x.name,
                    source: x.source
                })
                setDoctypeData(x)
            })
                .catch((error) => showErrorToast(error))
                .finally(() => setUpdating(false))
        }

    }

    const deleteAction = async () => {
        if (doctypeData) {
            return deleteDoctype(doctypeData.id)
                .then(() => {
                    //Reroute to list page
                    router.push(`/doctypes`)
                })
                .catch((error) => {
                    showErrorToast(error)
                })
        }
    }

    const showErrorToast = (error: Error) => {
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
                        name: doctypeData?.name ?? " ",
                        url: `/doctypes/${doctypeData?.id ?? ""}`,
                        isCurrent: true
                    }]
                } />

            {loading ? <Flex align="center" justify="center" height="50vh" width="full"><Spinner /></Flex> :

                error ? <AlertBanner status="error" heading="There was an error while fetching the request.">{error.message} - {error.code}</AlertBanner> :

                    <chakra.form id="doctypeForm" onSubmit={handleSubmit(updateDoctype)}>

                        <Flex
                            justifyContent="space-between"
                            align="center">
                            <HStack>
                                <Heading fontSize="3xl">
                                    {doctypeData?.name ?? ""}
                                </Heading>
                                {!isDirty ?
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
                            <ButtonGroup size={'md'}>
                                <Button onClick={onOpen} leftIcon={<DeleteIcon />} colorScheme="red" variant={'ghost'}>Delete</Button>
                                <NextLink href={`/doctypes/generate-dummy-data/${doctypeData?.id}`} passHref>
                                    <Button colorScheme={'gray'} leftIcon={<RiFileList3Line />}>Generate Fake Data</Button>
                                </NextLink>

                                {/* <Menu>
                                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                        Actions
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={onOpen} icon={<DeleteIcon />}>Delete</MenuItem>
                                        <NextLink href={`/doctypes/generate-dummy-data/${doctypeData?.id}`}>
                                            <MenuItem icon={<FaClipboardList />}>
                                                Generate dummy data
                                            </MenuItem>
                                        </NextLink>
                                    </MenuList>
                                </Menu> */}

                            </ButtonGroup>
                        </Flex>
                        <Divider mt={{ base: 4, md: 4, lg: 6 }} />

                        <Box w="60vw" mt={6}>

                            <HStack spacing={6} align="end">
                                <FormControl
                                    isRequired
                                    isInvalid={!!errors?.name}>
                                    <Stack spacing={2}>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <Input
                                            {...register("name", {
                                                required: "The doctype name should not be blank",
                                                maxLength: {
                                                    value: 100,
                                                    message: "The name can not be more than 100 characters."
                                                }
                                            })}
                                            fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                                            maxW="50vw"
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
                                        />
                                        <FormErrorMessage>
                                            {errors?.source?.message}
                                        </FormErrorMessage>
                                    </Stack>
                                </FormControl>
                                <Box>
                                    <Button
                                        colorScheme="blue"
                                        type="submit"
                                        w="100px"
                                        variant={'outline'}
                                        isLoading={updating}
                                        loadingText="Saving..."
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </HStack>

                        </Box>

                        <Divider mt={{ base: 4, md: 6, lg: 8 }} />

                    </chakra.form>
            }
            <DeleteDoctype isOpen={isOpen} onClose={onClose} deleteAction={deleteAction} />
        </>
    )
}