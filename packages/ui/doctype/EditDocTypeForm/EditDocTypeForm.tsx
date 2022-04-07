import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, ButtonGroup, chakra, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Menu, MenuButton, MenuItem, MenuList, Spinner, Stack, useDisclosure, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CustomError } from 'types'
import { DocType } from 'types/doctypes'
import { AlertBanner, BreadCrumb } from '../../layout'
import { DocFieldForm } from '../common'
import { DeleteDoctype } from '../DeleteDoctype/DeleteDoctype'
import { useRouter } from 'next/router'
interface Props {
    getData: () => Promise<DocType>,
    edit: (doctypeData: DocType) => Promise<any>,
    deleteDoctype: () => Promise<void>,
}

export const EditDocTypeForm = ({ getData, edit, deleteDoctype }: Props) => {

    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState<CustomError | null>(null)
    const [saved, isSaved] = useState(true)
    const [doctypeData, setDoctypeData] = useState<DocType | null>(null)
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<DocType>()
    const toast = useToast()
    const { onOpen, isOpen, onClose } = useDisclosure()
    const router = useRouter()

    useEffect(() => {
        getData()
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
        }).catch((error) => showErrorToast(error))
            .finally(() => setUpdating(false))
    }

    const deleteAction = async () => {
        return deleteDoctype()
            .then(() => {
                //Reroute to list page
                router.push(`/doctypes`)
            })
            .catch((error) => {
                showErrorToast(error)
            })

    }

    const showErrorToast = (error: Error) => {
        console.error("error creating doctype", error)
        toast({
            duration: 1000,
            position: 'bottom',
            variant: 'solid',
            isClosable: true,
            status: 'error',
            description: `There was an error while processing your request. ${error.message}`
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
                        name: doctypeData?.name ?? "Edit Doctype",
                        url: `/doctypes/${doctypeData?.name ?? ""}`,
                        isCurrent: true
                    }]
                } />

            {loading ? <Flex align="center" justify="center" height="50vh" width="full"><Spinner /></Flex> :

                error ? <AlertBanner status="error" heading="There was an error while fetching the request.">{error.message} - {error.code}</AlertBanner> :

                    <chakra.form id="doctypeForm" onSubmit={handleSubmit(editDocType)}>

                        <Flex
                            justifyContent="space-between"
                            align="center">
                            <HStack>
                                <Heading fontSize="3xl">
                                    {doctypeData?.name ?? ""}
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
                            <ButtonGroup size={'md'}>
                                <Menu>
                                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                        Actions
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={onOpen} icon={<DeleteIcon />}>Delete</MenuItem>
                                    </MenuList>
                                </Menu>
                                <Button
                                    colorScheme="blue"
                                    type="submit"
                                    isLoading={updating}
                                    loadingText="Saving..."
                                >
                                    Save
                                </Button>
                            </ButtonGroup>
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
            <DeleteDoctype isOpen={isOpen} onClose={onClose} deleteAction={deleteAction} />
        </>
    )
}