import { Button, chakra, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, SimpleGrid, StackDivider, Heading, Checkbox, Box, ButtonGroup, FormErrorMessage } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { BooleanOrCondition, Docfield } from 'types/doctypes'
import { getFieldTypes } from '../getFieldTypes'
import { DataTypeValidationFields } from '../DataTypeFormFields/DataTypeValidationFields'
import { FieldTypeMetadataFields } from '../FieldTypeFormFields/FieldTypeMetadataFields'
interface Props {
    isOpen: boolean,
    onClose: VoidFunction,
    initFieldData?: Docfield,
    onSubmit: (field: Partial<Docfield>) => void
}

export const DocfieldForm = ({ isOpen, onClose, initFieldData, onSubmit }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{initFieldData ? "Edit Field" : "Add Field"}</ModalHeader>
                <ModalCloseButton />
                <DocfieldFormContent onClose={onClose} initFieldData={initFieldData} onSubmit={onSubmit} />
            </ModalContent>
        </Modal>
    )
}

interface FormContentProps {
    onClose: VoidFunction,
    initFieldData?: Partial<Docfield>,
    onSubmit: (field: Partial<Docfield>) => void
}

interface DocfieldFormFields {
    label: string,
    name: string,
    defaultValue: string,
    description: string,
    dataType: string,
    fieldType: string,
    metadata: any
}

const DocfieldFormContent = ({ initFieldData, onClose, onSubmit }: FormContentProps) => {

    const methods = useForm<DocfieldFormFields>({ defaultValues: initFieldData })
    const { register, handleSubmit, formState: { errors }, watch, setValue } = methods

    const dataType = watch("dataType")
    const fieldType = watch("fieldType")
    const fieldTypes = useMemo(() => getFieldTypes(dataType), [dataType])

    const [isRequired, setIsRequired] = useState<BooleanOrCondition>(initFieldData?.isRequired ?? "NO")
    const [isReadOnly, setIsReadOnly] = useState<BooleanOrCondition>(initFieldData?.isReadOnly ?? "NO")

    /** Reset fieldType and metadata if dataType is changed. */
    useEffect(() => {
        setValue('fieldType', getFieldTypes(dataType)[0])

        //Get default metadata for the new dataType
        const getDefaultMetadataForDatatype = (d: string) => {
            switch (d) {
                case "string":
                    setValue('metadata.length_validation_type', 'minMax')
                    break;
                case "int":
                    setValue('metadata.limit_validation_type', 'minMax')
                    break;
                case "float":
                    setValue('metadata.limit_validation_type', 'minMax')
                    setValue('metadata.precision', '2')
                    break;
            }
        }
        getDefaultMetadataForDatatype(dataType)
    }, [dataType])

    const formSubmitted = (data: DocfieldFormFields) => {
        console.log(data)
        console.log(errors)
        onSubmit({
            ...data,
            isReadOnly,
            isRequired
        } as Partial<Docfield>)
    }

    return <FormProvider {...methods}>

        <chakra.form id="docfieldForm" onSubmit={handleSubmit(formSubmitted)}>

            <ModalBody pb={6}>
                <Stack divider={<StackDivider />} spacing="6">

                    <SimpleGrid columns={2} spacingX={6} spacingY={4}>

                        <FormControl isRequired isInvalid={!!errors?.label}>
                            <FormLabel>Label</FormLabel>
                            <Input
                                {...register("label", {
                                    required: "Label is required"
                                })}
                                placeholder="e.g. Employee Name" />
                            {errors?.label && <FormErrorMessage>{errors.label?.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors?.name}>
                            <FormLabel>Variable Name</FormLabel>
                            <Input
                                {...register("name", {
                                    validate: (name) => {
                                        return !name.includes(" ") || "Variable name cannot contain spaces"
                                    },
                                    required: "Variable name is required"
                                })}
                                placeholder="e.g. employee_name" />
                            {errors?.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isRequired>
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
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Field Type</FormLabel>
                            <Select
                                {...register("fieldType")}
                                placeholder='Select field type'
                            >
                                {fieldTypes.map((fieldTypes, index) =>
                                    <option key={index}>{fieldTypes}</option>)}
                            </Select>
                        </FormControl>

                    </SimpleGrid>

                    <Stack>
                        <FormSectionHeading>Validations</FormSectionHeading>
                        <Stack spacing="4">
                            <HStack spacing="8">
                                <Box>
                                    <Checkbox
                                        isChecked={isRequired === "YES"}
                                        onChange={(e) => setIsRequired(e.target.checked ? "YES" : "NO")}>
                                        Required
                                    </Checkbox>
                                </Box>
                                <Box>
                                    <Checkbox
                                        isChecked={isReadOnly === "YES"}
                                        onChange={(e) => setIsReadOnly(e.target.checked ? "YES" : "NO")}>
                                        Read only
                                    </Checkbox>
                                </Box>
                            </HStack>
                            {dataType &&
                                <DataTypeValidationFields dataType={dataType} />
                            }
                        </Stack>
                    </Stack>

                    {fieldType &&
                        <Stack>
                            <FormSectionHeading>Field details</FormSectionHeading>
                            <FieldTypeMetadataFields fieldType={fieldType} />
                        </Stack>
                    }

                    <Stack>
                        <FormSectionHeading>Other Details</FormSectionHeading>
                        <SimpleGrid columns={2} spacingX={6} spacingY={4}>

                            <FormControl>
                                <FormLabel>Default Value</FormLabel>
                                <Input {...register("defaultValue")}
                                    placeholder="e.g. John Smith" />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input  {...register("description")}
                                    placeholder="e.g. Full name of employee" />
                            </FormControl>
                        </SimpleGrid>
                    </Stack>

                </Stack>

            </ModalBody>

            <ModalFooter>
                <ButtonGroup spacing={4}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button colorScheme='blue'
                        type="submit">
                        Save
                    </Button>
                </ButtonGroup>
            </ModalFooter>

        </chakra.form>
    </FormProvider>
}


const FormSectionHeading = ({ children }: { children: string }) => <Heading mb="1" size="xs" color="gray.500" textTransform='uppercase' fontWeight="medium">{children}</Heading>