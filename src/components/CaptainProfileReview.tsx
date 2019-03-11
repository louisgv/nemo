import React, { useState } from "react";
import styled from "styled-components";
import { useFormState } from "react-use-form-state";
import { animated } from "react-spring";


import { useCaptainProfileState, useProfileState } from "../_data";

import {
  StyledSubmitButton,
  LabeledInput,
  ReviewInput} from "../_theme";

const Container = styled(animated.div)`
  width: 100%;
`;

const StyledForm = styled.form`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

export const CaptainProfileReview = ({ triggerNextStep, steps }: any) => {
  const {
    add_productionMethod,

    add_vesselOwnerName,
    add_organizationName,

    add_unitOfMeasurement
  } = steps;

  const [captainProfile] = useCaptainProfileState({});

  const [, setProfile] = useProfileState({});

  const [disabled, setDisabled] = useState(false);

  const [formState, { text }] = useFormState<CaptainProfileReviewFormFields>({
    firstName: captainProfile.captain.firstName,
    middleName: captainProfile.captain.middleName,
    lastName: captainProfile.captain.lastName,

    vesselIdType: captainProfile.vessel.idType,
    vesselIdString: captainProfile.vessel.idString,
    vesselName: captainProfile.vessel.name,

    vesselCertificationStandard: captainProfile.vesselCertification.standard,
    vesselCertificationAgency: captainProfile.vesselCertification.agency,
    vesselCertificationValue: captainProfile.vesselCertification.value,
    vesselCertificationIdentification:
      captainProfile.vesselCertification.identification,

    fishingGearType: captainProfile.fishingGearTypeCode,

    productionMethod: add_productionMethod.value,

    vesselOwnerName: add_vesselOwnerName ? add_vesselOwnerName.value : "",
    organizationName: add_organizationName ? add_organizationName.value : "",

    unitOfMeasurement: add_unitOfMeasurement.value
  });

  // console.log(formState.values)

  // console.log(Object.keys(formState.values))

  return (
    <Container>
      <StyledForm
        onSubmit={e => {
          e.preventDefault();

          setDisabled(true);

          setProfile({
            ...formState.values,
            completed: true
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

        <StyledSubmitButton disabled={disabled} />
      </StyledForm>
    </Container>
  );
};
