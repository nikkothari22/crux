import { faker, Faker } from '@faker-js/faker';
import { Docfield } from 'types/doctypes'

export const randomBoolean = () => Math.random() < 0.5;

export const randomNumber = (min?: number, max?: number, type?: 'Int' | 'Float', precision?: number) => {

    let random = Math.random();

    if (type === 'Int') {
        return Math.round(random)
    } else {
        if (precision) {
            //TODO: Round off number to x digits
        } else {
            return Math.random()
        }
    }

}

export const randomTimestamp = () => {
    return faker.date.between('', '')
}

//TODO: Set types for Faker Categories and Faker Types
// type FakerCategories = 'name'
// type FakerTypes = "firstName" | "lastName"
export const randomString = (category: string, type: string) => {
    // @ts-ignore
    return faker[category][type]()
}

export const getDummyDataObjectFromDocfields = (docfields: Docfield[]) => {

    let data: any = {
        id: faker.random.alphaNumeric(12)
    }

    docfields?.forEach(df => {
        if (df.dataType === "string") {
            if (df.fieldType === "Short Text") {
                data[df.label] = randomString("name", "firstName")
            } else if (df.fieldType === "Email") {
                data[df.label] = randomString("internet", "email")
            } else if (df.fieldType === "Phone") {
                data[df.label] = randomString("phone", "phoneNumber")
            }
        } else if (df.dataType === "boolean") {
            data[df.label] = randomBoolean()
        }
    })

    return data
}