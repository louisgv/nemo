import LocalizedStrings from "react-localization";

import { en } from "./en";
import { vn } from "./vn";
import { rs } from "./rs";

export const strings: any = new LocalizedStrings({
  en,
  vn,
  rs
});

export const languages = [
    { key: "us", value: "us", flag: "us", label: "United States" },
    { key: "vn", value: "vn", flag: "vn", label: "Vietnam" },
    { key: "rs", value: "rs", flag: "rs", label: "Serbia" }
  ];