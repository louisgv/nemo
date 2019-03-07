import React from "react";

import { appendTrigger, createOptionLabel } from "../core/utils";
import { VesselCaptainNameInput } from "../components/VesselCaptainNameInput";
import { ShipIDInput } from "../components/ShipIDInput";
import { FishingGearInput } from "../components/FishingGearInput";
import { YesNoDynamicInput } from "../components/YesNoDynamicInput";
import { useCaptainProfileState } from "../_data";
import { CaptainProfileReview } from "../components/CaptainProfileReview";
import { VesselCertificationInput } from "../components/VesselCertificationInput";

const prompOrder = [
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

  "prompt_profileReview",

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
    // user: true
    options: ["aquaculture", "inlandFishery", "marineFishery"].map(
      createOptionLabel
    )
  },

  prompt_ownership: {
    hideInput: true
  },

  add_ownership: {
    // user: true
    options: ["yes", "no"].map(createOptionLabel),
    triggers: [
      "prompt_organization",
      "prompt_vesselOwnerName"
    ]
  },

  prompt_vesselOwnerName: {
    hideInput: true
  },
  add_vesselOwnerName: {
    user: true
  },

  prompt_organization: {
    hideInput: true
  },
  add_organization: {
    options: ["yes", "no"].map(createOptionLabel),
    triggers: [
      "prompt_organizationName",
      "prompt_certificationHolder"
    ]
  },

  prompt_organizationName: {
    hideInput: true
  },
  add_organizationName: {
    user: true,
  },
  
  prompt_certificationHolder: {
    hideInput: true
  },
  add_certificationHolder: {
    options: ["yes", "no"].map(createOptionLabel),
    triggers: [
      "prompt_certificationStandard",
      "prompt_unitOfMeasurement",
    ]
  },

  prompt_certificationStandard: {
    hideInput: true
  },
  add_certificationStandard: {
    component: <VesselCertificationInput/>,
    hideInput: true,
    replace: false,
    waitAction: true  },

  prompt_unitOfMeasurement: {
    hideInput: true
  },
  add_unitOfMeasurement: {
    options: ["kilogram", "pound"].map(createOptionLabel),
  },
  prompt_profileReview: {
    component: <CaptainProfileReview/>,
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
