export const getFieldTypes = (dataType: string) => {

    var fieldTypes = [""]

    switch (dataType) {
        case 'string':
            fieldTypes = ["Short Text", "Long Text", "Select", "Email", "Phone", "Image", "URL"]
            break;
        case 'int':
            fieldTypes = ["Number", "Currency", "Measurement"]
            break;
        case 'float':
            fieldTypes = ["Number", "Percentage", "Currency", "Measurement", "Temperature"]
            break;
        case 'timestamp':
            fieldTypes = ["Date", "Time", "Date and Time", "Date Range"]
            break;
        case 'boolean':
            fieldTypes = ["True/False", "Yes/No", "1/0"]
            break;
    }

    return fieldTypes

}