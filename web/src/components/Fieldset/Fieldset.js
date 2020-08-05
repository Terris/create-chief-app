import React from 'react'
import { useFormContext } from 'react-hook-form'

export const Fieldset = ({
  confirms,
  defaultValue,
  label,
  name,
  placeholder,
  type = 'text',
  validation,
  autocomplete,
  autoFocus,
  disabled,
}) => {
  const { register, errors, watch } = useFormContext()

  const forgeValidation = () => {
    let forged = { ...validation }
    if (confirms) {
      const matchField = watch(confirms.field)
      forged = {
        ...forged,
        validate: (value) => value === matchField || confirms.message,
      }
    }
    return forged
  }

  return (
    <fieldset className={`fieldset ${errors[name] ? 'fieldset-error' : ''}`}>
      <label htmlFor={name}>{label || name}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={register(forgeValidation())}
        autoComplete={autocomplete}
        autoFocus={autoFocus}
        disabled={disabled}
      />
      <span className="fieldset-error-message">{errors[name]?.message}</span>
    </fieldset>
  )
}
