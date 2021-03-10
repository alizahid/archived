import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`

const Container = styled.div`
  background: #fff;
  border-radius: 0.25em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.125);
  overflow: hidden;
`

const Modal: FunctionComponent = ({ children }) => {
  return (
    <Overlay>
      <Container>{children}</Container>
    </Overlay>
  )
}

export default Modal
