import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-styled-select";
import { getFishSelectList, strings } from "../_data";

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
  const fishes = getFishSelectList();
  const [disabled, setDisabled] = useState(false);
  const [fish, setFish] = useState(fishes[0].value);

  return (
    <StyledSelect
      value={fish}
      disabled={disabled}
      options={fishes}
      virtualized
      classes={{
        selectControl: "select-control",
        selectInput: "select-input"
      }}
      onChange={(fish: string) => {
        setFish(fish);
        setDisabled(true);
        triggerNextStep({
          value: strings[fish]
        });
      }}
    />
  );
};
