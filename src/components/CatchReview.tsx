import React, { useState } from "react";
import styled from "styled-components";
import { useFormState } from "react-use-form-state";
import { animated } from "react-spring";

import { useCatchCacheState, fao3AMap, useProfileState, useLanguageState } from "../_data";

import { StyledSubmitButton, LabeledInput, StyledColumnForm, ReviewInput, Divider } from "../_theme";
import { sendCatchEvent } from "../api";

const Container = styled(animated.div)`
  width: 100%;
`;

const QuantityItem = styled(ReviewInput)`
  label {

  }
`;

export const CatchReview = ({ triggerNextStep, steps }: any) => {
  const { add_catchArea } = steps;

  const [catchCache, setCatchCache] = useCatchCacheState();

  const [profile] = useProfileState()

  const [language] = useLanguageState()

  const [disabled, setDisabled] = useState(false);

  const { quantityList, ...catchCacheRest } = catchCache;

  const [formState, { text }] = useFormState({
    ...catchCacheRest,
    catchArea: add_catchArea.value
  });

  // console.log(formState.values)

  // console.log(Object.keys(formState.values))

  return (
    <Container>
      <StyledColumnForm
        onSubmit={async (e) => {
          e.preventDefault();

          setDisabled(true);

          const fishCode = fao3AMap[catchCache.fishKey]

          await sendCatchEvent({
            ...profile,
            ...catchCache,
            catchArea: add_catchArea.value,
            language,
            fishCode
          })

          setCatchCache({
            ...catchCache,
            sent: true
          });

          triggerNextStep();
        }}
      >
        {Object.keys(formState.values).map(k => (
          <ReviewInput
            key={k}
            disabled={disabled}
            label={k}
            {...text(k as any)}
          />
        ))}

        <Divider />

        {quantityList.map(({ epcClass, quantity, uom }: any, i: number) => (
          <QuantityItem
            readOnly
            key={epcClass}
            disabled={disabled}
            label={epcClass}
            value={`${quantity} ${uom}`}
          />
        ))}

        <StyledSubmitButton disabled={disabled || catchCache.sent} />
      </StyledColumnForm>
    </Container>
  );
};
