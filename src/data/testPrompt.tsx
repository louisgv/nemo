import React from "react";
import { createOptionLabel, createPromptArray } from "../core/utils";
import { DappSendInput } from "../components/DappSendInput";
import { DappReceiveInput } from "../components/DappReceiveInput";
import { PrintValue } from "../components/PrintValue";

const promptOrder = [
  "prompt_test",

  "comp_test",
  "comp_test_1",

  "prompt_anotherOne"
];

const promptStructure = {
  comp_test: {
    component: <DappSendInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  },
  comp_test_1: {
    component: <DappReceiveInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  }
} as any;

export const createTestPrompt = () =>
  createPromptArray(promptOrder, promptStructure);
