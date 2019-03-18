import React, { useState } from "react";
import styled from "styled-components";
import { shipIDTypeOptionList, useCaptainProfileState } from "../_data";
import { StyledInput, StyledSubmitButton, StyledSelect, StyledRowForm } from "../_theme";
import { useFormState } from "react-use-form-state";

interface VesselIDFormFields {
  idType: "imo" | "mmsi";
  idString: string;
}

const IDTypeSelect = styled(StyledSelect)`
  width: 4em;
`

const IDInput = styled(StyledInput)`
  width: 10em;
`;

export const VesselIDInput = ({ triggerNextStep, steps }: any) => {
  const [profile, setProfile] = useCaptainProfileState({});

  const options = shipIDTypeOptionList;

  const [disabled, setDisabled] = useState(false);

  const [formState, { text, select }] = useFormState<VesselIDFormFields>({
    idType: "imo"
  });

  return (
    <StyledRowForm
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
      <IDTypeSelect
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
    </StyledRowForm>
  );
};
