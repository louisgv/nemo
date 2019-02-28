import { strings } from "./i18n";
import { createCatchPrompt } from "./data/catchPrompt";
import { createLandingPrompt } from "./data/landingPrompt";
import { createSalePrompt } from "./data/salePrompt";

// import { IDialogue } from "./react-app-env";

// https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/examples/modules/Dropdown/common.js

export const fishes = [
  "atlanticCod",
  "blueCrab",
  "dolphinFish",
  "grouper",
  "kingCrab",
  "pacificCod",
  "redSnapper",
  "seaCucumber",
  "shark",
  "swordfish",
  "albacoreTuna",
  "bigeyeTuna",
  "skipjackTuna",
  "yellowfinTuna",
  "bluefinTuna"
];

export const fao3AMap: any = {
  atlanticCod: "LPS",
  blueCrab: "CRB",
  dolphinFish: "DOL",
  grouper: "EWL",
  kingCrab: "KCD",
  pacificCod: "PCO",
  redSnapper: "RES",
  seaCucumber: "EHV",
  shark: "HXC",
  swordfish: "SWO",
  albacoreTuna: "ALB",
  bigeyeTuna: "BET",
  skipjackTuna: "SKJ",
  yellowfinTuna: "YFT",
  bluefinTuna: "PBF"
};

export const getFishSelectList = () =>
  fishes.map(value => ({
    value,
    label: `${strings[value]}`
  }));

export const localStorageKey = {
  savedLanguage: "NEMO_LANGUAGE"
};

export const createSteps = () => [
  {
    id: "prompt_welcome",
    hideInput: true,
    message: () => strings.prompt_welcome,
    trigger: "prompt_initial"
  },
  {
    id: "prompt_initial",
    hideInput: true,
    message: () => strings.prompt_initial,
    trigger: "prompt_events"
  },
  {
    id: `prompt_anotherOne`,
    hideInput: true,
    message: () => strings.prompt_anotherOne,
    trigger: "prompt_events"
  },
  {
    id: `prompt_nothing`,
    hideInput: true,
    message: () => strings.prompt_nothing,
    trigger: "prompt_end"
  },
  {
    id: "prompt_events",
    hideInput: true,
    options: ["catch", "landing", "sale", "transport", "nothing"].map(
      value => ({
        value,
        label: `${strings[value]}`,
        trigger: `prompt_${value}`
      })
    )
  },
  ...["transport"].map(value => ({
    id: `prompt_${value}`,
    message: () => strings.prompt_unavailable,
    trigger: "prompt_end"
  })),
  ...createSalePrompt(),
  ...createCatchPrompt(),
  ...createLandingPrompt(),
  {
    id: "prompt_end",
    hideInput: true,
    message: () => strings.prompt_end,
    end: true
  }
];
