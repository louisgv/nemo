import React from "react";

import { appendTrigger } from "../core/utils";
import { VesselCaptainNameInput } from "../components/VesselCaptainNameInput";
import { ShipIDInput } from "../components/ShipIDInput";
import { FishingGearInput } from "../components/FishingGearInput";

const prompOrder = [
  "prompt_welcomeNew",
  "prompt_fishingGearTypeCode",
  "add_fishingGearTypeCode",

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

  "prompt_organization",
  "add_organization",

  "prompt_certificationStandard",
  "add_certificationStandard",

  "prompt_unitOfMeasurement",
  "add_unitOfMeasurement",

  "prompt_end"
];

const promptStructure = {
  prompt_welcomeNew: {
    hideInput: true
  },
  prompt_introduceNemo: { hideInput: true },
  prompt_vesselCaptainName: {
    hideInput: true
  },
  add_vesselCaptainName: {
    component: <VesselCaptainNameInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  },
  prompt_vesselName: {
    hideInput: true
  },
  add_vesselName: {
    user: true
  },
  prompt_vesselID: {
    hideInput: true
  },
  add_vesselID: {
    component: <ShipIDInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  },
  prompt_fishingGearTypeCode: {
    hideInput: true
  },
  add_fishingGearTypeCode: {
    // user: true,
    component: <FishingGearInput />,
    hideInput: true,
    replace: false,
    waitAction: true
  },
  prompt_productionMethod: {
    hideInput: true
  },
  add_productionMethod: {
    user: true
  },
  prompt_ownership: {
    hideInput: true
  },

  add_ownership: {
    user: true
  },
  prompt_organization: {
    hideInput: true
  },
  add_organization: {
    user: true
  },
  prompt_certificationStandard: {
    hideInput: true
  },
  add_certificationStandard: {
    user: true
  },
  prompt_unitOfMeasurement: {
    hideInput: true
  },
  add_unitOfMeasurement: {
    user: true
  },
  prompt_profileReview: {
    component: <div>PREVIEW PROFILE</div>,
    hideInput: true,
    replace: false,
    waitAction: true
  }
} as any;

export const createSetupCaptainProfilePrompt = () =>
  prompOrder.reduce((acc, id: string, i, src) => {
    if (i < src.length - 1) {
      acc.push(appendTrigger(
        {
          id,
          ...promptStructure[id]
        },
        i,
        prompOrder
      ) as never);
    }
    return acc;
  }, []);
