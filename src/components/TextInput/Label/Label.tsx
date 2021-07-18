import { InputHTMLAttributes } from "react"
import styled from "styled-components"
import { CUSTOM_THEME as theme } from "src/constants/theme"

export interface IProps extends InputHTMLAttributes<HTMLLabelElement> {
  disabled: boolean
}

const Label = styled.label<IProps>`
  color: ${({ disabled }) =>
    disabled ? theme.palette.text.darkDimmed : theme.palette.text.dark};
  display: inline-block;
  margin-bottom: 0.8rem;
  width: 100%;
`

export default Label
