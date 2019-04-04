import React from "react";
import { createOptionLabel, createPromptArray } from "../core/utils";

const promptOrder = [
  "prompt_test",


  "prompt_anotherOne"
];

const promptStructure = {
 
} as any;

export const createTestPrompt = () =>
  createPromptArray(promptOrder, promptStructure);
