import { faker, Faker } from '@faker-js/faker';
import { Docfield, DocStringField } from 'types/doctypes'
import { Chance } from 'chance';
export const randomBoolean = () => Math.random() < 0.5;


export const randomNumber = (min?: number, max?: number, type?: 'Int' | 'Float', precision?: number) => {

    let chance = new Chance();
    if (type === 'Int') {
        if (min !== undefined && max !== undefined) {
            return chance.integer({ min, max })
        } else if (min !== undefined) {
            return chance.integer({ min })
        } else if (max !== undefined) {
            return chance.integer({ max })
        } else {
            return chance.integer()
        }
    } else {
        if (min !== undefined && max !== undefined) {
            console.log("Min max")
            return chance.floating({ min: min, max: max, fixed: precision })
        } else if (min !== undefined) {
            return chance.floating({ min, fixed: precision })
        } else if (max !== undefined) {
            return chance.floating({ max, fixed: precision })
        } else {
            return chance.floating({ fixed: precision })
        }
    }

}

export const randomTimestamp = () => {
    return faker.date.between('', '')
}


export const randomString = (docfield: DocStringField) => {
    // @ts-ignore
    // return faker[category][type]()
    let chance = new Chance();

    switch (docfield.fieldType) {
        case "Email": return faker.internet.email();
        case "Phone": return faker.phone.phoneNumber();
        case "URL": return faker.internet.url();
        default: return faker.word.noun();

    }
}


export { getDummyDataObjectFromDocfields } from './docfields';
