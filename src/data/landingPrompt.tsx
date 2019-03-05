import React from 'react'
import { createOptionLabel, appendTrigger } from "../core/utils";
import { LandingDataTable } from "../components/LandingDataCard";
import { strings } from "../i18n";

export const landingPromptOrder = [
  "prompt_landing",
  "add_landingDisposition",
  "prompt_landingConfirm",
  "prompt_confirmData",
  "add_confirmData",
  "prompt_checkConfirm",
  "prompt_anotherOne"
];

export const createLandingPrompt = () =>
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
