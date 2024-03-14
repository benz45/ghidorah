import { LoadingButton, LoadingButtonOwnProps } from '@mui/lab'

export default function CustomButton(props: LoadingButtonOwnProps & { text: string }) {
  return (
    <LoadingButton variant="contained" {...props} size="large">
      {props.text}
    </LoadingButton>
  )
}
