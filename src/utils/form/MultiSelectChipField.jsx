import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Controller } from 'react-hook-form'

const MAX_VISIBLE = 2

const MultiSelectChipField = ({
    label,
    name,
    control,
    options = [],
    required
}) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const wrapperRef = useRef(null)

    /* -----------------------------
       Close on outside click
    ------------------------------ */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false)
                setSearch('') // reset search on close
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    /* -----------------------------
       Filter options by search
    ------------------------------ */
    const filteredOptions = useMemo(() => {
        return options.filter(opt =>
            opt.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [options, search])

    return (
        <div className="form-control w-full my-0">
            {/* Field Label */}
            <div className="label">
                <span className="label-text">
                    {label} {required && <span className="text-red-800">*</span>}
                </span>
            </div>

            <Controller
                name={name}
                control={control}
                defaultValue={[]}
                render={({ field }) => {
                    const selected = Array.isArray(field.value) ? field.value : []
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
                                onClick={() => setOpen(true)}
                            >
                                {selected.length === 0 && (
                                    <span className="text-gray-400 truncate">
                                        Select {label}
                                    </span>
                                )}

                                {visible.map((id) => {
                                    const item = options.find(o => o.id === id)
                                    if (!item) return null

                                    return (
                                        <span
                                            key={id}
                                            className="badge badge-primary gap-1 shrink-0"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                field.onChange(selected.filter(v => v !== id))
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
                                <div className="absolute z-50 mt-1 w-full bg-base-100 border rounded-lg shadow max-h-60 overflow-y-auto">

                                    {/* 🔍 Search */}
                                    <div className="sticky top-0 bg-base-100 p-2 border-b">
                                        <input
                                            type="text"
                                            className="input input-sm input-bordered w-full"
                                            placeholder={`Search ${label}`}
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>

                                    {/* Options */}
                                    {filteredOptions.length === 0 ? (
                                        <div className="px-3 py-2 text-sm text-gray-400">
                                            No results found
                                        </div>
                                    ) : (
                                        filteredOptions.map((opt) => {
                                            const checked = selected.includes(opt.id)

                                            return (
                                                <div
                                                    key={opt.id}
                                                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-base-200"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox checkbox-sm"
                                                        checked={checked}
                                                        onChange={(e) => {
                                                            e.stopPropagation()
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
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                            )}
                        </div>
                    )
                }}
            />
        </div>
    )
}

export default MultiSelectChipField
