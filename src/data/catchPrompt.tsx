import React from "react";
import { CatchFishTypeInput } from "../components/CatchFishTypeInput";
import { createOptionLabel, createPromptArray } from "../core/utils";
import { FishDataConfirm } from "../components/FishDataConfirm";

import { CatchQuantityInput } from "../components/CatchQuantityInput";
import { CatchDurationInput } from "../components/CatchDurationInput";
import { CatchReview } from "../components/CatchReview";

const promptOrder = [
  "prompt_catch",

  "prompt_catchFishType",
  "add_catchFishType",

  "prompt_catchArea",
  "add_catchArea",

  "prompt_catchDuration",
  "add_catchDuration",

  "prompt_catchQuantity",
  "add_catchQuantity",

  "prompt_catchQuantityListDone",
  "add_catchQuantityDone",

  // "prompt_preservation",
  // "add_preservation",
  "prompt_catchReview",
  "add_catchReview",

  "prompt_catchCongrat",

  "prompt_anotherOne"
];

const promptStructure = {
  add_catchFishType: {
    component: <CatchFishTypeInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  },

  add_catchDuration: {
    component: <CatchDurationInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  },

  add_catchQuantity: {
    component: <CatchQuantityInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  },

  add_catchArea: {
    hideInput: true,
    options: ["61", "71", "67", "77"].map(createOptionLabel)
  },

  add_catchQuantityDone: {
    hideInput: true,
    options: ["yes", "no"].map(createOptionLabel),
    triggers: ["prompt_catchReview", "add_catchQuantity"]
  },

  add_catchReview: {
    component: <CatchReview />,
    hideInput: true,
    replace: false,
    waitAction: true
  },

  add_preservation: {
    hideInput: true,
    options: ["chilled", "salted", "fresh"].map(createOptionLabel)
  },

  prompt_catchCongrat: {
    component: <FishDataConfirm />,
    hideInput: true,
    replace: false,
    waitAction: true
  }
} as any;

export const createCatchPrompt = () =>
  createPromptArray(promptOrder, promptStructure);
