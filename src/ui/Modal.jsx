import styled from "styled-components";
import { FaTimes } from 'react-icons/fa';
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import useCloseCabinForm from "../hooks/useCloseCabinForm";


const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  };
`

const ModalContext = createContext()

function Modal({children}) {

  const [openModalName, setOpenModalName] = useState('')
  const close = () => setOpenModalName('')

  return (
    <ModalContext.Provider value={{openModalName, close, setOpenModalName}} >
      {/* {cloneElement(children, {onClose: close})} */}
      {children}
    </ModalContext.Provider>
  )
}

function Open({children, opens: openName}) {
  const { setOpenModalName } = useContext(ModalContext)
  return cloneElement(children, {onClick: () => setOpenModalName(openName)})
}

function Window({ children, name }) {
  const { close, openModalName } = useContext(ModalContext)
	
  const ref = useCloseCabinForm(close)

  if (name !== openModalName) return null

  return createPortal(
  <Overlay>
    <StyledModal ref={ref}>
    <Button onClick={() => {
      close(), cloneElement(children, {onClose: close})
      }}><FaTimes /></Button>
      <div>
      {cloneElement(children, {onClose: close})}
        {/* {children} */}
      </div>
    </StyledModal>
  </Overlay>, document.body
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
