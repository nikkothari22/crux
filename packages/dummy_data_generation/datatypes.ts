import { DocFloatField, DocIntegerField, DocStringField } from "types/doctypes";
import { randomNumber } from ".";

export const generateDataForInt = (docfield: DocIntegerField) => {

    //For int, dummy data does not depend on fieldType. 

    //1. Check type of limit
    //2. Generate random number
    //3. Return number

    let min = docfield.metadata.min ? Number(docfield.metadata.min) : undefined
    let max = docfield.metadata.max ? Number(docfield.metadata.max) : undefined
    switch (docfield.metadata.limit_validation_type) {
        case "minMax":
            return randomNumber(min, max, 'Int')
        case "min":
            return randomNumber(min, undefined, 'Int')
        case "max":
            return randomNumber(undefined, max, 'Int')
        case "none":
            return randomNumber(undefined, undefined, 'Int')
    }

}

export const generateDataForFloat = (docfield: DocFloatField) => {

    //For float, dummy data does not depend on fieldType. 

    //1. Check type of limit
    //2. Generate random number
    //3. Return number
    console.log("Docfield", docfield)
    let min = docfield.metadata.min ? Number(docfield.metadata.min) : undefined
    let max = docfield.metadata.max ? Number(docfield.metadata.max) : undefined
    let precision = docfield.metadata.precision ? Number(docfield.metadata.precision) : undefined

    console.log(min, max, precision)
    switch (docfield.metadata.limit_validation_type) {
        case "minMax":
            return randomNumber(min, max, 'Float', precision)
        case "min":
            return randomNumber(min, undefined, 'Float', precision)
        case "max":
            return randomNumber(undefined, max, 'Float', precision)
        case "none":
            return randomNumber(undefined, undefined, 'Float', precision)
    }

}

export const generateDataForString = (docfield: DocStringField) => {


}