import React from "react";
import styled from "styled-components";
import Flag from "react-country-flag";

import Select from "react-styled-select";
import { languages } from "../i18n";

import {CaptainProfile} from './CaptainProfile'

const HeaderContainer = styled.div`
  height: 3.6em;
  background: ${p => p.theme.headerBgColor};
  color: ${p => p.theme.headerFontColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  padding-right: 1em;
  padding-left: 1em;

  h1 {
    font-size: 1.8em;
  }
`;

const StyledSelect = styled(Select)`
  width: 9em;
  margin-left: 1em;
  margin-right: 1em;

  .select-control {
    border-radius: 2em;
    background: #eee;
  }

  .select-input {
    margin-left: 0.5em;
  }

  .select-label {
    color: #000;
  }
`;

export const Header = ({ language, onLanguageChanged }: any) => {
  return (
    <HeaderContainer>
      <h1>Nemo</h1>

      <StyledSelect
        value={language}
        options={languages}
        classes={{
          selectControl: "select-control",
          selectInput: "select-input"
        }}
        valueRenderer={({ value, label }: any) => (
          <div>
            <Flag code={value} svg />{" "}
            <span className="select-label">{label}</span>
          </div>
        )}
        onChange={(lang: string) => {
          onLanguageChanged(lang);
        }}
      />

      <CaptainProfile/>
    </HeaderContainer>
  );
};
