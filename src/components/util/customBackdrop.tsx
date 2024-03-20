'use client'
import { Backdrop } from '@mui/material'
import React, { Ref, useImperativeHandle } from 'react'
interface InitCustomBackdropState {
  setContent?: (content: React.JSX.Element) => void
  setOpen?: (isOpen: boolean) => void
}

interface BackdropComponentRefFuntion {
  setOpen: (isOpen: boolean) => void
  setContent: (content: React.JSX.Element) => void
}

const initState: InitCustomBackdropState = {}

const ContextCustomBackdrop = React.createContext<InitCustomBackdropState>(initState)

export default function CustomBackdrop(props: { children: React.ReactNode }) {
  const openRef = React.useRef<BackdropComponentRefFuntion>(null)

  const setContent = (content: React.JSX.Element) => {
    openRef.current?.setContent(content)
  }

  const setOpen = (isOpen: boolean) => {
    openRef.current?.setOpen(isOpen)
  }

  return (
    <ContextCustomBackdrop.Provider value={{ setContent, setOpen }}>
      <BackdropComponent ref={openRef} />
      {props.children}
    </ContextCustomBackdrop.Provider>
  )
}

const BackdropComponent = React.forwardRef((props: {}, ref: Ref<BackdropComponentRefFuntion>) => {
  const [open, _setOpen] = React.useState(false)
  const [content, _setContent] = React.useState<React.JSX.Element>(<></>)

  useImperativeHandle(ref, () => ({ setOpen: _setOpen, setContent: _setContent }))

  return (
    <Backdrop sx={{ zIndex: theme => theme.zIndex.drawer + 1 }} open={open}>
      <div className="flex flex-col w-96 h-56 rounded-lg bg-white justify-center items-center p-10">{content}</div>
    </Backdrop>
  )
})
