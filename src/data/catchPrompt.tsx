import React from 'react'
import { FishSelector } from "../components/FishSelector";
import { numberValidator, appendTrigger, createOptionLabel } from "../core/utils";
import { FishDataConfirm } from "../components/FishDataConfirm";

const catchPromptOrder = [
    "prompt_catch",
    "add_catch",
    "prompt_quantity",
    "add_quantity",
    "prompt_preservation",
    "add_preservation",
    "prompt_catchCongrat",
    "prompt_anotherOne"
  ];
  
export  const createCatchPrompt = () =>
    [
      {
        id: `prompt_catch`,
        hideInput: true
      },
      {
        id: `add_catch`,
        component: <FishSelector />,
        hideInput: true,
        replace: false,
        waitAction: true
      },
      {
        id: `prompt_quantity`,
        hideInput: true
      },
      {
        id: `add_quantity`,
        user: true,
        validator: numberValidator
      },
      {
        id: `prompt_preservation`,
        hideInput: true
      },
      {
        id: `add_preservation`,
        hideInput: true,
        options: ["chilled", "salted", "fresh"].map(createOptionLabel)
      },
      {
        id: `prompt_catchCongrat`,
        component: <FishDataConfirm />
      }
    ].map((p: any, i) => appendTrigger(p, i, catchPromptOrder));
  
  