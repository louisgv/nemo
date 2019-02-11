import React, { Component } from "react";

import ChatBot from "react-simple-chatbot";

import styled, { ThemeProvider } from "styled-components";
import { theme } from "./_theme";
import { steps, strings, localStorageKey, languages, savedLanguage } from "./_data";
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

console.log(strings.getLanguage())
export default class App extends Component {

  state={
    language: savedLanguage
  }

  handleLanguageChanged =(newLanguage:string)=> {
    localStorage.setItem(localStorageKey.savedLanguage, newLanguage)

    window.location.reload()
  }

  render() {
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <StyledChatBot
            headerComponent={<Header language={this.state.language} onLanguageChanged={this.handleLanguageChanged}/>}
            botAvatar={"assets/avatar.png"}
            userAvatar={"assets/captain.png"}
            placeholder={strings.placeholder}
            userDelay={0}
            steps={steps}
            recognitionLang={strings.getLanguage()}
          />
        </ThemeProvider>
      </Container>
    );
  }
}
