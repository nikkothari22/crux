import { Button, Checkbox, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { ShowFieldTypes } from '../common/ShowFieldTypes/ShowFieldTypes'
// import Image from 'next/image'
// import AddMetadataImage from '../../../assets/images/AddMetadataImage.svg'

interface Props {

}

export const AddMetadata = (props: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dataType, setDataType] = useState("")

    return (
        <>
            <Stack mt={{ base: 4, md: 6, lg: 8 }}>
                <FormLabel>
                    Metadata
                </FormLabel>
                {/* <Image
                    src={AddMetadataImage}
                    alt="add metadata image"
                    width={500}
                    height={500}
                /> */}
                <Button colorScheme="blue" maxW="60" onClick={onOpen}>Add Field</Button>
            </Stack>

            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Field</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Column name" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Selector</FormLabel>
                            <Input placeholder="Variable name for this field in your table" />
                        </FormControl>

                        <FormControl mt={4}>
                            <Stack spacing={2}>
                                <FormLabel>Data Type</FormLabel>
                                <Select
                                    isRequired
                                    placeholder='Select data type'
                                    value={dataType}
                                    onChange={(e) => setDataType(e.target.value)}>
                                    <option value='string'>String</option>
                                    <option value='int'>Int</option>
                                    <option value='float'>Float</option>
                                    <option value='timestamp'>Timestamp</option>
                                    <option value='boolean'>Boolean</option>
                                </Select>
                            </Stack>
                        </FormControl>

                        <ShowFieldTypes dataType={dataType} />

                        <FormControl mt={4}>
                            <Stack spacing={2}>
                                <FormLabel>Default Validations</FormLabel>
                                <Checkbox >isRequired</Checkbox>
                                <Checkbox >readOnly</Checkbox>
                            </Stack>
                        </FormControl>

                        <FormControl mt={4}>
                            <HStack>
                                <FormLabel>Default Value</FormLabel>
                                <Input maxW="80%" />
                            </HStack>
                        </FormControl>

                        <FormControl mt={4}>
                            <HStack spacing={6}>
                                <FormLabel>Discription</FormLabel>
                                <Input maxW="80%" />
                            </HStack>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}