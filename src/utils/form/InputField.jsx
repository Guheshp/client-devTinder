import React from 'react'

const InputField = ({
    label,
    name,
    register,
    required = false,
    type = 'text',
    disabled = false,
    placeholder = ''
}) => {
    return (
        <label className="form-control w-full my-0">
            <div className="label">
                <span className="label-text">
                    {label} {required && <span className="text-red-800">*</span>}
                </span>
            </div>

            <input
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                {...register(name, { required })}
                className={`input input-bordered w-full 
          ${disabled ? 'bg-base-200 cursor-not-allowed opacity-70' : ''}`}
            />
        </label>
    )
}

export default InputField
