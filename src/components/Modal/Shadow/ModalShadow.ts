import {HTMLAttributes} from "react"
import styled from "styled-components"

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const ModalShadow = styled.div<IProps>`
  background-color: ${({theme}) => theme.palette.primary};
  bottom: 0;
  left: 0;
  opacity: 0.9;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 25;
`

export default ModalShadow
