/**
 * Function checks if number is in range (min <= value <= max)
 */
export const isNumberInRange = (value: number, min: number = 0, max?: number): boolean => {
    if (max === undefined) {
        if (min !== null) {
            return (value >= min)
        } else {
            return true
        }
    } else {
        if (min !== null && max !== null) {
            return (value >= min && value <= max)
        } else if (max !== null) {
            return (value <= max)
        } else if (min !== null) {
            return (value >= min)
        } else {
            return true
        }
    }
}

/** 
 * Validates email
 */
export const isEmailValid = (email: string): boolean => {
    // eslint-disable-next-line no-useless-escape
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email));
}

/** 
 * Function to check if string length is in range (min <= value <= max) - Default minLength is 3
 */
export const isStringLengthInRange = (input: string, minLength: number = 3, maxLength?: number): boolean => {
    if (maxLength === undefined) {
        return (input.length >= minLength)
    } else {
        return (input.length >= minLength && input.length <= maxLength);
    }
}

/** 
 * Validates Indian Phone number
 */
export const isPhoneNumberValid = (phone: string): boolean => {
    // eslint-disable-next-line no-useless-escape
    return (/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/.test(phone) && phone.length <= 10)
}

/** 
 * Validates Indian Pin code
 */
export const isPincodeValid = (pincode: string): boolean => {
    return (/^[1-9][0-9]{5}$/.test(pincode));
}

/** 
 * Validates URL with https, http
 */
export const isURLValid = (url: string): boolean => {
    //TODO Refine URL validation later
    // eslint-disable-next-line no-useless-escape
    let regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(url);

    // return (/^(https:\/\/|http:\/\/\.)\S*/.test(url))
}

/** 
 * Validates password - at least one special character [!@#$%^&*_], one letter, one digit and between 8-60 characters 
 */
export const isPasswordValid = (password: string): boolean => {
    return (/^(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*_-]{8,60}$/.test(password))
}

/** 
 * Validates GSTIN
 */
export const isGSTValid = (gst: string): boolean => {
    return (/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(gst))
}