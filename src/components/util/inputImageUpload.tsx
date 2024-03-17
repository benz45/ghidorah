import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import React from 'react'
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus'
import FilterHdrIcon from '@mui/icons-material/FilterHdr'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export default function InputImageUpload() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      className="h-36 w-36 rounded-lg"
      tabIndex={-1}
      sx={{ border: 2, borderRadius: 4 }}
    >
      <PhotoCameraIcon />
      <VisuallyHiddenInput type="file" />
    </Button>
  )
}
