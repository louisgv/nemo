import React from 'react';

import styled from "styled-components";

import { Refresh } from "styled-icons/material/Refresh";

export const theme = {
  background: "#f5f8fb",
  // fontFamily: "Helvetica Neue",
  headerBgColor: "#00b0ff",
  headerFontColor: "#fff",
  botBubbleColor: "#00b0ff",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a"
};

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

export const RefreshButton = () => (
  <CircleButton>
    <Refresh onClick={()=>window.location.reload()}/>
  </CircleButton>
);