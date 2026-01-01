import React, { useState, useRef, useEffect } from 'react'
import { Controller } from 'react-hook-form'

const MAX_VISIBLE = 2

const MultiSelectChipField = ({
    label,
    name,
    control,
    options,
    required
}) => {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef(null)

    /* -----------------------------
       Close on outside click
    ------------------------------ */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <label className="form-control w-full max-w-xs my-0">
            <div className="label">
                <span className="label-text">
                    {label} {required && <span className="text-red-800">*</span>}
                </span>
            </div>

            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    const selected = field.value || []
                    const visible = selected.slice(0, MAX_VISIBLE)
                    const extra = selected.length - MAX_VISIBLE

                    return (
                        <div className="relative" ref={wrapperRef}>
                            {/* INPUT */}
                            <div
                                className="
                                  input input-bordered w-full min-h-[48px]
                                  flex items-center gap-2 cursor-pointer
                                  overflow-hidden whitespace-nowrap
                                "
                                onClick={() => setOpen(!open)}
                            >
                                {selected.length === 0 && (
                                    <span className="text-gray-400 truncate">
                                        Select {label}
                                    </span>
                                )}

                                {visible.map(id => {
                                    const item = options.find(o => o.id === id)
                                    if (!item) return null

                                    return (
                                        <span
                                            key={id}
                                            className="badge badge-primary gap-1 shrink-0"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                field.onChange(
                                                    selected.filter(v => v !== id)
                                                )
                                            }}
                                        >
                                            {item.name}
                                            <span className="ml-1">✕</span>
                                        </span>
                                    )
                                })}

                                {extra > 0 && (
                                    <span className="badge badge-outline shrink-0">
                                        +{extra} more
                                    </span>
                                )}
                            </div>

                            {/* DROPDOWN */}
                            {open && (
                                <div className="absolute z-50 mt-1 w-full bg-base-100 border rounded-lg shadow max-h-48 overflow-y-auto">
                                    {options.map(opt => {
                                        const checked = selected.includes(opt.id)

                                        return (
                                            <label
                                                key={opt.id}
                                                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-base-200"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-sm"
                                                    checked={checked}
                                                    onChange={() => {
                                                        if (checked) {
                                                            field.onChange(
                                                                selected.filter(v => v !== opt.id)
                                                            )
                                                        } else {
                                                            field.onChange([...selected, opt.id])
                                                        }
                                                    }}
                                                />
                                                <span>{opt.name}</span>
                                            </label>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                }}
            />
        </label>
    )
}

export default MultiSelectChipField
