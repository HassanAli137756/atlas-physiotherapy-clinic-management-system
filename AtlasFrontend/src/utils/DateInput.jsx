import { Clock3 } from 'lucide-react'
import React from 'react'
import { ErrorMessage } from './ErrorMessage'

function DateInput(
{
max="",
min="",
isDisabled=false,
label,
defaultValue="",
name,
options = [],
register,
errors,
onChange,
isRequired=true,
placeholder = "Select an option",
...props
}
) 
{
    
  const fields = register ? register(name, isRequired ? {required: 'Please provide this required field'} : {}) : {}


    return (
        <div>
                <div>
                    <label className="p-2 block text-sm font-medium text-gray-700">
                        
                        <div className='flex justify-start'>
                            {name}
                        </div>

                        <div className="relative">
                            <Clock3
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                            {...fields}
                            max={max}
                            min={min}
                            name={name}
                            disabled={isDisabled}
                            {...props}
                            type="date"
                            defaultValue={defaultValue}
                            onChange={(e) => (
                                onChange?.(e.target.value),
                                fields?.onChange?.(e)
                            )}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition hover:border-emerald-400 hover:bg-white hover:ring-2 hover:ring-emerald-100"
                            />
                        </div>
                    </label>
                </div>
                {
                    isRequired && errors?.[name] &&
                    (
                        <ErrorMessage
                            classes='justify-start'
                            message={errors?.[name]?.message}
                        />
                    )
                }
        </div>
    )
}

export {DateInput}