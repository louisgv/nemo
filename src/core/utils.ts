import { strings } from "../i18n";

export const createSelectOptionList = (list: Array<string>) =>
  list.map(value => ({
    value,
    label: `${strings[value]}`
  }));

export const numberValidator = (value: number) => {
  if (isNaN(value) || value <= 0) {
    return "It should be a number greater than 0!";
  }
  return true;
};

export const appendTrigger = (p: any, i: number, order: Array<string>) => {
  const trigger = order[i + 1];

  if (!p.options) {
    p.trigger = trigger;
    if (p.hideInput && !p.waitAction && !p.message) {
      p.message = strings[p.id];
    }
  } else {
    p.options = p.options.map((o: any, j: number) => {
      if(p.triggers) {
        o.trigger = p.triggers[j]
      } else {
        o.trigger = trigger;
      }
      return o;
    });
  }
  delete p.triggers;
  return p;
};

export const createOptionLabel = (value: string) => ({
  value,
  label: strings[value] || value
});
