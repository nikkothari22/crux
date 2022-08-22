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
    /** user ID of creator */
    created_by: string,
    order: number,
    defaultValue: string,
    description: string,
    dataType: 'string' | 'int' | 'float' | 'boolean' | 'timestamp',
    isRequired: BooleanOrCondition,
    isReadOnly: BooleanOrCondition,
}

export interface DocStringField extends DocfieldBasicDetails {
    dataType: 'string',
    fieldType: 'Short Text' | 'Long Text' | 'Select' | 'Email' | 'Phone' | 'URL' | 'ID'
    metadata: {
        min?: string,
        max?: string,
        length_validation_type?: 'minMax' | 'min' | 'max' | 'none',
        options?: string,
        fake_data_category?: string,
        fake_data_type?: string,
        long_text_type?: string,
        num_of_words_or_lines?: string
    }
}

export interface DocIntegerField extends DocfieldBasicDetails {
    dataType: 'int'
    fieldType: 'Number' | 'Currency' | 'Percentage'
    metadata: {
        min?: string,
        max?: string,
        limit_validation_type?: 'minMax' | 'min' | 'max' | 'none',
        suffix?: string,
        currency?: string,
    }
}

export interface DocFloatField extends DocfieldBasicDetails {
    dataType: 'float'
    fieldType: 'Number' | 'Currency' | 'Percentage'
    metadata: {
        min?: string,
        max?: string,
        limit_validation_type?: 'minMax' | 'min' | 'max' | 'none',
        suffix?: string,
        precision?: number,
        currency?: string,
    }
}

export interface DocTimestampField extends DocfieldBasicDetails {
    dataType: 'timestamp'
    fieldType: 'Timestamp' | 'Month' | 'Weekday'
    metadata: {
        timestamp_field?: string
    }
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