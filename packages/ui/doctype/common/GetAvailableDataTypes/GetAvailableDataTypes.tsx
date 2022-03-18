import React from 'react'

interface Props {
    fieldType: string
}

export const getAvailableDataTypes = ({ fieldType }: Props) => {

    var availableDataTypes = [""]

    switch (fieldType) {
        case 'text':
            availableDataTypes = ["String"]
            break;
        case 'number':
            availableDataTypes = ["Int", "Float"]
            break;
        case 'date':
            availableDataTypes = ["String"]
            break;
        case 'boolean':
            availableDataTypes = ["Boolean"]
            break;
        case 'link':
            availableDataTypes = ["String"]
            break;
        case 'options':
            availableDataTypes = ["String", "Int", "Float"]
            break;
        case 'image':
            availableDataTypes = ["String"]
            break;
    }

    return availableDataTypes

}