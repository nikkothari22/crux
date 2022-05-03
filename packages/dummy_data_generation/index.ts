import { faker, Faker } from '@faker-js/faker';


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

//TODO: Set types for Faker Categories and Faker Types
// type FakerCategories = 'name'
// type FakerTypes = "firstName" | "lastName"
export const randomString = (category: string, type: string) => {
    // @ts-ignore
    return faker[category][type]()
}