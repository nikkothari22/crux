import { Button, Divider, Flex, FormControl, FormLabel, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spinner, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Docfield, Doctype } from 'types/doctypes'
import { CustomError } from 'types/error';
import { AlertBanner, BreadCrumb } from '../../layout';
import { DummyDataTable } from './DummyDataTable';
import { getDummyDataObjectFromDocfields } from 'dummy_data_generation'
interface Props {
    getDoctypeData: () => Promise<Doctype>,
    getDocfields: () => Promise<Docfield[]>,
    uploadData: (data: any[], doctype: Doctype) => Promise<void>,
}

export const GenerateDummyDataForm = ({ getDoctypeData, getDocfields, uploadData }: Props) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<CustomError | null>(null)
    const [doctypeData, setDoctypeData] = useState<Doctype | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dummyData, setDummyData] = useState<any[]>([])
    const [docfields, setDocfields] = useState<Docfield[] | null>([])
    const subTextColor = useColorModeValue('gray.500', 'gray.400')

    //Fetch Doctype and it's fields when the component mounts
    useEffect(() => {
        getDoctypeData()
            .then((doctypeData) => {
                // console.log(doctypeData)
                setDoctypeData(doctypeData)
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

    const uploadDummyDataToDatabase = () => {
        if (doctypeData) {
            // console.log(dummyData)
            return uploadData(dummyData, doctypeData)
        } else {
            return Promise.resolve()
        }

    }

    const generateDummyData = (numberOfRows: number) => {
        // console.log("form submitted", numberOfRows)

        //1. Create dummy data - need number of rows, docfields
        //2. Show dummy data

        if (docfields) {
            let fakeData = []
            for (let i = 0; i < numberOfRows; i++) {
                let data = getDummyDataObjectFromDocfields(docfields)
                fakeData.push({ ...data })
            }
            // console.log(fakeData)
            setDummyData(fakeData)
        }
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
                        name: doctypeData?.name ?? "",
                        url: `/doctypes/generate-fake-data/${doctypeData?.id ?? ""}`,
                        isCurrent: true
                    }]
                } />

            {loading ? <Flex align="center" justify="center" height="50vh" width="full"><Spinner /></Flex> :

                error ? <AlertBanner status="error" heading="There was an error while fetching the request.">{error.message} - {error.code}</AlertBanner> :

                    <>

                        <Flex
                            justifyContent="space-between"
                            align="center">
                            <Stack>
                                <Heading fontSize="3xl" mt={4}>
                                    Generate Fake Data
                                </Heading>
                                {doctypeData?.name && <Text
                                    fontSize='lg'
                                    fontWeight={'500'}
                                    color={subTextColor}>{doctypeData?.name} ({doctypeData?.source})</Text>}
                            </Stack>
                            {docfields !== null && docfields.length > 0 &&
                                <Button
                                    onClick={onOpen}
                                    colorScheme="blue">
                                    Generate Data
                                </Button>
                            }

                        </Flex>

                        <Divider mt={{ base: 4, md: 4, lg: 6 }} />

                        <GenerateDummyDataModal isOpen={isOpen} onClose={onClose} onSubmit={generateDummyData} />
                        {docfields && doctypeData && <DummyDataTable docfields={docfields} data={dummyData} doctype={doctypeData?.id} uploadData={uploadDummyDataToDatabase} tableName={doctypeData.source} />}
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
        onClose()
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
                        <NumberInput onChange={(s, n) => setNumberOfRows(n)} value={numberOfRows} isRequired step={5} defaultValue={10} min={5} max={100}>
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
                <Button variant="outline" mr={3} onClick={onClose}>Close</Button>
                <Button
                    onClick={onButtonClicked}
                    colorScheme="blue">
                    Generate data
                </Button>
            </ModalFooter>

        </ModalContent>
    </Modal>
}