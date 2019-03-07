import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-styled-select";
import { useFormState } from "react-use-form-state";

import { useCaptainProfileState } from "../_data";
import { StyledSubmitButton } from "../_theme";
import { createSelectOptionList } from "../core/utils";

import {
  gearTree,
  gearBaseList,
  gearAbbreviationMap,
  isGearValid,
  getGearId,
} from "../data/gear";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  margin-bottom: 1em;

  .select-control {
    border-radius: 2em;
    background: #eee;
  }

  .select-input {
    margin-left: 0.5em;
  }
`;

const getGearKeyList : any = (gearTreeNode: null | Object) => {
  if (gearTreeNode) {
    const keys = Object.keys(gearTreeNode);

    if (keys.length > 0) {
      return createSelectOptionList(keys);
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const FishingGearInput = ({triggerNextStep}: any) => {
  const [profile, setProfile] = useCaptainProfileState({});

  const [partOne, setPartOne] = useState("");
  const [partTwo, setPartTwo] = useState("");
  const [partThree, setPartThree] = useState("");

  const partOneOptions = createSelectOptionList(gearBaseList);

  const [partTwoOptions, setPartTwoOptions] = useState([]);
  const [partThreeOptions, setPartThreeOptions] = useState([]);

  const [disabled, setDisabled] = useState(false);


  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();

        setDisabled(true);

        console.log({
          partOne,
          partTwo,
          partThree
        })

        const gearId = getGearId(partOne, partTwo, partThree);

        console.log(gearId);
        
        if (!gearId) {
          return console.error("GEAR ID IS INVALID!!!");
        }

        const fishingGearTypeCode = gearAbbreviationMap[gearId];

        setProfile({
            ...profile,
            fishingGearTypeCode
        });

        triggerNextStep();
      }}
    >
      <StyledSelect
        placeholder={"Select Base Gear . . ."}
        onChange={(value: string) => {
          setPartOne(value);

          setPartTwo("");
          setPartTwoOptions(getGearKeyList(gearTree[value]));

          setPartThree("");
          setPartThreeOptions([]);
        }}
        value={partOne}
        disabled={disabled}
        options={partOneOptions}
        classes={{
          selectControl: "select-control",
          selectInput: "select-input"
        }}
      />
      <StyledSelect
        placeholder={"Select Sub-type . . ."}
        onChange={(value: string) => {
          setPartTwo(value);
          setPartThree("");
          setPartThreeOptions(getGearKeyList(gearTree[partOne][value]));
        }}
        value={partTwo}
        disabled={disabled || partTwoOptions.length == 0}
        options={partTwoOptions}
        classes={{
          selectControl: "select-control",
          selectInput: "select-input"
        }}
      />
      <StyledSelect
        clearable
        placeholder={"Optional type . . ."}
        onChange={setPartThree}
        onInputClear={()=>setPartThree('')}
        value={partThree}
        disabled={disabled || partThreeOptions.length == 0}
        options={partThreeOptions}
        classes={{
          selectControl: "select-control",
          selectInput: "select-input"
        }}
      />

      <StyledSubmitButton
        disabled={disabled || !isGearValid(partOne, partTwo, partThree)}
      />
    </StyledForm>
  );
};
