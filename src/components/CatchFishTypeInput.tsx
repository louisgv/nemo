import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-styled-select";
import { fishOptionList, useCatchCacheState } from "../_data";
import { StyledSubmitButton } from "../_theme";

const StyledSelect = styled(Select)`
  width: 85%;

  .select-control {
    border-radius: 2em;
    background: #eee;
  }

  .select-input {
    margin-left: 0.5em;
  }
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;


export const CatchFishTypeInput = ({ triggerNextStep } : any) => {
  const options = fishOptionList;
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(options[0].value);
  const [, setCatchCache] = useCatchCacheState({})
  
  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();
        // console.log(steps);
        // console.log(formState.values);

        setDisabled(true);

        setCatchCache({
          fishKey: value
        })

        triggerNextStep();
      }}
    >
    <StyledSelect
      value={value}
      disabled={disabled}
      options={options}
      onChange={setValue}
      classes={{
        selectControl: "select-control",
        selectInput: "select-input"
      }}
    />

    <StyledSubmitButton disabled={disabled} />
  </StyledForm>
  );
};
