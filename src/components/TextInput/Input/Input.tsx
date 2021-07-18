import { InputHTMLAttributes } from "react"
import styled, { css, StyledProps } from "styled-components"

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  disabled: boolean
  error: boolean
}

const errorMixin = css<StyledProps<IProps>>`
  border: 0.2rem solid ${({ theme }) => theme.palette.alert.error};

  &:focus {
    outline-color: ${({ theme }) => theme.palette.alert.error};
  }
`

const Input = styled.input<IProps>`
  background-color: ${({ theme }) => theme.palette.background.light};
  border: 0.1rem solid ${({ theme }) => theme.palette.border};
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.text.dark};
  display: block;
  padding: 0.8rem 1.6rem;
  width: 100%;

  &:focus {
    outline-color: ${({ theme }) => theme.palette.primary};
  }

  ${({ error }) => (error ? errorMixin : "")};

  &::placeholder {
    color: ${({ theme }) => theme.palette.text.darkDimmed};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.background.light};
    border-color: ${({ theme }) => theme.palette.background.disabled};
    color: ${({ theme }) => theme.palette.text.darkDimmed};

    &::placeholder {
      color: ${({ theme }) => theme.palette.disabled};
    }
  }
`

export default Input
