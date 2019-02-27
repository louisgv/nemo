import React from "react";

import LocalizedStrings from "react-localization";
import { FishSelector } from "./components/FishSelector";
import { LandingDataTable } from "./components/LandingDataCard";
import { CatchSelector } from "./components/CatchSelector";
import { FishDataConfirm } from "./components/FishDataConfirm";
import { en } from "./i18n/en";
import { vn } from "./i18n/vn";
import { rs } from "./i18n/rs";

// import { IDialogue } from "./react-app-env";

// https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/examples/modules/Dropdown/common.js
export const languages = [
  { key: "us", value: "us", flag: "us", label: "United States" },
  { key: "vn", value: "vn", flag: "vn", label: "Vietnam" },
  { key: "rs", value: "rs", flag: "rs", label: "Serbia" }
];

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

export const strings: any = new LocalizedStrings({
  en,
  vn,
  rs
});

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

const createOptionLabel = (value: string) => ({
  value,
  label: strings[value]
});

const salePromptOrder = [
  "prompt_sale",
  "add_species",
  "prompt_size",
  "add_size",
  "prompt_weight",
  "add_weight",
  "prompt_value",
  "add_value",
  "prompt_saleConfirmation",
  "prompt_anotherOne"
];

const createSalePrompt = () =>
  [
    {
      id: `prompt_sale`,
      hideInput: true,

    },
    {
      id: `add_species`,
      hideInput: true,
      waitAction: true,
      component: <CatchSelector />
    },
    {
      id: `prompt_size`,
      hideInput: true,
    },
    {
      id: `add_size`,
      user: true,
      validator: numberValidator
    },
    {
      id: `prompt_weight`,
      hideInput: true
    },
    {
      id: `add_weight`,
      user: true,
    },
    {
      id: `prompt_value`,
      hideInput: true
    },
    {
      id: `add_value`,
      user: true,
    },
    {
      id: `prompt_saleConfirmation`,
      hideInput: true,
      // component: <SaleDetail />
    }
  ].map((p: any, i) => appendTrigger(p, i, salePromptOrder));

const landingPromptOrder = [
  "prompt_landing",
  "add_landingDisposition",
  "prompt_landingConfirm",
  "prompt_confirmData",
  "add_confirmData",
  "prompt_checkConfirm",
  "prompt_anotherOne"
];

const createLandingPrompt = () =>
  [
    {
      id: `prompt_landing`,
      hideInput: true
    },
    {
      id: `add_landingDisposition`,
      options: ["inprogress", "finished"].map(createOptionLabel)
    },
    // { // TODO: Stretch, ask cargo load
    //   id: `prompt_cargoLoad`,
    //   hideInput: true,
    //   message: ({ previousValue }: any) =>
    //     previousValue === "finished"
    //       ? strings.prompt_cargoLoad
    //       : "✔"
    // },
    {
      id: `prompt_landingConfirm`,
      component: <LandingDataTable />
    },
    {
      id: `prompt_confirmData`,
      hideInput: true
    },
    {
      id: `add_confirmData`,
      hideInput: true,
      options: ["dataIsAccurate", "dataIsInaccurate"].map(createOptionLabel)
    },
    {
      id: `prompt_checkConfirm`,
      hideInput: true,
      message: ({ previousValue }: any) =>
        previousValue === "dataIsInaccurate"
          ? strings.prompt_errorReported
          : "✔"
    }
  ].map((p: any, i) => appendTrigger(p, i, landingPromptOrder));

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

const createCatchPrompt = () =>
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
      component: <FishDataConfirm/>
    }
  ].map((p: any, i) => appendTrigger(p, i, catchPromptOrder));

const numberValidator = (value: number) => {
  if (isNaN(value) || value <= 0) {
    return "It should be a number greater than 0!";
  }
  return true;
};

const appendTrigger = (p: any, i: number, order: Array<string>) => {
  const trigger = order[i + 1];

  if (!p.options) {
    p.trigger = trigger;
    if (p.hideInput && !p.waitAction && !p.message) {
      p.message = strings[p.id];
    }
  } else {
    p.options = p.options.map((o: any) => {
      o.trigger = trigger;
      return o;
    });
  }
  return p;
};
