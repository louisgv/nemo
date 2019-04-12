import React from "react";
import { createOptionLabel, createPromptArray } from "../core/utils";
import { DappSendInput } from "../components/DappSendInput";

const promptOrder = [
  "prompt_test",

  "comp_test",

  "prompt_anotherOne"
];

const promptStructure = {
  comp_test: {
    component: <DappSendInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  }

} as any;

export const createTestPrompt = () =>
  createPromptArray(promptOrder, promptStructure);
