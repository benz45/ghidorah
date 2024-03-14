import { InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material'
import React from 'react'

type AllowedLabel = string | number | Date

type AllowedValue = string | number

interface ICustomSelect<Value> {
  control: {
    id: string
    label: string
    value: Value
    mapToValue: (argsOption: Value) => AllowedValue | undefined
    mapToLabel: (argsOption: Value) => AllowedLabel | undefined
    valueOptions: readonly Value[] | undefined
    onSelectChanged?: (argsNewValue: string | NonNullable<Value>) => void
    isError: boolean
  }
}

export default function CustomSelect<Value>(props: ICustomSelect<Value>) {
  const isAllowedLabel = (v: any): v is AllowedLabel => chcekIsAllowed(v)
  const isAllowedValue = (v: any): v is AllowedValue => chcekIsAllowed(v)

  const chcekIsAllowed = (v: any) => typeof v === 'string' || typeof v === 'number' || v instanceof Date

  const [onFocus, setOnFocus] = React.useState<boolean>(false)

  const toLabel = (option: Value | undefined): AllowedLabel | undefined => {
    if (option && props.control.mapToLabel) {
      return props.control.mapToLabel(option)
    }
    return checkIsAllowedLabel(option)
  }

  const toValue = (option: Value | undefined): AllowedValue | undefined => {
    if (option && props.control.mapToValue) {
      return props.control.mapToValue(option)
    }
    return checkIsAllowedValue(option)
  }

  const checkIsAllowedLabel = (option: Value | undefined) => {
    if (isAllowedLabel(option)) {
      return option
    }
    return String(option)
  }

  const checkIsAllowedValue = (option: Value | undefined) => {
    if (isAllowedValue(option)) {
      return option
    }
    return String(option)
  }

  const handleChange = (e: SelectChangeEvent<NonNullable<Value>>) => {
    const value = e.target.value
    props.control.onSelectChanged?.(value)
    setOnFocus(false)
  }

  const options: () => React.JSX.Element[] = () => {
    if (props.control.valueOptions) {
      return props.control.valueOptions?.map((valueOption, index) => {
        const value = toValue(valueOption)
        const lebel = toLabel(valueOption)
        return (
          <MenuItem id={`${props.control.id}-${index}`} key={`${props.control.id}-${index}`} value={value}>
            {`${lebel}`}
          </MenuItem>
        )
      })
    }
    return [<></>]
  }
  return (
    <>
      <InputLabel id={`${props.control.id}-label`}>{props.control.label}</InputLabel>
      <Select
        id={props.control.id}
        labelId={`${props.control.id}-label`}
        label={props.control.label}
        value={props.control.value}
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        onChange={e => handleChange(e as SelectChangeEvent<NonNullable<Value>>)}
        error={props.control.isError}
      >
        {options()}
      </Select>
    </>
  )
}
