import React from 'react'

const InputField = ({
    label,
    name,
    register,
    required = false,
    type = 'text',
    disabled = false,
    placeholder = '',
    error,         // 1. Receive the error object from React Hook Form
    textarea = false // 2. Handle textarea prop (since you use it in ProfilePage)
}) => {
    return (
        <label className="form-control w-full my-0">
            <div className="label">
                <span className="label-text">
                    {label} {required && <span className="text-red-600 ml-1">*</span>}
                </span>
            </div>

            {/* Check if it should render a Textarea or standard Input */}
            {textarea ? (
                <textarea
                    placeholder={placeholder}
                    disabled={disabled}
                    {...register(name, { required })}
                    className={`textarea textarea-bordered h-24 w-full 
                        ${disabled ? 'bg-base-200 cursor-not-allowed opacity-70' : ''}
                        ${error ? 'textarea-error' : ''} 
                    `}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...register(name, { required })}
                    className={`input input-bordered w-full 
                        ${disabled ? 'bg-base-200 cursor-not-allowed opacity-70' : ''}
                        ${error ? 'input-error' : ''} 
                    `}
                />
            )}

            {/* 3. Display the Error Message if it exists */}
            {error && (
                <div className="label pb-0 pt-1">
                    <span className="label-text-alt text-red-500 font-medium">
                        {error.message}
                    </span>
                </div>
            )}
        </label>
    )
}

export default InputField