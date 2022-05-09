import { Text, Button, chakra, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Flex } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Docfield } from 'types/doctypes'
import { getFieldTypes } from '../getFieldTypes'

interface Props {
    isOpen: boolean,
    onClose: VoidFunction,
    initFieldData?: Docfield,
    onSubmit: (field: Docfield) => void
}

export const DocfieldForm = ({ isOpen, onClose, initFieldData, onSubmit }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
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
}

const DocFieldFormContent = ({ initFieldData, onClose, onSubmit }: FormContentProps) => {

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<DocfieldFormProps>({
        defaultValues: initFieldData
    })
    const dataType = watch("dataType")
    const fieldTypes = useMemo(() => getFieldTypes(dataType), [dataType])
    const [isRequired, setIsRequired] = useState<string>(initFieldData?.isRequired ?? "NO")
    const [isReadOnly, setIsReadOnly] = useState<string>(initFieldData?.isReadOnly ?? "NO")

    useEffect(() => {
        setValue('fieldType', getFieldTypes(dataType)[0])
    }, [dataType])
    const formSubmitted = (data: DocfieldFormProps) => {
        onSubmit({
            ...data,
            isReadOnly,
            isRequired
        } as Docfield)
    }

    return <chakra.form id="docfieldForm" onSubmit={handleSubmit(formSubmitted)}>

        <ModalBody pb={6}>

            <FormControl isRequired>
                <FormLabel>Label</FormLabel>
                <Input
                    {...register("label")}
                    placeholder="Column name" />
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    {...register("name")}
                    placeholder="Variable name for this field in your table" />
            </FormControl>

            <FormControl mt={4} isRequired>
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

            <FormControl mt={4} isRequired>
                <Stack spacing={2}>
                    <FormLabel>Field Type</FormLabel>
                    <Select
                        placeholder='Select field type'
                        {...register("fieldType")}
                    >
                        {fieldTypes.map((fieldTypes, index) =>
                            <option key={index}>{fieldTypes}</option>)}
                    </Select>
                </Stack>
            </FormControl>

            <FormLabel mt={4}>Default Validations</FormLabel>

            <FormControl mt={4}>
                <RadioGroup
                    onChange={setIsRequired}
                    value={isRequired}
                >
                    <Flex justifyContent="space-between">
                        <Text>isRequired</Text>
                        <Stack direction='row' pr={240}>
                            <Radio value='YES'>Yes</Radio>
                            <Radio value='NO'>No</Radio>
                            <Radio value='CONDITION'>Add condition</Radio>
                        </Stack>
                    </Flex>
                    {/* if value is set to condition show input box to enter condition */}
                </RadioGroup>
            </FormControl>

            <FormControl mt={4}>
                <RadioGroup
                    onChange={setIsReadOnly}
                    value={isReadOnly}>
                    <Flex justifyContent="space-between">
                        <Text>readOnly</Text>
                        <Stack direction='row' pr={240}>
                            <Radio value='YES'>Yes</Radio>
                            <Radio value='NO'>No</Radio>
                            <Radio value='CONDITION'>Add condition</Radio>
                        </Stack>
                    </Flex>
                    {/* if value is set to condition show input box to enter condition */}
                </RadioGroup>
            </FormControl>

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
                type="submit"
            >
                Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>

    </chakra.form>
}