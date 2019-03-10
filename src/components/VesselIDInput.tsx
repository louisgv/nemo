import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-styled-select";
import { shipIDTypeOptionList, useCaptainProfileState } from "../_data";
import { StyledInput, StyledSubmitButton } from "../_theme";
import { useFormState } from "react-use-form-state";

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
  width: 4em;

  .select-control {
    border-radius: 2em;
    background: #eee;
  }

  .select-input {
    margin-left: 0.5em;
  }
`;

const IDInput = styled(StyledInput)`
  width: 10em;
`;

export const VesselIDInput = ({ triggerNextStep, steps }: any) => {
  const [profile, setProfile] = useCaptainProfileState({});

  const options = shipIDTypeOptionList;

  const [disabled, setDisabled] = useState(false);

  const [formState, { text, select }] = useFormState<VesselIDFormFields>();

  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();
        // console.log(steps);
        // console.log(formState.values);

        setDisabled(true);

        setProfile({
            ...profile,
            vessel: {
              name: steps.add_vesselName.value,
              ...formState.values
            }
        });

        triggerNextStep();
      }}
    >
      <StyledSelect
        onChange={(value:string) => select("idType").onChange({target:{value}})}
        value={select("idType").value}
        disabled={disabled}
        options={options}
        classes={{
          selectControl: "select-control",
          selectInput: "select-input"
        }}
      />

      <IDInput disabled={disabled} {...text('idString')}/>
      <StyledSubmitButton disabled={disabled} />
    </StyledForm>
  );
};
