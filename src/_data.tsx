import React from "react";
import Reward from "react-rewards";

import LocalizedStrings from "react-localization";
import { FishSelector } from "./components/FishSelector";
import { LandingDataTable } from "./components/LandingDataCard";

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

export const fao3AMap = {
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
  bluefinTuna: "PBF",
}

export const strings: any = new LocalizedStrings({
  en: {
    input_placeholder: "Type your answer . . .",

    atlanticCod: "Atlantic Cod",
    blueCrab: "Blue Crab (Atlantic)",
    dolphinFish: "Dolphinfish (Mahi Mahi)",
    grouper: "Potato Grouper",
    kingCrab: "King Crab (red)",
    pacificCod: "Pacific Cod",
    redSnapper: "Red Snapper",
    seaCucumber: "Black Spotted Sea Cucumber",
    shark: "Frilled Shark",
    swordfish: "Swordfish",
    albacoreTuna: "Albacore Tuna",
    bigeyeTuna: "Bigeye Tuna",
    skipjackTuna: "Skipjack Tuna",
    yellowfinTuna: "Yellowfin Tuna",
    bluefinTuna: "Bluefin Tuna",

    prompt_welcome: "Welcome back Captain!",
    prompt_end: "See you soon Captain!",
    prompt_anotherOne: "What else can I add for you Captain?",
    prompt_unavailable: "I'm sorry Captain, I'm afraid I can't do that . . .",

    prompt_initial: "What would you like to add?",

    addNew: "Add new",
    catch: "Catch 🐟",
    transport: "Transport 🚢",
    landing: "Landing ⚓",
    sale: "Sale 💰",
    nothing: "I'm good 😁",

    prompt_nothing: "Smooth sail 💨",

    prompt_catch: "What did you caught?",
    prompt_quantity: "How many {previousValue} did you caught?",
    prompt_preservation: "How are you preserving them?",
    prompt_catchCongrat: "🐟 Congratulation on the catch! 🐟",
    chilled: "Frozen ❄",
    salted: "Dried ♨",
    fresh: "Fresh ✨",

    prompt_landing: "Have you finished unpacking?",
    // prompt_cargoLoad: "How heavy "
    prompt_landingConfirm:
      "⚓ Your time, container, and geolocation has been automatically recorded! Please review the data for accuracy:",
    inprogress: "Inprogress ⏳",
    finished: "Finished 🏁",

    prompt_confirmData: "Does the data seems accurate?",

    dataIsAccurate: "Yes",
    dataIsInaccurate: "No",

    prompt_errorReported:
      "I have reported this error to our engineer. TODO: Continue this flow to add self-input data",

    date: "Date",
    time: "Time",
    timeZone: "Time Zone",
    container: "Container",
    geoLocation: "Location"
  },
  vn: {
    input_placeholder: "Xin giao nhập thông tin",

    prompt_welcome: "Chào mừng trở lại thuyền trưởng!",
    prompt_end: "Hẹn gặp lại thuyền trưởng!",
    prompt_unavailable:
      "Xin lỗi Thuyền trưởng, phần mềm chưa được cài đặt  . . .",

    prompt_initial: "Thuyền trưởng muốn làm gì??",

    addNew: "Thêm mới",
    catch: "Bắt 🐟",
    transport: "Di chuyển 🚢",
    landing: "Hạ cánh ⚓",
    sale: "Giao bán 💰",

    prompt_catch: "Loại bắt nào?"
  },
  rs: {
    input_placeholder: "Реците капетану Ахои!",
    prompt_welcome: "Добродошли назад капетане!",
    prompt_end: "Видимо се ускоро капетане!",
    prompt_unavailable:
      "Жао ми је капетане, бојим се да то не могу да урадим . . .",

    prompt_initial: "Шта желите да радите?",

    addNew: "Додај ново",
    catch: "Цатцх 🐟",
    prompt_catch: "Каква врста улова?",
    transport: "Транспорт 🚢",
    landing: "Слетање ⚓",
    sale: "Продаја  💰"
  }
});

export const getFishSelectList = () =>
  fishes.map(value => ({
    value,
    label: strings[value]
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
    options: ["catch", "transport", "landing", "sale", "nothing"].map(
      value => ({
        value,
        label: `${strings[value]}`,
        trigger: `prompt_${value}`
      })
    )
  },
  ...["transport", "sale"].map(value => ({
    id: `prompt_${value}`,
    message: () => strings.prompt_unavailable,
    trigger: "prompt_end"
  })),
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
      component: <LandingDataTable/>
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
      validator: (value : number) => {
        if (isNaN(value) || value <= 0) {
          return 'It should be a number greater than 0!';
        }
        return true;
      },
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
      component: (
        <Reward
          ref={(ref: any) => ref.rewardMe()}
          type="emoji"
          config={{
            emoji: ["🐟", "🦐", "🐙", "🦀", "🐳", "🐋", "🐬", "🦑", "🐡", "🦈"]
          }}
        >
          <div>{strings.prompt_catchCongrat}</div>
        </Reward>
      )
    }
  ].map((p: any, i) => appendTrigger(p, i, catchPromptOrder));

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
