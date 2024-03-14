import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

const CustomTextFieldForwardRef = (props: TextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <>
      <TextField
        {...props}
        ref={ref}
        variant="outlined"
        value={props.value ?? ''}
        className={`${props.className} w-full`}
      />
    </>
  )
}
const CustomTextField = React.forwardRef<HTMLDivElement, TextFieldProps>(CustomTextFieldForwardRef)
export default CustomTextField
