import React, { FunctionComponent, HTMLAttributes } from "react"
import styled from "styled-components"

interface IProps extends HTMLAttributes<HTMLDivElement> { }

const LoadingOverlay = styled.div<IProps>`
  align-items: center;
  background-color: "#fff";
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`

const LoadingIndicator = styled.div<IProps>`
  width: 3.2rem;
  height: 3.2rem;
  border: 0.2rem solid ${({ theme }) => theme.palette.primary};
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: 1s loader-03 linear infinite;
  box-sizing: border-box;

  @keyframes loader-03 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoadingOverlayComponent: FunctionComponent<IProps> = () => {
  return (
    <LoadingOverlay>
      <LoadingIndicator />
    </LoadingOverlay>
  )
}

export default LoadingOverlayComponent
