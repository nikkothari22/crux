export const getFieldTypes = (dataType: string) => {

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