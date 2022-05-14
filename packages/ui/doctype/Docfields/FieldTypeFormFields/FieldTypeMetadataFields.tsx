import { FormControl, FormLabel, Input, Select, SimpleGrid, Stack, Textarea } from "@chakra-ui/react"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"

type Props = {
    fieldType: string
}

export const FieldTypeMetadataFields = ({ fieldType }: Props) => {

    switch (fieldType) {
        case 'Short Text':
            return <ShortTextMetadataFormFields />
        case 'Select':
            return <SelectMetadataFormField />
        case 'Number':
            return <NumberFieldFormField />
        case 'Currency':
            return <CurrencyFieldFormField />
        default: return null
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
        </FormControl>
    )
}

const NumberFieldFormField = () => {

    const { register } = useFormContext();

    return (
        <FormControl>
            <FormLabel>Suffix</FormLabel>
            <Input {...register("metadata.suffix")} />
        </FormControl>
    )
}

const CurrencyFieldFormField = () => {

    const { register } = useFormContext();

    return (
        <SimpleGrid columns={2} spacingX={6} spacingY={4}>
            <FormControl>
                <FormLabel>Suffix</FormLabel>
                <Input {...register("metadata.suffix")} />
            </FormControl>
            <FormControl>
                <FormLabel>Currency</FormLabel>
                <Input {...register("metadata.currency")} />
            </FormControl>
        </SimpleGrid>
    )
}

const getFieldTypesForFakeData = (fakeDataMetadata: string) => {

    var fieldTypes = [""]

    switch (fakeDataMetadata) {
        case 'name':
            fieldTypes = ["firstName", "lastName", "middleName", "gender", "jobArea", "jobDescriptor", "jobTitle", "jobType", "prefix", "suffix"]
            break;
        case 'address':
            fieldTypes = ["buildingNumber", "cardinalDirection", "city", "cityName", "cityPrefix", "citySuffix", "country", "countryCode", "county", "direction", "latitude", "longitude", "secondaryAddress", "state", "streetAddress", "streetName", "timeZone", "zipCode"]
            break;
        case 'company':
            fieldTypes = ["bs", "bsAdjective", "bsBuzz", "bsNoun", "catchPhrase", "catchPhraseAdjective", "catchPhraseDescriptor", "catchPhraseNoun", "companyName", "companySuffix"]
            break;
        case 'finance':
            fieldTypes = ["account", "accountName", "amount", "bic", "bitcoinAddress", "creditCardCVV", "creditCardIssuer", "creditCardNumber", "currencyCode", "currencyName", "currencySymbol", "pin", "routingNumber", "transactionDescription", "transactionType"]
            break;
        case 'internet':
            fieldTypes = ["avatar", "color", "domainName", "domainSuffix", "domainWord", "emoji", "httpMethod", "ipv4", "ipv6", "mac", "password", "port", "protocol", "userAgent", "userName"]
            break;
    }

    return fieldTypes

}