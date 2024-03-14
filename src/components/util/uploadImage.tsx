import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
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
      className="h-36 w-36"
      tabIndex={-1}
      sx={{ border: 2 }}
    >
      <AddPhotoAlternateIcon />
      <VisuallyHiddenInput type="file" />
    </Button>
  )
}
