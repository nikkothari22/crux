import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spinner, Stack, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Docfield, Doctype } from 'types/doctypes'
import { CustomError } from 'types/error';
import { AlertBanner, BreadCrumb } from '../../layout';
import { DummyDataTable } from './DummyDataTable';
import { randomBoolean, randomString } from 'dummy_data_generation'
interface Props {
    getDoctypeData: () => Promise<Doctype>,
    getDocfields: () => Promise<Docfield[]>,
}

export const GenerateDummyDataForm = ({ getDoctypeData, getDocfields }: Props) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<CustomError | null>(null)
    const [doctypeData, setDoctypeData] = useState<Doctype | null>(null)
    const { register, setValue } = useForm<Doctype>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dummyData, setDummyData] = useState<any[]>([])
    const [docfields, setDocfields] = useState<Docfield[] | null>([])

    //Fetch Doctype and it's fields when the component mounts
    useEffect(() => {
        getDoctypeData()
            .then((doctypeData) => {
                console.log(doctypeData)
                setDoctypeData(doctypeData)
                setValue('name', doctypeData.name)
                setValue('source', doctypeData.source)
                setError(null)
            })
            .then(() => getDocfields())
            .then((docfieldData) => {
                setDocfields(docfieldData)
            })
            .catch((e) => setError(e))
            .finally(() => {
                setLoading(false)
            })
    }, []);

    const generateDummyData = (numberOfRows: number) => {
        console.log("form submitted", numberOfRows)
        //1. Create dummy data - need number of rows, docfields
        //2. Show dummy data
        let dummyBooleanData = []
        for (let i = 0; i < numberOfRows; i++) {
            let data: any = {
                id: i
            }

            docfields?.forEach(df => {
                if (df.dataType === "string") {
                    data[df.label] = randomString("name", "firstName")
                } else if (df.dataType === "boolean") {
                    data[df.label] = randomBoolean()
                }
            })
            console.log(data)
            dummyBooleanData.push(data)
        }
        setDummyData(dummyBooleanData)
    }

    return (
        <>
            <BreadCrumb
                pages={
                    [{
                        name: "Doctypes",
                        url: '/doctypes/',
                    },
                    {
                        name: doctypeData?.name ?? " ",
                        url: `/doctypes/generate-dummy-data/${doctypeData?.id ?? ""}`,
                        isCurrent: true
                    }]
                } />

            {loading ? <Flex align="center" justify="center" height="50vh" width="full"><Spinner /></Flex> :

                error ? <AlertBanner status="error" heading="There was an error while fetching the request.">{error.message} - {error.code}</AlertBanner> :
                    <>

                        <Flex
                            justifyContent="space-between"
                            align="center">

                            <Heading fontSize="3xl" mt={4}>
                                {doctypeData?.name ?? ""}
                            </Heading>

                            <Button
                                mr={10}
                                onClick={onOpen}
                                colorScheme="blue">
                                Generate data
                            </Button>

                        </Flex>

                        <Divider mt={{ base: 4, md: 4, lg: 6 }} maxW="90vw" />

                        <Box>
                            <HStack spacing={10} mt={{ base: 4, md: 4, lg: 6 }}>

                                <FormControl
                                    isDisabled
                                    isRequired>
                                    <Stack spacing={2}>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <Input
                                            {...register("name")}
                                            fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                                            maxW="40vw"
                                        />
                                    </Stack>
                                </FormControl>

                                <FormControl
                                    isDisabled
                                    isRequired>
                                    <Stack spacing={2}>
                                        <FormLabel>
                                            Fetch from
                                        </FormLabel>
                                        <Input
                                            {...register("source")}
                                            fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                                            maxW="40vw"
                                        />
                                    </Stack>
                                </FormControl>

                            </HStack>
                            <Divider mt={{ base: 4, md: 6, lg: 8 }} maxW="90vw" />
                        </Box>

                        <GenerateDummyDataModal isOpen={isOpen} onClose={onClose} onSubmit={generateDummyData} />
                        {docfields && <DummyDataTable docfields={docfields} data={dummyData} />}
                    </>
            }
        </>
    )
}


interface DummyDataModalProps {
    isOpen: boolean,
    onClose: VoidFunction,
    onSubmit: (n: number) => void
}
const GenerateDummyDataModal = ({ isOpen, onClose, onSubmit }: DummyDataModalProps) => {

    const [numberOfRows, setNumberOfRows] = useState(10)

    const onButtonClicked = () => {
        onSubmit(numberOfRows)
    }

    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Number of rows to be generated?</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <FormControl
                    isRequired>
                    <Stack spacing={2}>
                        <FormLabel>Rows: </FormLabel>
                        <NumberInput onChange={(s, n) => setNumberOfRows(n)} value={numberOfRows} isRequired step={5} defaultValue={10} min={5} max={50}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Stack>
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button variant="outline" mr={3} onClick={onClose}>Cancel</Button>
                <Button
                    onClick={onButtonClicked}
                    colorScheme="blue">
                    Generate data
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}