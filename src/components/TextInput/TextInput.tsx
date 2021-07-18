import React, { FunctionComponent, InputHTMLAttributes, ReactNode } from "react"
import _ from "lodash"
import Input from "./Input"
import Label from "./Label"
import TextHint from "./TextHint"

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  disabled?: boolean
  error?: boolean
  placeholder?: string
  textHint?: string
  id: string
}

const TextInput: FunctionComponent<IProps> = (props) => {
  const {
    label,
    error,
    disabled,
    placeholder,
    className,
    id,
    value,
    onChange,
    textHint,
    style,
    ...rest
  } = props
  const disabledValue = disabled || false
  const errorValue = error || false

  return (
    <div className={className} style={style} {...rest}>
      {_.isEmpty(label) ? null : (
        <Label disabled={disabledValue} htmlFor={id}>
          {label}
        </Label>
      )}
      <Input
        id={id}
        name={id}
        error={errorValue}
        disabled={disabledValue}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {_.isEmpty(textHint) ? null : (
        <TextHint error={error} disabled={disabledValue}>
          {textHint}
        </TextHint>
      )}
    </div>
  )
}

TextInput.displayName = "TextInput"

export default TextInput
