import React, { useState } from "react";
import styled from "styled-components";
import { useFormState } from "react-use-form-state";
import { animated } from "react-spring";

import { upper } from "case";

import { useCaptainProfileState } from "../_data";
import { strings } from "../i18n";

import { StyledInput, StyledSubmitButton, LabeledInput } from "../_theme";

interface CertificationStandardFormFields {
  standard: string;
  agency: string;
  value: string;
  identification: string;
}

const Container = styled(animated.div)`
  width: 100%;

  .select-control {
    border-radius: 2em;
    background: #eee;
  }

  .select-input {
    margin-left: 0.5em;
  }
`;

const StyledForm = styled.form`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const StyledHeaderLabel = styled.span`
  color: ${p => p.theme.botBubbleColor};
  font-weight: bold;
`;

const CertificationInput = styled(LabeledInput)`
  width: 100%;
  margin-bottom: 0.5em;
`;

export const VesselCertificationInput = ({ triggerNextStep, steps }: any) => {
  const [profile, setProfile] = useCaptainProfileState({});

  const [disabled, setDisabled] = useState(false);

  const [formState, { text }] = useFormState<CertificationStandardFormFields>();

  return (
    <Container>
      <StyledHeaderLabel>{strings.certification}</StyledHeaderLabel>

      <StyledForm
        onSubmit={e => {
          e.preventDefault();

          setDisabled(true);

          setProfile({
            ... profile,
            vesselCertification: {
              ...formState.values,
              standard: "MSC"
            },
          })

          triggerNextStep();
        }}
      >
        <CertificationInput
          disabled={disabled}
          required
          label={strings.form_certificationAgencyLabel}
          placeholder={strings.form_certificationAgencyPlaceholder}
          {...text("agency")}
        />

        <CertificationInput
          disabled={disabled}
          required
          label={strings.form_certificationValueLabel}
          placeholder={strings.form_certificationValuePlaceholder}
          {...text("value")}
        />

        <CertificationInput
          disabled={disabled}
          required
          label={strings.form_certificationIdentificationLabel}
          placeholder={strings.form_certificationIdentificationPlaceholder}
          {...text("identification")}
        />

        <StyledSubmitButton disabled={disabled} />
      </StyledForm>
    </Container>
  );
};
