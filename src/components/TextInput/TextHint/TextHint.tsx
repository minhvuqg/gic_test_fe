import { InputHTMLAttributes } from "react"
import styled, { css, StyledProps } from "styled-components"
import Label from "../Label"

export interface IProps extends InputHTMLAttributes<HTMLLabelElement> {
  disabled: boolean
  error: boolean
}

const disabledMixin = css<StyledProps<IProps>>`
  color: ${({ theme }) => theme.palette.disabled};
`

const errorMixin = css<StyledProps<IProps>>`
  color: ${({ theme }) => theme.palette.alert.error};
`

const TextHint = styled(Label as any)`
  color: ${({ theme }) => theme.palette.text.darkDimmed};
  margin: 0.8rem 0;

  ${({ error }) => (error ? errorMixin : "")};
  ${({ disabled }) => (disabled ? disabledMixin : "")};
`

export default TextHint
