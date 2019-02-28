import React, { Component, useState } from "react";

import ChatBot from "react-simple-chatbot";

import styled, { ThemeProvider } from "styled-components";

import { Header } from "./components/Header";

import { theme, RefreshButton } from "./_theme";
import { localStorageKey, createSteps } from "./_data";
import { sendCatchEvent } from "./api";
import { strings, languages } from "./i18n";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  flex-direction: column;
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

const handleLanguageChanged =(newLanguage: string)=> {
  localStorage.setItem(localStorageKey.savedLanguage, newLanguage);
  localStorage.removeItem("rsc_cache");
  window.location.reload();
}

export const App = ({props} : any) => {
  const [hasEnded, setHasEnded] = useState(false)

  const language = localStorage.getItem(localStorageKey.savedLanguage) || languages[0].value;
  strings.setLanguage(language);
  const steps = createSteps();

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
          botAvatar={"assets/avatar.png"}
          hideUserAvatar
          cache
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