import React, { Component, useState } from "react";

import ChatBot from "react-simple-chatbot";

import styled, { ThemeProvider } from "styled-components";

import { Header } from "./components/Header";

import { theme, RefreshButton } from "./_theme";
import { localStorageKey, createSteps, useLanguageState, isProfileSetup } from "./_data";
import { sendCatchEvent } from "./api";
import { strings, languages } from "./i18n";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledChatBot = styled(ChatBot)`
  width: 90%;
  height: 90%;
  .rsc-os-options {
    display: flex;
    flex-flow: wrap;
    flex-direction: row-reverse;
  }

  .rsc-os-option-element {
    display: flex;
    height: 1em;
  }
`;


export const App = ({props} : any) => {
  const [hasEnded, setHasEnded] = useState(false)
  
  const [language, setLanguage] = useLanguageState(languages[0].value)

  strings.setLanguage(language);

  const steps = createSteps();

  const handleLanguageChanged =(newLanguage: string)=> {
    if (language === newLanguage) return;

    setLanguage(newLanguage);
    
    localStorage.removeItem(localStorageKey.chatCache);
    
    window.location.reload();
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {hasEnded && <RefreshButton />}
        <StyledChatBot
          { ... props}
          headerComponent={
            <Header
              key={language}
              language={language}
              onLanguageChanged={handleLanguageChanged}
            />
          }
          enableMobileAutoFocus
          botAvatar={"assets/avatar.png"}
          hideUserAvatar
          cache={isProfileSetup()}
          cacheName={localStorageKey.chatCache}
          userAvatar={"assets/captain.png"}
          placeholder={strings.placeholder}
          userDelay={0}
          steps={steps}
          handleEnd={()=> setHasEnded(true)}
        />
      </Container>
    </ThemeProvider>
  ) 
}