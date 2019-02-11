import LocalizedStrings from "react-localization";
// import { IDialogue } from "./react-app-env";

// https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/examples/modules/Dropdown/common.js
export const languages = [
  { key: "us", value: "us", flag: "us", label: "United States" },
  { key: "vn", value: "vn", flag: "vn", label: "Vietnam" },
  { key: "rs", value: "rs", flag: "rs", label: "Serbia" }
];


export const strings: any = new LocalizedStrings({
  en: {
    welcome: "Welcome back Captain!",
    end: "See you soon Captain!",
    initialPrompt: "What would you like to do?",
    addNew: "Add new",
    catch: "Catch 🐟",
    prompt_catch: "What kind of catch?",
    transportShipment: "Transport 🚢",
    landing: "Landing ⚓",
    firstSaleAndShipment: "Sale 💰",
    featureUnavailable: "I'm sorry Captain, I'm afraid I can't do that . . .",
    placeholder: "Say Ahoy captain!"
  },
  vn: {
    welcome: "Chào mừng trở lại thuyền trưởng!",
    end: "Hẹn gặp lại thuyền trưởng!",
    initialPrompt: "Thuyền trưởng muốn làm gì??",
    addNew: "Thêm mới",
    catch: "Bắt 🐟",
    prompt_catch: "Loại bắt nào?",
    transportShipment: "Di chuyển 🚢",
    landing: "Hạ cánh ⚓",
    firstSaleAndShipment: "Giao bán 💰",
    featureUnavailable: "Xin lỗi Thuyền trưởng, phần mềm chưa được cài đặt  . . .",
    placeholder: "Xin giao nhập thông tin"
  },
  rs: {
    welcome: "Добродошли назад капетане!",
    end: "Видимо се ускоро капетане!",
    initialPrompt: "Шта желите да радите?",
    addNew: "Додај ново",
    catch: "Цатцх 🐟",
    prompt_catch: "Каква врста улова?",
    transportShipment: "Транспорт 🚢",
    landing: "Слетање ⚓",
    firstSaleAndShipment: "Продаја  💰",
    featureUnavailable: "Жао ми је капетане, бојим се да то не могу да урадим . . .",
    placeholder: "Реците капетану Ахои!"
  }
});

export const localStorageKey = {
  savedLanguage: "NEMO_LANGUAGE"
}

export const createSteps =()=> [
  {
    id: "welcome",
    hideInput: true,
    message: () => strings.welcome,
    trigger: "init",
  },
  {
    id: "init",
    hideInput: true,
    message: () => strings.initialPrompt,
    trigger: "promptEvent",
  },
  {
    id: "promptEvent",
    hideInput: true,
    options: [
      "catch",
      "transportShipment",
      "landing",
      "firstSaleAndShipment"
    ].map(value => ({
      value,
      label: `${strings.addNew} ${strings[value]}`,
      trigger: `prompt_${value}`
    }))
  },
  ...["catch", "transportShipment", "landing", "firstSaleAndShipment"].map(
    value => ({
      id: `prompt_${value}`,
      message: () => strings.featureUnavailable,
      trigger: "end"
    })
  ),
  {
    id: `prompt_catch`,
    hideInput: true,
    message: () => strings.prompt_catch,
    trigger: "add_catch"
  },
  {
    id: `add_catch`,
    user: true,
    trigger: "end"
  },
  {
    id: "end",
    hideInput: true,
    message: () => strings.end,
    end: true
  }
];
