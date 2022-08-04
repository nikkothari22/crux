import { FormControl, FormErrorMessage, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid, Stack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";


interface Props {
    dataType: string
}

export const DataTypeValidationFields = ({ dataType }: Props) => {

    switch (dataType) {
        case 'string':
            return <StringMetadataFormFields />
        case 'int':
            return <IntMetadataFormFields />
        case 'float':
            return <FloatMetadataFormFields />
        case 'timestamp':
            return <TimestampMetadataFormFields />
        case 'boolean':
            return null
        default: return null
    }
}

const StringMetadataFormFields = () => {

    const { register, resetField, watch, formState: { errors } } = useFormContext();
    const typeOfValidation = watch("metadata.length_validation_type")
    const min = watch("metadata.min")
    const max = watch("metadata.max")

    useEffect(() => {
        switch (typeOfValidation) {
            case 'min': resetField("metadata.max")
                break;
            case 'max': resetField("metadata.min")
                break;
            case 'none': resetField("metadata.min")
                resetField("metadata.max")
                break;
        }
    }, [typeOfValidation])

    const formProps = useMemo(() => {
        return {
            min: {
                isRequired: ["minMax", "min"].includes(typeOfValidation),
                isDisabled: ["none", "max"].includes(typeOfValidation),
                maxValueRequired: typeOfValidation === "minMax"
            },
            max: {
                isRequired: ["minMax", "max"].includes(typeOfValidation),
                isDisabled: ["none", "min"].includes(typeOfValidation),
                minValueRequired: typeOfValidation === "minMax"
            }
        }
    }, [typeOfValidation])

    return (
        <Stack spacing="4">
            <FormControl isRequired>
                <FormLabel>Character Limit</FormLabel>
                <Select defaultValue='minMax'
                    {...register("metadata.length_validation_type")}>
                    <option value='minMax'>Both minimum and maximum</option>
                    <option value='min'>Only minimum</option>
                    <option value='max'>Only maximum</option>
                    <option value='none'>None</option>
                </Select>
            </FormControl>
            <SimpleGrid columns={2} spacingX={6} spacingY={4}>
                <FormControl
                    isDisabled={formProps.min.isDisabled}
                    isRequired={formProps.min.isRequired}
                    isInvalid={!!errors?.metadata?.min}>
                    <FormLabel>Minimum Length</FormLabel>
                    <NumberInput>
                        <NumberInputField {...register("metadata.min", {
                            required: {
                                value: formProps.min.isRequired,
                                message: "Minimum length is required"
                            },
                            max: {
                                message: "Minimum length must be less than the maximum length",
                                value: formProps.min.maxValueRequired ? max : undefined,
                            }
                        })} placeholder="0.00" />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    {errors?.metadata?.min && <FormErrorMessage>{errors.metadata.min.message}</FormErrorMessage>}
                </FormControl>
                <FormControl
                    isDisabled={formProps.max.isDisabled}
                    isRequired={formProps.max.isRequired}
                    isInvalid={!!errors?.metadata?.max}>
                    <FormLabel>Maximum Value</FormLabel>
                    <NumberInput>
                        <NumberInputField {...register("metadata.max", {
                            required: {
                                value: formProps.max.isRequired,
                                message: "Maximum length is required",
                            },
                            min: {
                                message: "Maximum length must be greater than the minimum length",
                                value: formProps.max.minValueRequired ? min : undefined,
                            }
                        })} placeholder="280.00" />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    {errors?.metadata?.max && <FormErrorMessage>{errors.metadata.max.message}</FormErrorMessage>}
                </FormControl>
            </SimpleGrid>
        </Stack>
    )
}

const IntMetadataFormFields = () => {

    const { register, watch, resetField, formState: { errors } } = useFormContext();
    const typeOfValidation = watch("metadata.limit_validation_type")

    const min = watch("metadata.min")
    const max = watch("metadata.max")

    useEffect(() => {
        switch (typeOfValidation) {
            case 'min': resetField("metadata.max")
                break;
            case 'max': resetField("metadata.min")
                break;
            case 'none': resetField("metadata.min")
                resetField("metadata.max")
                break;
        }
    }, [typeOfValidation])

    const formProps = useMemo(() => {
        return {
            min: {
                isRequired: ["minMax", "min"].includes(typeOfValidation),
                isDisabled: ["none", "max"].includes(typeOfValidation),
                maxValueRequired: typeOfValidation === "minMax"
            },
            max: {
                isRequired: ["minMax", "max"].includes(typeOfValidation),
                isDisabled: ["none", "min"].includes(typeOfValidation),
                minValueRequired: typeOfValidation === "minMax"
            }
        }
    }, [typeOfValidation])

    return (
        <Stack spacing="4">
            <FormControl isRequired>
                <FormLabel>Type of limit</FormLabel>
                <Select defaultValue='minMax'
                    {...register("metadata.limit_validation_type")}>
                    <option value='minMax'>Both minimum and maximum</option>
                    <option value='min'>Only minimum</option>
                    <option value='max'>Only maximum</option>
                    <option value='none'>None</option>
                </Select>
            </FormControl>
            <SimpleGrid columns={2} spacingX={6} spacingY={4}>
                <FormControl
                    isDisabled={formProps.min.isDisabled}
                    isRequired={formProps.min.isRequired}
                    isInvalid={!!errors?.metadata?.min}>
                    <FormLabel>Minimum Value</FormLabel>
                    <NumberInput>
                        <NumberInputField {...register("metadata.min", {
                            required: {
                                value: formProps.min.isRequired,
                                message: "Minimum value is required"
                            },
                            max: {
                                message: "Minimum value must be less than the maximum value",
                                value: formProps.min.maxValueRequired ? max : undefined,
                            }
                        })} placeholder="0.00" />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    {errors?.metadata?.min && <FormErrorMessage>{errors.metadata.min.message}</FormErrorMessage>}
                </FormControl>
                <FormControl
                    isDisabled={formProps.max.isDisabled}
                    isRequired={formProps.max.isRequired}
                    isInvalid={!!errors?.metadata?.max}>
                    <FormLabel>Maximum Value</FormLabel>
                    <NumberInput>
                        <NumberInputField {...register("metadata.max", {
                            required: {
                                value: formProps.max.isRequired,
                                message: "Maximum value is required",
                            },
                            min: {
                                message: "Maximum value must be greater than the minimum value",
                                value: formProps.max.minValueRequired ? min : undefined,
                            }
                        })} placeholder="280.00" />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    {errors?.metadata?.max && <FormErrorMessage>{errors.metadata.max.message}</FormErrorMessage>}
                </FormControl>
            </SimpleGrid>
        </Stack>
    )
}

const FloatMetadataFormFields = () => {

    const { register, watch, resetField, formState: { errors } } = useFormContext();
    const typeOfValidation = watch("metadata.limit_validation_type")

    const precision = watch("metadata.precision")

    const min = watch("metadata.min")
    const max = watch("metadata.max")

    useEffect(() => {
        switch (typeOfValidation) {
            case 'min': resetField("metadata.max")
                break;
            case 'max': resetField("metadata.min")
                break;
            case 'none': resetField("metadata.min")
                resetField("metadata.max")
                break;
        }
    }, [typeOfValidation])

    const formProps = useMemo(() => {
        return {
            min: {
                isRequired: ["minMax", "min"].includes(typeOfValidation),
                isDisabled: ["none", "max"].includes(typeOfValidation),
                maxValueRequired: typeOfValidation === "minMax"
            },
            max: {
                isRequired: ["minMax", "max"].includes(typeOfValidation),
                isDisabled: ["none", "min"].includes(typeOfValidation),
                minValueRequired: typeOfValidation === "minMax"
            }
        }
    }, [typeOfValidation])

    return (
        <Stack spacing="4">
            <SimpleGrid columns={2} spacingX={6} spacingY={4}>
                <FormControl isRequired>
                    <FormLabel>Type of limit</FormLabel>
                    <Select defaultValue='minMax'
                        {...register("metadata.limit_validation_type")}>
                        <option value='minMax'>Both minimum and maximum</option>
                        <option value='min'>Only minimum</option>
                        <option value='max'>Only maximum</option>
                        <option value='none'>None</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Precision</FormLabel>
                    <Select defaultValue='2'
                        {...register("metadata.precision")}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                    </Select>
                </FormControl>
                <FormControl
                    isDisabled={formProps.min.isDisabled}
                    isRequired={formProps.min.isRequired}
                    isInvalid={!!errors?.metadata?.min}>
                    <FormLabel>Minimum Value</FormLabel>
                    <NumberInput precision={precision}>
                        <NumberInputField {...register("metadata.min", {
                            required: {
                                value: formProps.min.isRequired,
                                message: "Minimum value is required"
                            },
                            max: {
                                message: "Minimum value must be less than the maximum value",
                                value: formProps.min.maxValueRequired ? max : undefined,
                            }
                        })} placeholder="0.00" />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    {errors?.metadata?.min && <FormErrorMessage>{errors.metadata.min.message}</FormErrorMessage>}
                </FormControl>
                <FormControl
                    isDisabled={formProps.max.isDisabled}
                    isRequired={formProps.max.isRequired}
                    isInvalid={!!errors?.metadata?.max}>
                    <FormLabel>Maximum Value</FormLabel>
                    <NumberInput precision={precision}>
                        <NumberInputField {...register("metadata.max", {
                            required: {
                                value: formProps.max.isRequired,
                                message: "Maximum value is required",
                            },
                            min: {
                                message: "Maximum value must be greater than the minimum value",
                                value: formProps.max.minValueRequired ? min : undefined,
                            }
                        })} placeholder="280.00" />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    {errors?.metadata?.max && <FormErrorMessage>{errors.metadata.max.message}</FormErrorMessage>}
                </FormControl>
            </SimpleGrid>
        </Stack>
    )
}


const TimestampMetadataFormFields = () => {

    const { register, resetField, watch, formState: { errors } } = useFormContext();
    const typeOfValidation = watch("metadata.limit_validation_type")

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        switch (typeOfValidation) {
            case 'min': resetField("metadata.max")
                break;
            case 'max': resetField("metadata.min")
                break;
            case 'none': resetField("metadata.min")
                resetField("metadata.max")
                break;
        }
    }, [typeOfValidation])

    const formProps = useMemo(() => {
        return {
            min: {
                isRequired: ["minMax", "min"].includes(typeOfValidation),
                isDisabled: ["none", "max"].includes(typeOfValidation),
                maxValueRequired: typeOfValidation === "minMax"
            },
            max: {
                isRequired: ["minMax", "max"].includes(typeOfValidation),
                isDisabled: ["none", "min"].includes(typeOfValidation),
                minValueRequired: typeOfValidation === "minMax"
            }
        }
    }, [typeOfValidation])

    return (
        <Stack spacing="4">
            <FormControl isRequired>
                <FormLabel>Timestamp Period</FormLabel>
                <Select defaultValue='none'
                    {...register("metadata.limit_validation_type")}>
                    <option value='minMax'>Both past and future</option>
                    <option value='min'>Only future</option>
                    <option value='max'>Only past</option>
                    <option value='none'>None</option>
                </Select>
            </FormControl>
            <SimpleGrid columns={2} spacingX={6} spacingY={4}>
                {!formProps.min.isDisabled &&
                    <FormControl
                        isRequired={formProps.min.isRequired}
                        isInvalid={!!errors?.metadata?.min}>
                        <FormLabel>Min date</FormLabel>
                        {/* <DatePicker
                            {...register("metadata.min")}
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)} /> */}
                        {errors?.metadata?.min && <FormErrorMessage>{errors.metadata.min.message}</FormErrorMessage>}
                    </FormControl>}
                {!formProps.max.isDisabled &&
                    <FormControl
                        isRequired={formProps.max.isRequired}
                        isInvalid={!!errors?.metadata?.max}>
                        <FormLabel>Max date</FormLabel>
                        {/* <DatePicker
                            {...register("metadata.max")}
                            selected={endDate}
                            onChange={(date: Date) => setEndDate(date)} /> */}
                        {errors?.metadata?.max && <FormErrorMessage>{errors.metadata.max.message}</FormErrorMessage>}
                    </FormControl>}
            </SimpleGrid>
        </Stack>
    )
}