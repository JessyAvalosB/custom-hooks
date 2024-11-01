export interface FormErrors {
    [key: string]: string;
}

export interface useFormProps<T> {
    initialValues: T;
    validate?: (values: T) => FormErrors;
    onSubmit: (values: T) => void;
}
