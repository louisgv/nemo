import React, { useState } from "react";
import styled from "styled-components";

import {
  StyledColumn,
  Divider
} from "../_theme";

const debug = require("debug")("PrintValue");

const Container = styled(StyledColumn)`
  word-break: break-word;
  margin: 0.5em;
`;

export const PrintValue = ({ triggerNextStep, previousStep, label }: any = {label: 'Result'}) => {
  
  debug(previousStep)

  const {value} = previousStep

  return (
    <Container>
      <label>
        {label}
      </label>
      <Divider/>
      {value}
    </Container>
  );
};
