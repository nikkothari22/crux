import { Box, Button, chakra, Checkbox, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DocField } from 'types/doctypes'
import { DocFieldTable } from '../DocFieldTable/DocFieldTable'
import { ShowFieldTypes } from '../ShowFieldTypes/ShowFieldTypes'
// import Image from 'next/image'
// import AddMetadataImage from '../../../assets/images/AddMetadataImage.svg'

interface Props {

}

export const DocFieldForm = (props: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dataType, setDataType] = useState("")
    const [updating, setUpdating] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<DocField>()
    const toast = useToast()

    const createDocField = (data: DocField) => {
        console.log(data)
        // setUpdating(true)

    }
    // console.log(errors)

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
                <Box mt={10} pb={8} pr={16}>
                    <DocFieldTable />
                </Box>
                <Button colorScheme="blue" maxW="60" onClick={onOpen}>Add Field</Button>
            </Stack>

            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Field</ModalHeader>
                    <ModalCloseButton />

                    <chakra.form id="docfieldForm" onSubmit={handleSubmit(createDocField)}>

                        <ModalBody pb={6}>

                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    {...register("name")}
                                    placeholder="Column name" />
                            </FormControl>

                            <FormControl mt={4} isRequired>
                                <FormLabel>Selector</FormLabel>
                                <Input
                                    {...register("label")}
                                    placeholder="Variable name for this field in your table" />
                            </FormControl>

                            <FormControl mt={4}>
                                <Stack spacing={2}>
                                    <FormLabel>Data Type</FormLabel>
                                    <Select
                                        isRequired
                                        {...register("dataType")}
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
                                    <Checkbox {...register("metadata.isRequired")}>isRequired</Checkbox>
                                    <Checkbox {...register("metadata.isReadOnly")}>readOnly</Checkbox>
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
                            <Button colorScheme='blue' mr={3}
                                type="submit"
                            // isLoading={updating}
                            // loadingText="Saving..."
                            >
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>

                    </chakra.form>

                </ModalContent>
            </Modal>
        </>
    )
}