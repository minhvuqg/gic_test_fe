import React, {
  Dispatch,
  FunctionComponent,
  HTMLAttributes,
  SetStateAction
} from "react"
import { createPortal } from "react-dom"
import { Transition, TransitionStatus } from "react-transition-group"
import ModalContainer from "./Container"
import ModalShadow from "./Shadow"

export interface IProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean
  setIsVisible?: Dispatch<SetStateAction<boolean>>
}

const duration = 200

const shadowDefaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}

const shadowTransitionStyles: Partial<Record<TransitionStatus, any>> = {
  entering: { opacity: 0.9 },
  entered: { opacity: 0.9 },
  exiting: { opacity: 0 }
}
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, margin-top ${duration}ms ease-in-out`,
  opacity: 0,
  marginTop: "2.4rem"
}

const transitionStyles: Partial<Record<TransitionStatus, any>> = {
  entering: { opacity: 1, marginTop: "0" },
  entered: { opacity: 1, marginTop: "0" },
  exiting: { opacity: 0, marginTop: "2.4rem" }
}

const Modal: FunctionComponent<IProps> = (props) => {
  const { children, visible, setIsVisible, style } = props

  const close = () => {
    if (setIsVisible) {
      setIsVisible(false)
    }
  }

  return createPortal(
    <Transition
      in={visible}
      timeout={duration}
      unmountOnExit={true}
      onEnter={(node: any) => node.offsetHeight}>
      {(state) => (
        <>
          <ModalShadow
            style={{
              ...shadowDefaultStyle,
              ...shadowTransitionStyles[state]
            }}
            onClick={close}
          />
          <ModalContainer
            style={{
              ...defaultStyle,
              ...style,
              ...transitionStyles[state]
            }}>
            {children}
          </ModalContainer>
        </>
      )}
    </Transition>,
    document.getElementById("modal-root") as HTMLElement
  )
}

export default Modal
