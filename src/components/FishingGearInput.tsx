import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-styled-select";
import { useFormState } from "react-use-form-state";

import { useCaptainProfileState } from "../_data";
import { StyledSubmitButton } from "../_theme";
import { createSelectOptionList } from "../core/utils";

import { gearTree, gearBaseList } from "../data/gear";

interface VesselIDFormFields {
  idType: ["imo", "mmsi"];
  idString: string;
}

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledSelect = styled(Select)`
  width: 25%;

  .select-control {
    border-radius: 2em;
    background: #eee;
  }

  .select-input {
    margin-left: 0.5em;
  }
`;

export const FishingGearInput = () => {
  const [profile, setProfile] = useCaptainProfileState({});

  const [partOne, setPartOne] = useState("");
  const [partTwo, setPartTwo] = useState("");
  const [partThree, setPartThree] = useState("");

  const partOneOptions = createSelectOptionList(gearBaseList);

  const [disabled] = useState(false);

  const [, { select }] = useFormState<VesselIDFormFields>();

  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();

        // setDisabled(true);

        // setProfile({
        //     ...profile,
        // });

        // triggerNextStep();
      }}
    >
      <StyledSelect
        onChange={(value: string) => console.log(value)}
        value={partOne}
        disabled={disabled}
        options={partOneOptions}
        classes={{
          selectControl: "select-control",
          selectInput: "select-input"
        }}
      />
      <StyledSelect
        onChange={(value: string) => console.log(value)}
        value={partTwo}
        disabled={disabled || !partOne}
        options={partOneOptions}
        classes={{
          selectControl: "select-control",
          selectInput: "select-input"
        }}
      />
      <StyledSelect
        onChange={(value: string) => console.log(value)}
        value={partThree}
        disabled={disabled || !partOne || !partTwo}
        options={partOneOptions}
        classes={{
          selectControl: "select-control",
          selectInput: "select-input"
        }}
      />

      <StyledSubmitButton disabled={disabled || !partOne || !partTwo} />
    </StyledForm>
  );
};
