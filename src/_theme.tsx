import React from "react";

import styled from "styled-components";

import Select from "react-styled-select";
import { Refresh } from "@styled-icons/material/Refresh";
import { Check } from "@styled-icons/material/Check";

export const theme = {
  background: "#f5f8fb",
  // fontFamily: "Helvetica Neue",
  headerBgColor: "#00b0ff",
  headerFontColor: "#fff",
  botBubbleColor: "#00b0ff",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
  dangerColor: "red"
};

const CircleButton = styled.button`
  width: 4em;
  height: 4em;
  border-radius: 50%;
  position: absolute;
  border: none;
  bottom: 5em;
  z-index: 1000;
  background: ${prop => prop.theme.headerBgColor};
  color: ${prop => prop.theme.headerFontColor};
  button:focus {
    outline: none;
  }
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const RefreshButton = () => (
  <CircleButton>
    <Refresh onClick={() => window.location.reload()} />
  </CircleButton>
);

export const StyledInput = styled.input`
  width: 80px;
  display: inline-flex;
  font-weight: bold;
  border: none;
  font-size: 1em;
  border-bottom: 1px black solid;
  outline: none;
`;

export const LabeledInput = styled(({ className, label, ...rest }: any) => (
  <div className={className}>
    <label>{label}</label>
    <StyledInput {...rest} />
  </div>
))`
  display: inline-flex;
  width: 100%;
  label {
    width: 25%;
  }
  input {
    width: 75%;
    :disabled {
      cursor: not-allowed;
    }
  }
`;

export const Divider = styled.hr`
  width: 80%;
`

export const ReviewInput = styled(LabeledInput)`
  width: 100%;
  margin-bottom: 0.5em;

  label {
    color: black;
    width: 50%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  input {
    width: 50%;
  }
`;

interface BackgroundButtonProps {
  readonly background?: string;
};

export const StyledButton = styled.button<BackgroundButtonProps>`
  cursor: pointer;
  border: none;
  background: ${p => p.background || p.theme.botBubbleColor};
  color: ${p => p.theme.botFontColor};
  height: 30px;

  :hover {
    opacity: 0.7;
  }

  :disabled {
    background: ${p => p.theme.userFontColor};
  }

  :disabled:hover {
    cursor: not-allowed;
    opacity: 1;
  }
`;

export const FillButton = styled(StyledButton)`
  margin-top: 1em;
  width: 100%;
`

export const StyledSubmitButton = styled((props: any) => (
  <StyledButton {...props}>
    <Check />
  </StyledButton>
))`
  width: 30px;
  height: 30px;

  svg {
    fill: ${p => p.theme.botFontColor};
  }
`;

export const StyledColumnForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StyledRowForm = styled(StyledColumnForm)`
  flex-direction: row;
`;

export const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const StyledSelect = styled(Select)`
  .select-control {
    border-radius: 2em;
    background: #eee;
  }

  .select-input {
    margin-left: 0.5em;
  }
`;

export const StyledLabel = styled.label`
  font-weight: 700;
`
