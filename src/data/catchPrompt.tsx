import React from "react";
import { FishSelector } from "../components/FishSelector";
import {
  numberValidator,
  appendTrigger,
  createOptionLabel
} from "../core/utils";
import { FishDataConfirm } from "../components/FishDataConfirm";

const prompOrder = [
  "prompt_catch",
  "add_catch",
  "prompt_quantity",
  "add_quantity",
  "prompt_preservation",
  "add_preservation",
  "prompt_catchCongrat",
  "prompt_anotherOne"
];

const promptStructure = {
  add_catch: {
    component: <FishSelector />,
    hideInput: true,
    replace: false,
    waitAction: true
  },
  add_quantity: {
    user: true,
    validator: numberValidator
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
  prompOrder.reduce((acc, id: string, i, src) => {
    if (i < src.length - 1) {
      acc.push(appendTrigger(
        {
          id,
          ...(promptStructure[id] || { hideInput: true })
        },
        i,
        prompOrder
      ) as never);
    }
    return acc;
  }, []);
