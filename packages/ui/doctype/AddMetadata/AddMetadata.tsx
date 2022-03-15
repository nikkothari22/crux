import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { ShowMoreOptions } from '../common/ShowMoreOptions/ShowMoreOptions'
// import Image from 'next/image'
// import AddMetadataImage from '../../../assets/images/AddMetadataImage.svg'

interface Props {

}

export const AddMetadata = (props: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [fieldType, setFieldType] = useState("")

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

            <Modal isOpen={isOpen} onClose={onClose}>
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
                                <FormLabel>Field Type</FormLabel>
                                <Select
                                    isRequired
                                    // placeholder='Select field type'
                                    value={fieldType}
                                    onChange={(e) => setFieldType(e.target.value)}
                                >
                                    <option value='text'>Text</option>
                                    <option value='number'>Number</option>
                                    <option value='date'>Date</option>
                                    <option value='boolean'>Boolean</option>
                                    <option value='link'>Link</option>
                                    <option value='options'>Options</option>
                                    <option value='image'>Image</option>
                                </Select>
                            </Stack>
                        </FormControl>

                        <ShowMoreOptions fieldType={fieldType} />

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