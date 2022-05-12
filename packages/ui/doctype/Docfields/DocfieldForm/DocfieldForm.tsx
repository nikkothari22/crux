import { Text, Button, chakra, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Flex, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Docfield } from 'types/doctypes'
import { getFieldTypes } from '../getFieldTypes'
import { FormFieldsForMetadataBasedOnDataType } from '../FormFieldsForMetadataBasedOnDataType/FormFieldsForMetadataBasedOnDataType'

interface Props {
    isOpen: boolean,
    onClose: VoidFunction,
    initFieldData?: Docfield,
    onSubmit: (field: Docfield) => void
}

export const DocfieldForm = ({ isOpen, onClose, initFieldData, onSubmit }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Field</ModalHeader>
                <ModalCloseButton />
                <DocFieldFormContent onClose={onClose} initFieldData={initFieldData} onSubmit={onSubmit} />
            </ModalContent>
        </Modal>
    )
}

interface FormContentProps {
    onClose: VoidFunction,
    initFieldData?: Docfield,
    onSubmit: (field: Docfield) => void
}

interface DocfieldFormProps {
    label: string,
    name: string,
    dataType: string,
    fieldType: string,
    metadata: any
}

const DocFieldFormContent = ({ initFieldData, onClose, onSubmit }: FormContentProps) => {

    const methods = useForm<DocfieldFormProps>({
        defaultValues: initFieldData
    })

    const { register, handleSubmit, formState: { errors }, watch, setValue } = methods
    const dataType = watch("dataType")
    const fieldTypes = useMemo(() => getFieldTypes(dataType), [dataType])
    const [isRequired, setIsRequired] = useState<string>(initFieldData?.isRequired ?? "NO")
    const [isReadOnly, setIsReadOnly] = useState<string>(initFieldData?.isReadOnly ?? "NO")

    useEffect(() => {
        setValue('fieldType', getFieldTypes(dataType)[0])
    }, [dataType])
    const formSubmitted = (data: DocfieldFormProps) => {
        console.log(data)
        // onSubmit({
        //     ...data,
        //     isReadOnly,
        //     isRequired
        // } as Docfield)
    }

    return <FormProvider {...methods}>

        <chakra.form id="docfieldForm" onSubmit={handleSubmit(formSubmitted)}>

            <ModalBody pb={6}>

                <SimpleGrid columns={2} spacingX={6} spacingY={4}>

                    <FormControl isRequired>
                        <FormLabel>Label</FormLabel>
                        <Input
                            {...register("label")}
                            placeholder="Column name" />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            {...register("name")}
                            placeholder="Variable name for this field in your table" />
                    </FormControl>

                    <FormControl isRequired>
                        <Stack spacing={2}>
                            <FormLabel>Data Type</FormLabel>
                            <Select
                                {...register("dataType")}
                                placeholder='Select data type'
                            >
                                <option value='string'>String</option>
                                <option value='int'>Int</option>
                                <option value='float'>Float</option>
                                <option value='timestamp'>Timestamp</option>
                                <option value='boolean'>Boolean</option>
                            </Select>
                        </Stack>
                    </FormControl>

                    <FormControl isRequired>
                        <Stack spacing={2}>
                            <FormLabel>Field Type</FormLabel>
                            <Select
                                {...register("fieldType")}
                                placeholder='Select field type'
                            >
                                {fieldTypes.map((fieldTypes, index) =>
                                    <option key={index}>{fieldTypes}</option>)}
                            </Select>
                        </Stack>
                    </FormControl>

                </SimpleGrid>

                <FormFieldsForMetadataBasedOnDataType dataType={dataType} />

                {/* <ValidationMetadataForFieldType fieldType={fieldType} /> */}

                <HStack spacing={10} mt={4}>

                    <FormLabel mt={2}>Validations</FormLabel>

                    <SimpleGrid columns={2} spacingX={6}>
                        <FormControl>
                            <RadioGroup
                                onChange={setIsRequired}
                                value={isRequired}
                            >
                                <HStack>
                                    <Text fontWeight="medium">isRequired</Text>
                                    <Stack direction='row'>
                                        <Radio value='YES'>Yes</Radio>
                                        <Radio value='NO'>No</Radio>
                                        <Radio value='CONDITION'>Add condition</Radio>
                                    </Stack>
                                </HStack>
                                {/* if value is set to condition show input box to enter condition */}
                            </RadioGroup>
                        </FormControl>

                        <FormControl>
                            <RadioGroup
                                onChange={setIsReadOnly}
                                value={isReadOnly}>
                                <HStack>
                                    <Text fontWeight="medium">readOnly</Text>
                                    <Stack direction='row'>
                                        <Radio value='YES'>Yes</Radio>
                                        <Radio value='NO'>No</Radio>
                                        <Radio value='CONDITION'>Add condition</Radio>
                                    </Stack>
                                </HStack>
                                {/* if value is set to condition show input box to enter condition */}
                            </RadioGroup>
                        </FormControl>
                    </SimpleGrid>
                </HStack>

                <FormControl mt={4}>
                    <HStack>
                        <FormLabel>Default Value</FormLabel>
                        <Input maxW="80%" />
                    </HStack>
                </FormControl>

                <FormControl mt={4}>
                    <HStack spacing={6}>
                        <FormLabel>Description</FormLabel>
                        <Input maxW="80%" />
                    </HStack>
                </FormControl>

            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3}
                    type="submit">
                    Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>

        </chakra.form>
    </FormProvider>
}