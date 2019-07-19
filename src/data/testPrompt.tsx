import React from "react";
import { createPromptArray } from "../core/utils";
import { CsvFileInput } from "../components/CsvFileInput";

const promptOrder = [
  "prompt_test",

  "comp_test",
  
  "prompt_anotherOne"
];

const promptStructure = {
  comp_test: {
    component: <CsvFileInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  }
} as any;

export const createTestPrompt = () =>
  createPromptArray(promptOrder, promptStructure);
