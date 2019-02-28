import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-styled-select";
import { getFishSelectList, fao3AMap } from "../_data";
import { RefreshButton } from "../_theme";

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

export const CatchSelector = ({ triggerNextStep, steps } : any) => {

  const fishStore = JSON.parse(localStorage.getItem("FISH_STORE") as any) || { catches: [] };

  if(!fishStore.catches[0]) {
    setTimeout(()=>{
      localStorage.removeItem("rsc_cache");
      window.location.reload();
    }, 3000)
    return (
      <div>
        <b>
          ⚠ No Fish Available ⚠ 
        </b>
        <br/>
        <i>You need to report your catch first</i>
        <br/>
        Auto Refresh in 3... 2... 1...
      </div>
    )
  }

  const [disabled, setDisabled] = useState(false);
  const [fish, setFish] = useState(fishStore.catches[0].value);

  return (
    <StyledSelect
      value={fish}
      disabled={disabled}
      options={fishStore.catches}
      virtualized
      classes={{
        selectControl: "select-control",
        selectInput: "select-input"
      }}
      onChange={(fish: string) => {
        setFish(fish);
        setDisabled(true);
        triggerNextStep({
          value: fish
        });
      }}
    />
  );
};
