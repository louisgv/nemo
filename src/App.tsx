import React, { Component } from "react";

import ChatBot from "react-simple-chatbot";

import styled, { ThemeProvider } from "styled-components";
import { Refresh } from "styled-icons/material/Refresh";

import { Header } from "./components/Header";

import { theme } from "./_theme";
import { strings, localStorageKey, languages, createSteps } from "./_data";

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
`;

const CircleButton = styled.button`
  width: 4em;
  height: 4em;
  border-radius: 50%;
  position: absolute;
  border: none;
  bottom: 5em;
  z-index: 1000;
  background: ${prop=>prop.theme.headerBgColor};
  color: ${prop=>prop.theme.headerFontColor};
  button:focus {
    outline: none;
  }
`;

const RefreshButton = () => (
  <CircleButton>
    <Refresh onClick={()=>window.location.reload()}/>
  </CircleButton>
);

export default class App extends Component {
  state = {
    language:
      localStorage.getItem(localStorageKey.savedLanguage) || languages[0].value,
    hasEnded: false
  };

  handleLanguageChanged = (newLanguage: string) => {
    localStorage.setItem(localStorageKey.savedLanguage, newLanguage);
    localStorage.removeItem("rsc_cache");
    window.location.reload();
  };

  handleEnd = ({ steps, values }: any) => {
    this.setState({
      hasEnded: true
    });
  };

  render() {
    strings.setLanguage(this.state.language);

    const steps = createSteps();

    return (
      <ThemeProvider theme={theme}>
        <Container>
          {this.state.hasEnded && <RefreshButton />}
          <StyledChatBot
            { ... this.props}
            headerComponent={
              <Header
                language={this.state.language}
                onLanguageChanged={this.handleLanguageChanged}
              />
            }
            botAvatar={"assets/avatar.png"}
            hideUserAvatar
            cache
            userAvatar={"assets/captain.png"}
            placeholder={strings.placeholder}
            userDelay={0}
            steps={steps}
            handleEnd={this.handleEnd}
          />
        </Container>
      </ThemeProvider>
    );
  }
}
