import React, { useState } from "react";
import styled from "styled-components";
import { durationList, useCatchCacheState } from "../_data";
import {
  StyledInput,
  StyledSubmitButton,
  StyledSelect,
  StyledRowForm
} from "../_theme";
import { useFormState } from "react-use-form-state";
import { createSelectOptionList } from "../core/utils";
import { DateTime } from "luxon";

interface CatchDurationFormFields {
  durationValue: number;
  durationType: string;
}

const DurationTypeSelect = styled(StyledSelect)`
  width: 30%;
`;

const DurationValueInput = styled(StyledInput)`
  width: 50%;
  text-align: right;
`;

export const CatchDurationInput = ({ triggerNextStep }: any) => {
  const options = createSelectOptionList(durationList);

  const [disabled, setDisabled] = useState(false);

  const [formState, { number, select }] = useFormState<
    CatchDurationFormFields
  >({
    durationType: durationList[0]
  });

  const [catchCache, setCatchCache] = useCatchCacheState({});

  return (
    <StyledRowForm
      onSubmit={e => {
        e.preventDefault();

        setDisabled(true);

        const endDate = DateTime.local();
        const startDate = endDate.minus({
          [formState.values.durationType]: formState.values.durationValue
        });

        const harvestEndDate = endDate.toISODate();
        const harvestStartDate = startDate.toISODate();

        setCatchCache({
          ...catchCache,
          harvestStartDate,
          harvestEndDate
        });

        triggerNextStep();
      }}
    >
      <DurationValueInput required disabled={disabled} {...number("durationValue")} />

      <DurationTypeSelect
        onChange={(value: string) =>
          select("durationType").onChange({ target: { value } })
        }
        value={select("durationType").value}
        disabled={disabled}
        options={options}
        classes={{
          selectControl: "select-control",
          selectInput: "select-input"
        }}
      />

      <StyledSubmitButton disabled={disabled} />
    </StyledRowForm>
  );
};
