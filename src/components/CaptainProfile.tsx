import React, { useState, useRef } from 'react'
import { useSpring, useChain, config, animated } from 'react-spring'
import styled from 'styled-components'

import { Close } from 'styled-icons/material/Close'
import { useProfileState, localStorageKey } from '../_data'
import { useFormState } from 'react-use-form-state'
import {
  StyledSubmitButton,
  StyledColumnForm,
  StyledButton,
  RowDiv,
  ReviewInput
} from '../_theme'

export const CaptainProfileIcon = () => {
  return <div>Profile Icon</div>
}

const Container = styled(animated.div)`
  position: absolute;

  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;

  background: white;

  cursor: pointer;

  will-change: width, height, opacity;
  z-index: 1001;
  top: 0;
  right: 0;
`

const ProfileIcon = styled(animated.div)`
  border-radius: 100%;

  position: relative;
  width: 36px;
  height: 36px;
  background: pink;

  cursor: pointer;

  z-index: 1000;
`

const CloseProfileModalButton = styled(ProfileIcon)`
  background: white;
  z-index: 1002;
  position: absolute;
  right: 1em;
  top: 1em;
  box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
  svg {
    fill: #ff0081;
  }
`

const ItemContainer = styled(animated.div)`
  margin: 3em 3em;
`

const StyledForm = styled(StyledColumnForm)`
  margin-top: 1em;
`

export const CaptainProfile = () => {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useProfileState({})

  const { completed, ...profileFormRest } = profile

  const [formState, { text }] = useFormState<CaptainProfileReviewFormFields>({
    ...profileFormRest
  })

  const springRef = useRef(null)
  const { size, ...rest } = useSpring({
    ref: springRef,
    // config: config.stiff,
    from: {
      size: '2%',
      opacity: 0
    },
    to: {
      size: open ? '100%' : '2%',
      opacity: open ? 1 : 0
    }
  }) as any

  const transRef = useRef(null)

  const closeButtonRef = useRef(null)

  const closeButtonPopin = useSpring({
    ref: closeButtonRef,
    config: config.stiff,
    from: { opacity: 0, transform: 'scale(0)' },
    to: { opacity: open ? 1 : 0, transform: open ? 'scale(1)' : 'scale(0)' }
  })

  useChain(
    open
      ? [springRef, closeButtonRef, transRef]
      : [closeButtonRef, transRef, springRef],
    [0, open ? 0.1 : 0.6]
  )

  return (
    <>
      <ProfileIcon onClick={() => setOpen(true)} />
      <Container style={{ ...rest, width: size, height: size }}>
        <CloseProfileModalButton
          style={closeButtonPopin}
          onClick={() => setOpen(false)}>
          <Close />
        </CloseProfileModalButton>
        <ItemContainer>
          {/* {transitions.map(({ item, key, props }) => (
            <Item key={key} style={{ ...props, background: item.css }}>

            </Item>
          ))} */}

          <StyledForm
            onSubmit={e => {
              e.preventDefault()

              setProfile({
                ...formState.values,
                completed: true
              })

              setOpen(false)
            }}>
            {Object.keys(formState.values).map(k => (
              <ReviewInput key={k} label={k} {...text(k as any)} />
            ))}

            <RowDiv>
              <StyledButton
                onClick={e => {
                  e.preventDefault()
                  localStorage.removeItem(localStorageKey.chatCache)
                  window.location.reload()
                }}>
                Clear chat cache
              </StyledButton>
              <StyledSubmitButton />
            </RowDiv>
          </StyledForm>
        </ItemContainer>
      </Container>
    </>
  )
}
