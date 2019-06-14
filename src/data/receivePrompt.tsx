import React from "react";
import { createOptionLabel, createPromptArray } from "../core/utils";
import { DappProducerReceiveInput } from "../components/DappProducerReceiveInput";

const promptOrder = [
  "prompt_receive",

  "form_dappProducerReceiveInput",

  "prompt_anotherOne"
];

const promptStructure = {
  "form_dappProducerReceiveInput": {
    component: <DappProducerReceiveInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  }
} as any;

export const createReceivePrompt = () =>
  createPromptArray(promptOrder, promptStructure);
