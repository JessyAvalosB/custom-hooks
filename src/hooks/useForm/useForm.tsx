import { ChangeEvent, FormEvent, useState } from "react"
import { FormErrors, useFormProps } from "./useForm.interface";

/**
 * Custom hook for managing form state, handling input changes, validation, and submission.
 * 
 * @template T The type of the form values object, used to enforce typing on form fields.
 * 
 * @param {UseFormOptions<T>} options Options for configuring the form's initial values, validation, and submission.
 * 
 * @param {T} options.initialValues - Initial values for the form fields.
 * @param {(values: T) => FormErrors} [options.validate] - Optional validation function that takes form values
 * and returns an object containing error messages for invalid fields.
 * @param {(values: T) => void} options.onSubmit - Function that will be called when the form is submitted.
 * 
 * @returns {{
*   values: T; 
*   errors: FormErrors; 
*   isSubmitting: boolean;
*   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
*   handleBlur: () => void;
*   handleSubmit: (e: React.FormEvent) => void;
*   resetForm: () => void;
* }}
* 
* - `values` {T} - Current values of form fields.
* - `errors` {FormErrors} - Object containing any validation errors for form fields.
* - `isSubmitting` {boolean} - Boolean flag indicating if the form is currently submitting.
* - `handleChange` {(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} - Function to update form values when input changes.
* - `handleBlur` {() => void} - Function to run validation on field blur and store any resulting errors.
* - `handleSubmit` {(e: React.FormEvent) => void} - Function to handle form submission, validate the form, and execute the `onSubmit` function if valid.
* - `resetForm` {() => void} - Function to reset form values to initial state and clear any errors.
* 
* @example
* const { values, errors, handleChange, handleBlur, handleSubmit, resetForm } = useForm({
*   initialValues: { username: '', email: '' },
*   validate: (values) => {
*     const errors: FormErrors = {};
*     if (!values.username) errors.username = 'Username is required';
*     if (!values.email) errors.email = 'Email is required';
*     return errors;
*   },
*   onSubmit: (values) => {
*     console.log('Form submitted:', values);
*   },
* });
* 
* return (
*   <form onSubmit={handleSubmit}>
*     <input type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
*     {errors.username && <p>{errors.username}</p>}
*     <input type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
*     {errors.email && <p>{errors.email}</p>}
*     <button type="submit">Submit</button>
*     <button type="button" onClick={resetForm}>Reset</button>
*   </form>
* );
*/
const useForm = <T extends Record<string, any>>({ initialValues, validate, onSubmit }: useFormProps<T>) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleBlur = () => {
        if(validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length > 0) {
                return;
            }
        }
        setIsSubmitting(true);
        onSubmit(values);
        setIsSubmitting(false);
    }

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    }
    
    return {
        values,
        errors,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
    }
}

export default useForm;