import { faker } from '@faker-js/faker';
import { DocStringField } from 'types/doctypes'
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

    const str = docfield.metadata?.options;
    const arr = str?.split('\n');
    const category = docfield.metadata?.fake_data_category;
    const type = docfield.metadata?.fake_data_type;
    const fullNameWithMiddleName = faker.name.firstName() + " " + faker.name.middleName() + " " + faker.name.lastName();
    const longTextType = docfield.metadata?.long_text_type;
    const numOfWordsOrLines = docfield.metadata?.num_of_words_or_lines;

    switch (docfield.fieldType) {
        case "Short Text":
            switch (type) {
                case "fullName": return faker.name.findName();
                case "fullName with middleName": return fullNameWithMiddleName;
                // @ts-ignore
                default: return faker[category][type]();
            }
        // @ts-ignore
        case "Long Text": return faker.lorem[longTextType](numOfWordsOrLines);
        case "Select": return faker.helpers.arrayElement(arr)
        case "Email": return faker.internet.email();
        case "Phone": return faker.phone.phoneNumber();
        case "URL": return faker.internet.url();
        case "ID": return faker.datatype.uuid();
        default: return faker.word.noun();
    }
}


export { getDummyDataObjectFromDocfields } from './docfields';
