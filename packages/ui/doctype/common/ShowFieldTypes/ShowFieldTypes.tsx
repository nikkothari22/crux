import { FormControl, FormLabel, Select, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { getFieldTypes } from '../getFieldTypes'

interface Props {
    dataType: string
}

export const ShowFieldTypes = ({ dataType }: Props) => {

    const fieldTypes = getFieldTypes(dataType)
    const [fieldType, setFieldType] = useState("")

    return (
        <FormControl mt={4}>
            <Stack spacing={2}>
                <FormLabel>Field Type</FormLabel>
                <Select
                    isRequired
                    // placeholder='Select field type'
                    value={fieldType}
                    onChange={(e) => setFieldType(e.target.value)}>
                    {fieldTypes.map((fieldTypes, index) =>
                        <option key={index}>{fieldTypes}</option>)}
                </Select>
            </Stack>
        </FormControl>
    )

}