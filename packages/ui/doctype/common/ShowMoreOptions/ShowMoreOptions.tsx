import { FormControl, FormLabel, Select, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { getAvailableDataTypes } from '../GetAvailableDataTypes/GetAvailableDataTypes'

interface Props {
    fieldType: string
}

export const ShowMoreOptions = ({ fieldType }: Props) => {

    const availableDataTypes = getAvailableDataTypes({ fieldType })
    const [dataType, setDataType] = useState("")

    return (
        <FormControl mt={4}>
            <Stack spacing={2}>
                <FormLabel>Data Type</FormLabel>
                <Select
                    isRequired
                    // placeholder='Select data type'
                    value={fieldType}
                    onChange={(e) => setDataType(e.target.value)}>
                    {availableDataTypes.map((availableDataTypes, index) =>
                        <option key={index}>{availableDataTypes}</option>)}
                </Select>
            </Stack>
        </FormControl>
    )

}