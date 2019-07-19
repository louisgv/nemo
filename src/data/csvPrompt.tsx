import React from "react";
import { createPromptArray } from "../core/utils";
import { CsvFileInput } from "../components/CsvFileInput";

const promptOrder = [
  "prompt_csv",

  "comp_csvInput",
  
  "prompt_anotherOne"
];

const promptStructure = {
  comp_csvInput: {
    component: <CsvFileInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  }
} as any;

export const createCsvPrompt = () =>
  createPromptArray(promptOrder, promptStructure);
