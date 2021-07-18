import { HTMLAttributes } from "react"
import styled from "styled-components"

interface IProps extends HTMLAttributes<HTMLDivElement> { }

const ModalContainer = styled.div<IProps>`
  background-color: ${({ theme }) => theme.palette.background.white};
  border: 0.1rem solid ${({ theme }) => theme.palette.border};
  border-radius: 0.8rem;
  left: 50%;
  max-height: calc(var(--vh, 1vh) * 100 - 9.6rem);
  max-width: 80rem;
  overflow-y: auto;
  padding: 1.6rem;
  position: fixed;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: fit-content;
  min-width: 30rem;
  z-index: 30;

  button {
    margin-right: 1rem;
    float: right;
  }

`

export default ModalContainer
