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


    // let data: any = {
    //     id: faker.random.alphaNumeric(12)
    // }

    // docfields?.forEach(df => {
    //     if (df.dataType === "string") {
    //         if (df.fieldType === "Short Text") {
    //             // data[df.label] = randomString(metadata.fake_data_category, metadata.fake_data_type)
    //         } else if (df.fieldType === "Email") {
    //             data[df.label] = randomString("internet", "email")
    //         } else if (df.fieldType === "Phone") {
    //             data[df.label] = randomString("phone", "phoneNumber")
    //         } else if (df.fieldType === "URL") {
    //             data[df.label] = randomString("internet", "url")
    //         }
    //     } else if (df.dataType === "boolean") {
    //         data[df.label] = randomBoolean()
    //     }
    // })

    // return data
}

export const getDataForDocfield = (docfield: Docfield) => {
    switch (docfield.dataType) {
        case "string": return randomString("", "")
        case "boolean": return randomBoolean()
        case "int": return generateDataForInt(docfield)
        case "float": return generateDataForFloat(docfield)
        case "timestamp": return null
        default: return null
    }
}