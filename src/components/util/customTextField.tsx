import React from 'react'
import { TextField, TextFieldProps, styled } from '@mui/material'

const CustomTextFieldForwardRef = (props: TextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <>
      <TextField
        {...props}
        ref={ref}
        variant="outlined"
        value={props.value ?? ''}
        className={`${props.className} w-full  border-none border-0`}
      />
    </>
  )
}

const CustomTextField = React.forwardRef<HTMLDivElement, TextFieldProps>(CustomTextFieldForwardRef)

const CssTextField = styled(CustomTextField)({
  '& label.Mui-focused': {
    color: '#5770FD'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#eaebff',
      backgroundColor: '#F3F7FF'
    },
    '&:hover fieldset': {
      borderColor: '#c9cdfe'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5770FD'
    }
  }
})
export default CssTextField
