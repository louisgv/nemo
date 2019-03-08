import React, { useState } from "react";
import styled from "styled-components";
import { useFormState } from "react-use-form-state";
import { animated } from "react-spring";

import { upper } from 'case'

import { useCaptainProfileState } from "../_data";
import { strings } from "../i18n";

import { StyledInput, StyledSubmitButton } from "../_theme";

interface CaptainNameFormFields {
  firstName: string;
  middleName: string;
  lastName: string;
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

const StyledMiddleNameInput = styled(StyledInput)`
  width: 20px;
`;

const StyledForm = styled.form`
  margin-top: 0.5em;
  display: flex;
  justify-content: space-between;
`;

const StyledCaptainLabel = styled.span`
  color: ${p => p.theme.botBubbleColor};
  font-weight: bold;
`;

export const CaptainProfileReview = ({ triggerNextStep, steps }: any) => {
  const [profile, setProfile] = useCaptainProfileState({})

  const [disabled, setDisabled] = useState(false);
  
  const [formState, { text }] = useFormState<CaptainNameFormFields>();

  return (
    <Container>
      <StyledCaptainLabel>{strings.captain}</StyledCaptainLabel>

      <StyledForm
        onSubmit={e => {
          e.preventDefault();
          const { lastName, firstName, middleName } = formState.values;

          setDisabled(true);

          setProfile({
            ... profile,
            captain: {
              firstName,
              middleName,
              lastName,
              formName: upper(`${lastName},${firstName}`)
            },
          })

          triggerNextStep()
        }}
      >
        <StyledInput
          disabled={disabled}
          required
          placeholder="Last"
          {...text("lastName")}
        />
        {", "}
        <StyledInput
          disabled={disabled}
          required
          placeholder="First"
          {...text("firstName")}
        />
        <StyledMiddleNameInput
          disabled={disabled}
          placeholder="M"
          {...text("middleName")}
          maxLength={1}
        />
        {"."}

        <StyledSubmitButton disabled={disabled} />
      </StyledForm>
    </Container>
  );
};
