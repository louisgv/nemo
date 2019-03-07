import React, { useState } from "react";
import styled from "styled-components";
import { useFormState } from "react-use-form-state";

import { useCaptainProfileState } from "../_data";
import { strings } from "../i18n";
import { animated } from "react-spring";

import { StyledInput, StyledSubmitButton } from "../_theme";

interface YesNoFormFields {
  isYes: boolean;
  value: string;
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
  margin-top: 0.5em;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledCaptainLabel = styled.span`
  color: ${p => p.theme.botBubbleColor};
  font-weight: bold;
`;

export const YesNoDynamicInput = ({ triggerNextStep, steps }: any) => {
  const [profile, setProfile] = useCaptainProfileState({});

  const [disabled, setDisabled] = useState(false);

  const [formState, { text }] = useFormState<YesNoFormFields>();

  return (
    <Container>
      <StyledForm
        onSubmit={e => {
          e.preventDefault();
 
          setDisabled(true);

          setProfile({
            ...profile,

          });

          // triggerNextStep();
        }}
      >
        <div>
          If YES, press this button:
        </div>


        <div>
          If NO, please provide the name of the organization that own the ship:
        </div>

        <StyledInput
          disabled={disabled}
          required
          placeholder="Owner Organization"
          {...text("value")}
        />

        <StyledSubmitButton disabled={disabled} />
      </StyledForm>
    </Container>
  );
};
