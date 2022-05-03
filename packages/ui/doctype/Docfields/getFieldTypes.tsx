export const getFieldTypes = (dataType: string) => {

    var fieldTypes = [""]

    switch (dataType) {
        case 'string':
            fieldTypes = ["Short Text", "Long Text", "ID", "Email", "Phone number",]
            break;
        case 'int':
            fieldTypes = ["Number"]
            break;
        case 'float':
            fieldTypes = ["Decimal Number"]
            break;
        case 'timestamp':
            fieldTypes = ["DD-MM-YY", "YYYY", "DD-MM-YY h:m:s"]
            break;
        case 'boolean':
            fieldTypes = ["True/False", "Yes/No", "1/0"]
            break;
    }

    return fieldTypes

}