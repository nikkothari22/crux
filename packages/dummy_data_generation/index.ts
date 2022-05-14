import { faker, Faker } from '@faker-js/faker';
import { Docfield } from 'types/doctypes'
import { Chance } from 'chance';
export const randomBoolean = () => Math.random() < 0.5;


export const randomNumber = (min?: number, max?: number, type?: 'Int' | 'Float', precision?: number) => {

    let chance = new Chance();
    if (type === 'Int') {
        if (min && max) {
            return chance.integer({ min, max })
        } else if (min) {
            return chance.integer({ min })
        } else if (max) {
            return chance.integer({ max })
        } else {
            return chance.integer()
        }
    } else {
        if (min && max) {
            return chance.floating({ min, max, fixed: precision })
        } else if (min) {
            return chance.floating({ min, fixed: precision })
        } else if (max) {
            return chance.floating({ max, fixed: precision })
        } else {
            return chance.floating({ fixed: precision })
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
    // return faker[category][type]()
    let chance = new Chance();
    return chance.string()
}


export { getDummyDataObjectFromDocfields } from './docfields';
