import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-styled-select";
import { fao3AMap, fishes, fishOptionList } from "../_data";

const StyledSelect = styled(Select)`
  width: 100%;

  .select-control {
    border-radius: 2em;
    background: #eee;
  }

  .select-input {
    margin-left: 0.5em;
  }
`;

export const FishSelector = ({ triggerNextStep, steps } : any) => {
  const options = fishOptionList;
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(options[0].value);

  return (
    <StyledSelect
      value={value}
      disabled={disabled}
      options={options}
      classes={{
        selectControl: "select-control",
        selectInput: "select-input"
      }}
      onChange={(fish: string) => {
        setValue(fish);
        setDisabled(true);
        triggerNextStep({
          value: fish
        });
      }}
    />
  );
};
