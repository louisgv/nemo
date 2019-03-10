import React, { useState, useRef } from "react";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated
} from "react-spring";
import styled from "styled-components";

import { Close } from "styled-icons/material/Close";
import { useProfileState } from "../_data";
import { useFormState } from "react-use-form-state";
import { StyledSubmitButton, LabeledInput } from "../_theme";

const data = [
  {
    name: "Rare Wind",
    description: "#a8edea → #fed6e3",
    css: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    height: 200
  },
  {
    name: "New York",
    description: " #fff1eb → #ace0f9",
    css: "linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)",
    height: 400
  },
  {
    name: "Soft Grass",
    description: " #c1dfc4 → #deecdd",
    css: "linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)",
    height: 400
  },
  {
    name: "Japan Blush",
    description: " #ddd6f3 → #faaca8",
    css: "linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)",
    height: 200
  }
];

export const CaptainProfileIcon = () => {
  return <div>Profile Icon</div>;
};

const Container = styled(animated.div)`
  position: absolute;

  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;

  background: white;

  cursor: pointer;

  will-change: width, height, opacity;
  z-index: 1001;
  top: 0;
  right: 0;
`;

const Item = styled(animated.div)`
  height: 45px;
  background: white;
  border-radius: 5px;
  will-change: transform, opacity;
  box-sizing: border-box;

  margin: 1em;
  padding-left: 1em;
`;

const ProfileIcon = styled(animated.div)`
  border-radius: 100%;

  position: relative;
  width: 36px;
  height: 36px;
  background: pink;

  cursor: pointer;

  z-index: 1000;
`;

const CloseProfileModalButton = styled(ProfileIcon)`
  background: white;
  z-index: 1002;
  position: absolute;
  right: 1em;
  top: 1em;
  box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
  svg {
    fill: #ff0081;
  }
`;

const ItemContainer = styled(animated.div)`
  margin: 3em 3em;
`;

const ReviewInput = styled(LabeledInput)`
  width: 100%;
  margin-bottom: 0.5em;

  label {
    width: 50%;
    color: black;
  }
  input {
    width: 50%;
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

export const CaptainProfile = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useProfileState({});

  const {completed, ...profileFormRest} = profile;

  const [formState, { text }] = useFormState<CaptainProfileReviewFormFields>({
    ...profileFormRest
  });

  const springRef = useRef(null);
  const { size, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: {
      size: "2%",
      opacity: 0
    },
    to: {
      size: open ? "100%" : "2%",
      opacity: open ? 1 : 0
    }
  }) as any;

  const transRef = useRef(null);
  const transitions = useTransition(open ? data : [], item => item.name, {
    ref: transRef,
    unique: true,
    trail: 400 / data.length,
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" }
  });

  const closeButtonRef = useRef(null);

  const closeButtonPopin = useSpring({
    ref: closeButtonRef,
    config: config.stiff,
    from: { opacity: 0, transform: "scale(0)" },
    to: { opacity: open ? 1 : 0, transform: open ? "scale(1)" : "scale(0)" }
  });

  useChain(
    open
      ? [springRef, closeButtonRef, transRef]
      : [closeButtonRef, transRef, springRef],
    [0, open ? 0.1 : 0.6]
  );

  return (
    <>
      <ProfileIcon onClick={() => setOpen(true)} />
      <Container style={{ ...rest, width: size, height: size }}>
        <CloseProfileModalButton
          style={closeButtonPopin}
          onClick={() => setOpen(false)}
        >
          <Close />
        </CloseProfileModalButton>
        <ItemContainer>
          {/* {transitions.map(({ item, key, props }) => (
            <Item key={key} style={{ ...props, background: item.css }}>

            </Item>
          ))} */}

          <StyledForm
            onSubmit={e => {
              e.preventDefault();

              setProfile({
                ...formState.values,
                completed: true
              });

              setOpen(false)
            }}
          >
            {Object.keys(formState.values).map(k => (
              <ReviewInput
                key={k}
                label={k}
                {...text(k as any)}
              />
            ))}

            <StyledSubmitButton />
          </StyledForm>
        </ItemContainer>
      </Container>
    </>
  );
};
