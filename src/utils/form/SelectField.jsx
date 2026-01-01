
import React from 'react'

const SelectField = ({ label, name, register, options, required }) => {
    return (
        <label className="form-control w-full max-w-xs my-0">
            <div className="label">
                <span className="label-text">
                    {label} {required && <span className="text-red-800">*</span>}
                </span>
            </div>

            <select
                {...register(name, { required })}
                className="select select-bordered w-full max-w-xs"
            >
                <option value="">Select</option>
                {options.map(opt => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default SelectField
