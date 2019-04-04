import React from "react";

import {
  createOptionLabel,
  createPromptArray
} from "../core/utils";
import { VesselCaptainNameInput } from "../components/VesselCaptainNameInput";
import { VesselIDInput } from "../components/VesselIDInput";
import { FishingGearInput } from "../components/FishingGearInput";
import { CaptainProfileReview } from "../components/CaptainProfileReview";
import { VesselCertificationInput } from "../components/VesselCertificationInput";

const promptOrder = [
  "prompt_welcomeNew",

  "prompt_introduceNemo",

  "prompt_vesselCaptainName",
  "add_vesselCaptainName",

  "prompt_vesselName",
  "add_vesselName",

  "prompt_vesselID",
  "add_vesselID",

  "prompt_fishingGearTypeCode",
  "add_fishingGearTypeCode",

  "prompt_productionMethod",
  "add_productionMethod",

  "prompt_ownership",
  "add_ownership",

  "prompt_vesselOwnerName",
  "add_vesselOwnerName",

  "prompt_organization",
  "add_organization",

  "prompt_organizationName",
  "add_organizationName",

  "prompt_certificationHolder",
  "add_certificationHolder",

  "prompt_certificationStandard",
  "add_certificationStandard",

  "prompt_unitOfMeasurement",
  "add_unitOfMeasurement",

  "prompt_setupProfileCompleted",

  "prompt_profileReview",

  "prompt_profileDone",

  "prompt_anotherOne"
];

const promptStructure = {
  add_vesselCaptainName: {
    component: <VesselCaptainNameInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  },

  add_vesselName: {
    user: true
  },

  add_vesselID: {
    component: <VesselIDInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  },

  add_fishingGearTypeCode: {
    // user: true,
    component: <FishingGearInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  },

  add_productionMethod: {
    // user: true
    hideInput: true,
    options: ["aquaculture", "inlandFishery", "marineFishery"].map(
      createOptionLabel
    )
  },

  add_ownership: {
    // user: true
    hideInput: true,
    options: ["yes", "no"].map(createOptionLabel),
    triggers: ["prompt_organization", "prompt_vesselOwnerName"]
  },

  add_vesselOwnerName: {
    user: true
  },

  add_organization: {
    hideInput: true,
    options: ["yes", "no"].map(createOptionLabel),
    triggers: ["prompt_organizationName", "prompt_certificationHolder"]
  },

  add_organizationName: {
    user: true
  },

  add_unitOfMeasurement: {
    hideInput: true,
    options: ["pound", "kilogram"].map(createOptionLabel)
  },

  add_certificationHolder: {
    hideInput: true,
    options: ["yes", "no"].map(createOptionLabel),
    triggers: ["prompt_certificationStandard", "prompt_unitOfMeasurement"]
  },

  add_certificationStandard: {
    component: <VesselCertificationInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  },

  prompt_profileReview: {
    component: <CaptainProfileReview />,
    hideInput: true,
    replace: false,
    waitAction: true
  }
} as any;

export const createSetupCaptainProfilePrompt = () =>
  createPromptArray(promptOrder, promptStructure);
