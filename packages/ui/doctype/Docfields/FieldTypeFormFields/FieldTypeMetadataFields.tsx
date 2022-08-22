import { FormControl, FormHelperText, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid, Text, Textarea } from "@chakra-ui/react"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { CurrencyField, SuffixField } from "./Fields"
import { getFieldTypesForFakeData } from "./fieldTypesForFakeData"

type Props = {
    fieldType: string
}

export const FieldTypeMetadataFields = ({ fieldType }: Props) => {

    switch (fieldType) {
        case 'Short Text':
            return <ShortTextMetadataFormFields />
        case 'Long Text':
            return <LongTextFormField />
        case 'Select':
            return <SelectMetadataFormField />
        case 'Number':
            return <NumberFieldFormField />
        case 'Currency':
            return <CurrencyFieldFormField />
        case 'Timestamp':
            return <TimestampFormFields />
        case 'Month':
            return <EmptyFieldDetailsBanner />
        case 'Weekday':
            return <EmptyFieldDetailsBanner />
        default: return <EmptyFieldDetailsBanner />
    }
}

const ShortTextMetadataFormFields = () => {

    const { register, watch } = useFormContext();
    const fakeDataMetadata = watch("metadata.fake_data_category")
    const fieldTypes = useMemo(() => getFieldTypesForFakeData(fakeDataMetadata), [fakeDataMetadata])

    return (
        <SimpleGrid columns={2} spacingX={6} spacingY={4}>
            <FormControl>
                <FormLabel>Category</FormLabel>
                <Select placeholder="Select category"
                    {...register("metadata.fake_data_category")}>
                    <option value='name'>Name</option>
                    <option value='address'>Address</option>
                    <option value='company'>Company</option>
                    <option value='finance'>Finance</option>
                    <option value='internet'>Internet</option>
                    <option value='animal'>Animal</option>
                    <option value='image'>Image</option>
                    <option value='system'>System</option>
                    <option value='vehicle'>Vehicle</option>
                    <option value='music'>Music</option>
                    <option value='science'>Science</option>
                    <option value='git'>Git</option>
                    <option value='hacker'>Hacker</option>
                </Select>
            </FormControl>
            <FormControl>
                <FormLabel>Type</FormLabel>
                <Select placeholder="Select type"
                    {...register("metadata.fake_data_type")}>
                    {fieldTypes.map((fieldTypes, index) =>
                        <option key={index}>{fieldTypes}</option>)}
                </Select>
            </FormControl>
        </SimpleGrid>
    )
}

const SelectMetadataFormField = () => {

    const { register, formState: { errors } } = useFormContext();

    return (
        <FormControl
            isRequired
            isInvalid={!!errors?.metadata?.options}>
            <FormLabel>Add options</FormLabel>
            <Textarea maxW="50%"
                {...register("metadata.options", {
                    required: "You need to add options for the select field type."
                })} />
            <FormHelperText>Press enter to add new option.</FormHelperText>
        </FormControl>
    )
}

const LongTextFormField = () => {

    const { register, formState: { errors } } = useFormContext();

    return (
        <SimpleGrid columns={2} spacingX={6} spacingY={4}>
            <FormControl
                isRequired
                isInvalid={!!errors?.metadata?.long_text_type}>
                <FormLabel>Select type</FormLabel>
                <Select placeholder="Select category"
                    {...register("metadata.long_text_type")}>
                    <option value='lines'>Lines</option>
                    <option value='sentences'>Sentences</option>
                    <option value='paragraphs'>Paragraphs</option>
                    <option value='slug'>Slug</option>
                    <option value='words'>Words</option>
                    <option value='text'>Text</option>
                </Select>
            </FormControl>
            <FormControl>
                <FormLabel>Number of lines/ words to be generated:</FormLabel>
                <NumberInput defaultValue={2} min={1} max={1000}>
                    <NumberInputField {...register("metadata.num_of_words_or_lines")} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
        </SimpleGrid>
    )
}

const NumberFieldFormField = () => {
    return (
        <SimpleGrid columns={2} spacingX={6} spacingY={4}>
            <SuffixField />
        </SimpleGrid>
    )
}

const CurrencyFieldFormField = () => {
    return (
        <SimpleGrid columns={2} spacingX={6} spacingY={4}>
            <CurrencyField />
            <SuffixField />
        </SimpleGrid>
    )
}

const TimestampFormFields = () => {

    const { register } = useFormContext();

    return (
        <SimpleGrid columns={2} spacingX={6} spacingY={4}>
            <FormControl>
                <FormLabel>Format</FormLabel>
                <Select placeholder="timestamp to be generated"
                    {...register("metadata.timestamp_field")}>
                    <option value='between'>Between</option>
                    <option value='betweens'>Betweens</option>
                    <option value='birthdate'>Birthdate</option>
                    <option value='future'>Future</option>
                    <option value='past'>Past</option>
                    <option value='recent'>Recent</option>
                    <option value='soon'>Soon</option>
                </Select>
            </FormControl>
        </SimpleGrid>
    )
}

const EmptyFieldDetailsBanner = () => {
    return <Text color="gray.400">Nothing to show.</Text>
}