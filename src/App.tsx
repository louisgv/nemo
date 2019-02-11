import React, { Component } from "react";

import ChatBot from "react-simple-chatbot";

import styled, { ThemeProvider } from "styled-components";
import { theme } from "./_theme";
import {  strings, localStorageKey, languages, createSteps } from "./_data";
import { Header } from "./components/Header";

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
`;

export default class App extends Component {

  state={
    language: localStorage.getItem(localStorageKey.savedLanguage) || languages[0].value
  }

  handleLanguageChanged =(newLanguage:string)=> {
    localStorage.setItem(localStorageKey.savedLanguage, newLanguage)

    window.location.reload()
  }

  render() {
    strings.setLanguage(this.state.language);

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <StyledChatBot
            headerComponent={<Header language={this.state.language} onLanguageChanged={this.handleLanguageChanged}/>}
            botAvatar={"assets/avatar.png"}
            userAvatar={"assets/captain.png"}
            placeholder={strings.placeholder}
            userDelay={0}
            steps={createSteps()}
          />
        </ThemeProvider>
      </Container>
    );
  }
}
