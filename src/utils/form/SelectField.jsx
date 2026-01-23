import React from 'react'

// 1. Add 'error' to props
const SelectField = ({ label, name, register, options, required, error }) => {
    return (
        <label className="form-control w-full max-w-md my-0">
            <div className="label">
                <span className="label-text">
                    {label} {required && <span className="text-red-500">*</span>}
                </span>
            </div>

            <select
                // 2. Pass a custom message if 'required' is true
                {...register(name, { required: required ? `${label} is required` : false })}
                // 3. Add 'select-error' class if error exists (DaisyUI standard)
                className={`select select-bordered w-full max-w-md ${error ? "select-error" : ""}`}
            >
                <option value="">Select</option>
                {options.map(opt => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>

            {/* 4. Display the Error Message */}
            {error && (
                <div className="label pb-0 pt-1">
                    <span className="label-text-alt text-red-500">
                        {error.message || "This field is required"}
                    </span>
                </div>
            )}
        </label>
    )
}

export default SelectField