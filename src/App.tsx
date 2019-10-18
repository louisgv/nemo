import React, { useState } from 'react'

import ChatBot from 'react-simple-chatbot'

import styled, { ThemeProvider } from 'styled-components'

import { Header } from './components/Header'

import { theme, RefreshButton } from './_theme'
import {
  localStorageKey,
  createSteps,
  useLanguageState,
  useProfileState
} from './_data'
import { strings, languages } from './i18n'

import { version, repository } from '../package.json'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const StyledChatBot = styled(ChatBot)`
  width: 90%;
  height: 90%;

  .rsc-container {
    width: 100%;
    height: 100%;
  }

  .rsc-content {
    max-height: 50%;
  }

  .rsc-os-options {
    display: flex;
    flex-flow: wrap;
    flex-direction: row-reverse;
  }

  .rsc-os-option-element {
    display: flex;
    height: 3em;
    justify-content: center;
    align-items: center;
  }
`

const VersionContainer = styled.a`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 10px;
  opacity: 0.7;
`

export const App = ({ props }: any) => {
  const [hasEnded, setHasEnded] = useState(false)

  const [language, setLanguage] = useLanguageState(languages[0].value)

  const [profile] = useProfileState({ completed: false })
  const isProfileSetup = !!profile.completed

  strings.setLanguage(language)

  const steps = createSteps(isProfileSetup)

  const handleLanguageChanged = (newLanguage: string) => {
    if (language === newLanguage) return

    setLanguage(newLanguage)

    localStorage.removeItem(localStorageKey.chatCache)

    window.location.reload()
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {hasEnded && <RefreshButton />}
        <VersionContainer
          href={repository}
          target="_blank"
          rel="noopener noreferrer">
          nemo@{version}
        </VersionContainer>
        <StyledChatBot
          {...props}
          headerComponent={
            <Header
              key={language}
              language={language}
              onLanguageChanged={handleLanguageChanged}
            />
          }
          enableMobileAutoFocus
          botAvatar={'assets/avatar.png'}
          hideUserAvatar
          cache={isProfileSetup}
          cacheName={localStorageKey.chatCache}
          userAvatar={'assets/captain.png'}
          placeholder={strings.placeholder}
          userDelay={0}
          steps={steps}
          handleEnd={() => setHasEnded(true)}
        />
      </Container>
    </ThemeProvider>
  )
}
