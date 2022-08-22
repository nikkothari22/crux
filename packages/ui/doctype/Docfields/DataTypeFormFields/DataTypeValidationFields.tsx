import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid, Stack, useColorModeValue } from "@chakra-ui/react";
import { forwardRef, useEffect, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { CalendarIcon } from "@chakra-ui/icons";
import "react-datepicker/dist/react-datepicker.css";
import "../../../theme/Chakra-React-DatePicker/chakra-react-datepicker.css";

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
            return null
        case 'boolean':
            return null
        default: return null
    }
}


// STRING METADATA FORM
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


// INT METADATA FORM
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


// FLOAT METADATA FORM
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


// TIMESTAMP METADATA FORM
const TimestampMetadataFormFields = () => {

    const { register, watch, resetField, control, formState: { errors } } = useFormContext();
    const typeOfValidation = watch("metadata.limit_validation_type")

    useEffect(() => {
        switch (typeOfValidation) {
            case 'min': resetField("metadata.maxDate")
                break;
            case 'max': resetField("metadata.minDate")
                break;
            case 'none': resetField("metadata.minDate")
                resetField("metadata.maxDate")
                break;
        }
    }, [typeOfValidation])

    const formProps = useMemo(() => {
        return {
            min: {
                isRequired: ["minMax", "min"].includes(typeOfValidation),
            },
            max: {
                isRequired: ["minMax", "max"].includes(typeOfValidation),
            }
        }
    }, [typeOfValidation])

    const customDateInput = ({ value, onClick, onChange }: any, ref: any) => (
        <Input
            autoComplete="off"
            value={value}
            ref={ref}
            onClick={onClick}
            onChange={onChange}
        />
    )
    customDateInput.displayName = "DateInput"
    const CustomInput = forwardRef(customDateInput)
    const icon = <CalendarIcon fontSize="sm" />
    const theme = useColorModeValue("light-theme", "dark-theme")

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
                {(typeOfValidation === 'min' || typeOfValidation === 'minMax') &&
                    <FormControl
                        isRequired={formProps.min.isRequired}
                        isInvalid={!!errors?.metadata?.minDate}>
                        <FormLabel>Min date</FormLabel>
                        <InputGroup className={theme} maxW='50%'>
                            <Controller
                                control={control}
                                name="metadata.minDate"
                                render={({ field }) => (
                                    <ReactDatePicker
                                        selected={field.value}
                                        onChange={(date: Date) => field.onChange(date)}
                                        showPopperArrow={false}
                                        className="react-datapicker__input-text"
                                        customInput={<CustomInput />} />
                                )}
                            />
                            <InputRightElement color="gray.500" children={icon} />
                        </InputGroup>
                        {errors?.metadata?.minDate && <FormErrorMessage>{errors.metadata.minDate.message}</FormErrorMessage>}
                    </FormControl>}
                {(typeOfValidation === 'max' || typeOfValidation === 'minMax') &&
                    <FormControl
                        isRequired={formProps.max.isRequired}
                        isInvalid={!!errors?.metadata?.maxDate}>
                        <FormLabel>Max date</FormLabel>
                        <InputGroup className={theme} maxW='50%'>
                            <Controller
                                control={control}
                                name="metadata.maxDate"
                                render={({ field }) => (
                                    <ReactDatePicker
                                        selected={field.value}
                                        onChange={(date: Date) => field.onChange(date)}
                                        showPopperArrow={false}
                                        className="react-datapicker__input-text"
                                        customInput={<CustomInput />} />
                                )}
                            />
                            <InputRightElement color="gray.500" children={icon} />
                        </InputGroup>
                        {errors?.metadata?.maxDate && <FormErrorMessage>{errors.metadata.maxDate.message}</FormErrorMessage>}
                    </FormControl>}
            </SimpleGrid>
        </Stack>
    )
}