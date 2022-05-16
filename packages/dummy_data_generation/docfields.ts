import { Docfield } from "types/doctypes"
import { randomBoolean, randomString } from "."
import { generateDataForFloat, generateDataForInt } from "./datatypes"

export const getDummyDataObjectFromDocfields = (docfields: Docfield[]) => {

    let dummyDataObject: any = {}
    //1. Loop over all docfields
    //2. Get dummy data for each docfield
    //3. Add dummy data to dummy data object
    //4. Return object

    docfields.forEach(docfield => {
        dummyDataObject[docfield.name] = getDataForDocfield(docfield)
    })

    return dummyDataObject
}

export const getDataForDocfield = (docfield: Docfield) => {
    switch (docfield.dataType) {
        case "string": return randomString(docfield)
        case "boolean": return randomBoolean()
        case "int": return generateDataForInt(docfield)
        case "float": return generateDataForFloat(docfield)
        case "timestamp": return null
        default: return null
    }
}