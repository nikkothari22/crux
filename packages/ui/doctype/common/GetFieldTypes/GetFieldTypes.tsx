import React from 'react'

interface Props {
    dataType: string
}

export const getFieldTypes = ({ dataType }: Props) => {

    var fieldTypes = [""]

    switch (dataType) {
        case 'string':
            fieldTypes = ["Short Text", "Long Text", "ID", "Email", "Phone number",]
            break;
        case 'int':
            fieldTypes = [""]
            break;
        case 'float':
            fieldTypes = [""]
            break;
        case 'timestamp':
            fieldTypes = [""]
            break;
        case 'boolean':
            fieldTypes = [""]
            break;
    }

    return fieldTypes

}