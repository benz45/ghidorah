import { LoadingButton, LoadingButtonProps } from '@mui/lab'

export default function CustomLoadingButton(props: LoadingButtonProps & { text: string }) {
  return (
    <LoadingButton variant="contained" {...props} size="large">
      {props.text}
    </LoadingButton>
  )
}
