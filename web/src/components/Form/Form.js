import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'

export const Form = ({ onSubmit, className, error, children }) => {
  const methods = useForm({ mode: 'onBlur' })
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) =>
          onSubmit(data, { reset: methods.reset })
        )}
        className={className}
      >
        {error && (
          <p className="form-error">{error.message ? error.message : error}</p>
        )}
        {children}
      </form>
    </FormProvider>
  )
}
