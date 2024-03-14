import { DetailedHTMLProps, HTMLAttributes } from 'react'

function TextHover(
  props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & { children: React.ReactNode }
) {
  return (
    <span
      {...props}
      className={`${props.className} hover:opacity-50 cursor-pointer transition ease-in-out duration-300`}
    >
      {props.children}
    </span>
  )
}

export default TextHover
