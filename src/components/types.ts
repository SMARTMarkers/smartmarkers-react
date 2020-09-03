export interface FieldData<T = any> {
    touched: boolean
    error: string | null
    value: T | null
}

export interface FormData {
    [fieldName: string]: FieldData
}
