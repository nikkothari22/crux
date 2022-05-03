export interface Doctype {
    /** Visual name of the doctype */
    name: string,
    /** Data source of the doctype - collection path for Firebase, table name for Supabase */
    source: string,
    /** ID (primary key) of the doctype */
    id: string,
}

export type Docfield = DocStringField | DocBooleanField

export interface DocfieldBasicDetails {
    name: string,
    label: string,
    /** ID of the doctype */
    doctype: string,
    /** ID of docfield  */
    id: string,
    order: number,
    dataType: 'string' | 'int' | 'float' | 'boolean' | 'timestamp',
    metadata: BasicDocfieldMetadata,
    isRequired: "YES" | "NO" | "CONDITION",
    isReadOnly: "YES" | "NO" | "CONDITION",
}

export interface DocStringField extends DocfieldBasicDetails {
    dataType: 'string',
    fieldType: 'shortText' | 'longText' | 'id' | 'email' | 'url' | 'phone' | 'select' | 'html' | 'markdown' | 'password'
    metadata: DocStringFieldMetadata
}

export interface DocBooleanField extends DocfieldBasicDetails {
    dataType: 'boolean',
    fieldType: 'Yes/No' | '1/0' | 'True/False'
}
export interface BasicDocfieldMetadata {

}



export interface DocStringFieldMetadata extends BasicDocfieldMetadata {

}