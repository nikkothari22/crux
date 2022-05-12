import { FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid, Stack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface Props {
    dataType: string
}

export const FormFieldsForMetadataBasedOnDataType = ({ dataType }: Props) => {

    switch (dataType) {
        case 'string':
            return <StringMetadataFormFields />
        case 'int':
            return <IntMetadataFormFields />
        case 'float':
            return <FloatMetadataFormFields />
        case 'timestamp':
            return (
                <>
                </>
            )
        case 'boolean':
            return <></>
        default: return null
    }
}

const StringMetadataFormFields = () => {

    const { register, watch } = useFormContext();
    const typeOfValidation = watch("metadata.length_validation_type")

    return (
        <>
            <FormControl mt={4} isRequired>
                <Stack spacing={2}>
                    <FormLabel>String field metadata for validation</FormLabel>
                    <Select defaultValue='minMax'
                        {...register("metadata.length_validation_type")}>
                        <option value='minMax'>Set minimum and maximum character limit</option>
                        <option value='min'>Set only minimum character limit</option>
                        <option value='max'>Set only maximum character limit</option>
                        <option value='none'>None</option>
                    </Select>
                </Stack>
            </FormControl>
            <SimpleGrid columns={2} spacingX={6} spacingY={4} mt={4}>
                <FormControl isDisabled={typeOfValidation === "none" || typeOfValidation === "max"}>
                    <FormLabel>Set minimum character limit</FormLabel>
                    <NumberInput>
                        <NumberInputField {...register("min")} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isDisabled={["none", "min"].includes(typeOfValidation)}>
                    <FormLabel>Set maximum character limit</FormLabel>
                    <NumberInput>
                        <NumberInputField {...register("max")} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
            </SimpleGrid>
        </>
    )
}

const IntMetadataFormFields = () => {

    const { register, watch } = useFormContext();
    const typeOfValidation = watch("metadata.length_validation_type")

    return (
        <>
            <FormControl mt={4} isRequired>
                <Stack spacing={2}>
                    <FormLabel>String field metadata for validation</FormLabel>
                    <Select defaultValue='minMax'
                        {...register("metadata.length_validation_type")}>
                        <option value='minMax'>Set minimum and maximum limit</option>
                        <option value='min'>Set only minimum limit</option>
                        <option value='max'>Set only maximum limit</option>
                        <option value='none'>None</option>
                    </Select>
                </Stack>
            </FormControl>
            <SimpleGrid columns={2} spacingX={6} spacingY={4} mt={4}>
                <FormControl isDisabled={typeOfValidation === "none" || typeOfValidation === "max"}>
                    <FormLabel>Set minimum limit</FormLabel>
                    <NumberInput>
                        <NumberInputField {...register("min")} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isDisabled={["none", "min"].includes(typeOfValidation)}>
                    <FormLabel>Set maximum limit</FormLabel>
                    <NumberInput>
                        <NumberInputField {...register("max")} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
            </SimpleGrid>
        </>
    )
}

const FloatMetadataFormFields = () => {

    const { register, watch } = useFormContext();
    const typeOfValidation = watch("metadata.length_validation_type")

    return (
        <>
            <FormControl mt={4} isRequired>
                <Stack spacing={2}>
                    <FormLabel>Float field metadata for validation</FormLabel>
                    <Select defaultValue='minMax'
                        {...register("metadata.length_validation_type")}>
                        <option value='minMax'>Set minimum and maximum limit</option>
                        <option value='min'>Set only minimum limit</option>
                        <option value='max'>Set only maximum limit</option>
                        <option value='none'>None</option>
                    </Select>
                </Stack>
            </FormControl>
            <SimpleGrid columns={3} spacingX={4} spacingY={4} mt={4}>
                <FormControl isDisabled={typeOfValidation === "none" || typeOfValidation === "max"}>
                    <FormLabel>Set minimum limit</FormLabel>
                    <NumberInput>
                        <NumberInputField {...register("min")} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isDisabled={["none", "min"].includes(typeOfValidation)}>
                    <FormLabel>Set maximum limit</FormLabel>
                    <NumberInput>
                        <NumberInputField {...register("max")} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl>
                    <FormLabel>Precision</FormLabel>
                    <NumberInput>
                        <NumberInputField {...register("precision")} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
            </SimpleGrid>
        </>
    )
}