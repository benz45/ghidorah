import Stack from '@mui/material/Stack'
import React from 'react'

export default function CustomButton(props: {
  text: string
  type?: 'button' | 'reset' | 'submit'
  variant?: 'sorf' | 'contained'
  className?: string
  onClick?: () => void
  size?: 'sm' | 'lg' | 'xl'
}) {
  let className =
    'rounded-lg p-4 font-semibold focus:ring-offset-2 focus:ring-2 min-w-32 transition duration-300 ease-in-out'
  if (props.variant == undefined || props.variant == 'contained') {
    className = `${className} bg-primary text-white hover:bg-primary-dark`
  } else if (props.variant === 'sorf') {
    className = `${className} bg-primary-50 text-primary hover:bg-primary-70 focus:ring-primary-100`
  }
  return (
    <button
      type={props.type ?? 'button'}
      className={`${className} ${props.className}`}
      onClick={() => props.onClick?.()}
    >
      {props.text}
    </button>
    // <Stack spacing={2} direction="row">
    // </Stack>
  )
}
