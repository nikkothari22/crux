export interface DocType {
    /** Visual name of the doctype */
    name: string,
    /** Data source of the doctype - collection path for Firebase, table name for Supabase */
    source: string
}

export type DocField = DocStringField

export interface DocFieldBasicDetails {
    name: string,
    label: string,
    /** ID of the doctype */
    docType: string,
    dataType: 'string' | 'int' | 'float' | 'boolean' | 'timestamp',
    metadata: BasicDocFieldMetadata
}

export interface BasicDocFieldMetadata {
    isRequired: "YES" | "NO" | "CONDITION",
    isReadOnly: "YES" | "NO" | "CONDITION",
}

export interface DocStringField extends DocFieldBasicDetails {
    dataType: 'string',
    fieldType: 'shortText' | 'longText' | 'id' | 'email' | 'url' | 'phone' | 'select' | 'html' | 'markdown' | 'password'
    metadata: DocStringFieldMetadata
}

export interface DocStringFieldMetadata extends BasicDocFieldMetadata {

}