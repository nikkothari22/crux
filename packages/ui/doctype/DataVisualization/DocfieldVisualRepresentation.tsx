
import { DocBooleanField, DocFloatField, DocIntegerField, DocStringField } from "types/doctypes";

export const getBooleanField = (docfield: DocBooleanField, data: any) => {

    switch (docfield.fieldType) {
        case "True/False": return data[docfield.name] ? "True" : "False"
        case "Yes/No": return data[docfield.name] ? "Yes" : "No"
        case "1/0": return data[docfield.name] ? "1" : "0"
        default: return data[docfield.name] ? "true" : "false"
    }
}

export const getIntegerField = (docfield: DocIntegerField | DocFloatField, data: any) => {

    let output = data[docfield.name]

    switch (docfield.fieldType) {
        case "Percentage": output = `${output}%`
            break
        case "Currency": output = `${docfield.metadata?.currency ?? ""}${output.toLocaleString()}`
            break
    }

    if (docfield.fieldType !== "Percentage" && docfield.metadata?.suffix) {
        output += " " + docfield.metadata.suffix
    }

    return output

}

export const getStringField = (docfield: DocStringField, data: any) => {

    switch (docfield.fieldType) {
        case "Email": return <a href={`mailto:${data[docfield.name]}`}>{data[docfield.name]}</a>
        case "Phone": return <a href={`tel:${data[docfield.name]}`}>{data[docfield.name]}</a>
        case "URL": return <a href={data[docfield.name]}>{data[docfield.name]}</a>
        default: return data[docfield.name]
    }
}