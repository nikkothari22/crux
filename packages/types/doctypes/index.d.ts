export interface Doctype {
    /** Visual name of the doctype */
    name: string,
    /** Data source of the doctype - collection path for Firebase, table name for Supabase */
    source: string,
    /** ID (primary key) of the doctype */
    id: string,
}
export type BooleanOrCondition = "YES" | "NO" | "CONDITION"


export type Docfield = DocStringField | DocBooleanField | DocIntegerField | DocFloatField | DocTimestampField


export interface DocfieldBasicDetails {
    name: string,
    label: string,
    /** ID of the doctype */
    doctype: string,
    /** ID of docfield  */
    id: string,
    order: number,
    dataType: 'string' | 'int' | 'float' | 'boolean' | 'timestamp',
    isRequired: BooleanOrCondition,
    isReadOnly: BooleanOrCondition,
}

export interface DocStringField extends DocfieldBasicDetails {
    dataType: 'string',
    fieldType: 'Short Text' | 'Long Text' | 'Select' | 'Email' | 'Phone' | 'Image' | 'URL'
    metadata: DocStringFieldMetadata
}

export interface DocIntegerField extends DocfieldBasicDetails {
    dataType: 'int'
    fieldType: 'Number' | 'Currency' | 'Measurement'
    metadata: any
}

export interface DocFloatField extends DocfieldBasicDetails {
    dataType: 'float'
    fieldType: 'Number' | 'Percentage' | 'Currency' | 'Measurement' | 'Temperature'
    metadata: any
}

export interface DocTimestampField extends DocfieldBasicDetails {
    dataType: 'timestamp'
    fieldType: 'Date' | 'Time' | 'Date and Time' | 'Date Range'
    metadata: any
}

export interface DocBooleanField extends DocfieldBasicDetails {
    dataType: 'boolean',
    fieldType: 'Yes/No' | '1/0' | 'True/False'
    metadata: any
}
export interface BasicDocfieldMetadata {

}



export interface DocStringFieldMetadata extends BasicDocfieldMetadata {

}