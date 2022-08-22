export const getFieldTypesForFakeData = (fakeDataMetadata: string) => {

    var fieldTypes = [""]

    switch (fakeDataMetadata) {
        case 'name':
            fieldTypes = ["firstName", "lastName", "middleName", "fullName", "fullName with middleName", "gender", "jobArea", "jobDescriptor", "jobTitle", "jobType", "prefix", "suffix"]
            break;
        case 'address':
            fieldTypes = ["buildingNumber", "cardinalDirection", "city", "cityName", "cityPrefix", "citySuffix", "country", "countryCode", "county", "direction", "latitude", "longitude", "secondaryAddress", "state", "streetAddress", "streetName", "timeZone", "zipCode"]
            break;
        case 'company':
            fieldTypes = ["bs", "bsAdjective", "bsBuzz", "bsNoun", "catchPhrase", "catchPhraseAdjective", "catchPhraseDescriptor", "catchPhraseNoun", "companyName", "companySuffix"]
            break;
        case 'finance':
            fieldTypes = ["account", "accountName", "amount", "bic", "bitcoinAddress", "creditCardCVV", "creditCardIssuer", "creditCardNumber", "currencyCode", "currencyName", "currencySymbol", "pin", "routingNumber", "transactionDescription", "transactionType"]
            break;
        case 'internet':
            fieldTypes = ["avatar", "color", "domainName", "domainSuffix", "domainWord", "emoji", "httpMethod", "ipv4", "ipv6", "mac", "password", "port", "protocol", "userAgent", "userName"]
            break;
        case 'animal':
            fieldTypes = ["bear", "bird", "cat", "cetacean", "cow", "crocodilia", "dog", "fish", "horse", "insect", "lion", "rabbit", "rodent", "snake", "type"]
            break;
        case 'image':
            fieldTypes = ["abstract", "animals", "avatar", "business", "cats", "city", "dataUri", "fashion", "food", "image", "imageUrl", "nature", "nightlife", "people", "sports", "technics", "transport"]
            break;
        case 'system':
            fieldTypes = ["commonFileExt", "commonFileName", "commonFileType", "directoryPath", "fileExt", "fileName", "filePath", "fileType", "mimeType", "networkInterface", "semver"]
            break;
        case 'vehicle':
            fieldTypes = ["bicycle", "color", "fuel", "manufacturer", "model", "type", "vehicle", "vin", "vrm"]
            break;
        case 'music':
            fieldTypes = ["genre", "songName"]
            break;
        case 'science':
            fieldTypes = ["chemicalElement", "unit"]
            break;
        case 'git':
            fieldTypes = ["branch", "commitEntry", "commitMessage", "commitSha", "shortSha"]
            break;
        case 'hacker':
            fieldTypes = ["abbreviation", "adjective", "ingverb", "noun", "phrase", "verb"]
            break;
    }

    return fieldTypes

}