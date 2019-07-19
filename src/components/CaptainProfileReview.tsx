import React, { useState } from "react";
import styled from "styled-components";
import { useFormState } from "react-use-form-state";
import { animated } from "react-spring";

import { useCaptainProfileState, useProfileState, localStorageKey } from "../_data";

import { StyledSubmitButton, ReviewInput } from "../_theme";

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

  const { captain, vessel, vesselCertification } = captainProfile;

  const [formState, { text }] = useFormState<CaptainProfileReviewFormFields>({
    firstName: captain.firstName,
    middleName: captain.middleName,
    lastName: captain.lastName,

    vesselIdType: vessel.idType,
    vesselIdString: vessel.idString,
    vesselName: vessel.name,

    vesselCertificationStandard: vesselCertification
      ? vesselCertification.standard
      : "",
    vesselCertificationAgency: vesselCertification
      ? vesselCertification.agency
      : "",
    vesselCertificationValue: vesselCertification
      ? vesselCertification.value
      : "",
    vesselCertificationIdentification: vesselCertification
      ? vesselCertification.identification
      : "",

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

          localStorage.removeItem(localStorageKey.chatCache);

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
