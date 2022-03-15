import { Timestamp } from 'firebase/firestore'

/**
 * Function takes a date string and returns a Date object
 */
export const convertDateStringToDateObject = (dateString: string): Date => {
    let [year, month, day] = dateString.split("-")

    let newDate = new Date()
    newDate.setDate(parseInt(day))
    newDate.setMonth(parseInt(month) - 1)
    newDate.setFullYear(parseInt(year))
    newDate.setHours(0)
    newDate.setMinutes(0)
    newDate.setSeconds(0)

    return newDate
}

/**
 * Function takes in Date object and converts it to DD-MM-YYYY format
 */
export const convertDateObjectToDateString = (date: Date): string => {
    return (date.getDate() < 10 ? "0" : "") + date.getDate() + "-" + (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1).toString() + "-" + date.getFullYear()
}

/**
 * Makes a unique ID
 */
export const makeid = (l: number): string => {
    var text = "";
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < l; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text + Date.now();
}

/**
 * Function to convert Firestore Timestamp to string (date)
 */
export const convertTimeStampToDateString = (timestamp: Timestamp) => {
    //Check if timestamp exists
    if (timestamp === undefined || timestamp === null) {
        return ""
    } else {
        var date = new Date(0);
        var seconds = timestamp.seconds
        date.setUTCSeconds(seconds)
        return date.toDateString()
    }
}

/**
 * Function to convert Firestore Timestamp to date object
 */
export const convertTimeStampToDateObject = (timestamp: Timestamp) => {
    //Check if timestamp exists
    if (timestamp === undefined || timestamp === null) {
        return ""
    } else {
        var date = new Date(0);
        var seconds = timestamp.seconds
        date.setUTCSeconds(seconds)
        return date
    }
}

export const convertStringToFloat = (value: string) => {
    return isNaN(parseFloat(value)) ? 0 : parseFloat(value)
}

/**
 * Function to convert Firestore Timestamp to date object
 */
export const convertTimeStampToDayMonth = (timestamp: Timestamp): string => {
    //Check if timestamp exists
    if (timestamp === undefined || timestamp === null) {
        return ""
    } else {
        var date = new Date(0);
        var seconds = timestamp.seconds
        date.setUTCSeconds(seconds)
        return `${date.getDate()} ${convertMonthNumberToName(date.getMonth(), "short")}`
    }
}

export const simplifyNumber = (number: number): string => {

    let isPositive = true
    if (number < 0) {
        isPositive = false
    }
    let numberWithoutSign = isPositive ? number : -(number);

    if (numberWithoutSign >= 1000000) {
        return `${roundToTwoDecimals(number / 1000000)}M`

    } else if (numberWithoutSign >= 10000) {
        return `${roundToTwoDecimals(number / 1000)}k`
    } else {
        return `${number}`
    }
}

export const simplifyNumberInIndian = (number: number): string => {

    let isPositive = true
    if (number < 0) {
        isPositive = false
    }
    let numberWithoutSign = isPositive ? number : -(number);

    if (numberWithoutSign >= 10000000) {
        return `${roundToTwoDecimals(number / 10000000)}Cr`

    } else if (numberWithoutSign >= 100000) {
        return `${roundToTwoDecimals(number / 100000)}L`

    } else if (numberWithoutSign >= 10000) {
        return `${roundToTwoDecimals(number / 1000)}k`
    } else {
        return `${number}`
    }
}

export const roundToTwoDecimals = (number: number): number => {
    return Math.round((number + Number.EPSILON) * 100) / 100
}

export const convertMonthNumberToName = (month: number, type: "short" | "long"): string => {

    switch (month) {
        case 0: return type === "short" ? "Jan" : "January"
        case 1: return type === "short" ? "Feb" : "February"
        case 2: return type === "short" ? "Mar" : "March"
        case 3: return type === "short" ? "Apr" : "April"
        case 4: return type === "short" ? "May" : "May"
        case 5: return type === "short" ? "June" : "June"
        case 6: return type === "short" ? "July" : "July"
        case 7: return type === "short" ? "Aug" : "August"
        case 8: return type === "short" ? "Sept" : "September"
        case 9: return type === "short" ? "Oct" : "October"
        case 10: return type === "short" ? "Nov" : "November"
        case 11: return type === "short" ? "Dec" : "December"
        default: return ""
    }
}

// export const getCurrencySymbol = (currency: Currency): string => {
//     switch (currency) {
//         case "INR": return "₹"
//         case "USD": return "$"
//         case "EUR": return "€"
//     }
// }

export const convertTimeStampToDayMonthYear = (timestamp: Timestamp): string => {
    //Check if timestamp exists
    if (timestamp === undefined || timestamp === null) {
        return ""
    } else {
        var date = new Date(0);
        var seconds = timestamp.seconds
        date.setUTCSeconds(seconds)
        return `${date.getDate()} ${convertMonthNumberToName(date.getMonth(), "short")} ${date.getFullYear()}`
    }
}

/** Takes a string and returns a slug */
export const convertToSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        ;
}