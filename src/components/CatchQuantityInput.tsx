import React, { useState } from "react";
import styled from "styled-components";

import { StyledInput, StyledSubmitButton, StyledColumnForm, RowDiv, StyledButton } from "../_theme";
import { useFormState } from "react-use-form-state";
import { useProfileState, useCatchCacheState, uomMap } from "../_data";
import { strings } from "../i18n";

import {Qrcode} from '@styled-icons/icomoon/Qrcode'

import { v4 as uuid } from 'uuid';

interface CatchQuantityFormFields {
  amount: number;
}

const AmountInput = styled(StyledInput)`
  width: 50%;
  text-align: right;
`;

const QRScanButton = styled(StyledButton)`
  width: 30%;

  display: flex;
  align-items: center;
  justify-content: space-around;
`
const QRCodeDiv = styled.div`
  width: 60%;
`

const QRCodeContainer = styled(RowDiv)`
  height: 3em;
`

export const CatchQuantityInput = ({ triggerNextStep, steps }: any) => {
  const [profile] = useProfileState({
    unitOfMeasurement: "kilogram"
  });

  const [catchCache, setCatchCache] = useCatchCacheState({
    quantityList: []
  });

  const [disabled, setDisabled] = useState(false);

  const [formState, { number }] = useFormState<CatchQuantityFormFields>();

  const [qrCode, setQRCode] = useState("")

  return (
    <StyledColumnForm
      onSubmit={e => {
        e.preventDefault();
        // console.log(steps);
        // console.log(formState.values);

        setDisabled(true);

        const quantityList = catchCache.quantityList || []

        quantityList.push({
          epcClass: qrCode,
          quantity: formState.values.amount,
          uom: uomMap[profile.unitOfMeasurement]
        })

        setCatchCache({
            ...catchCache,
            quantityList
        });

        triggerNextStep();
      }}
    >
      <QRCodeContainer>
        <QRCodeDiv>
          {qrCode}
        </QRCodeDiv>
        <QRScanButton onClick={(e)=>{
          e.preventDefault()

          const code = uuid()

          setQRCode(code)
        }}>
          Scan QR {" "}
          <Qrcode size="15"/>
        </QRScanButton>
      </QRCodeContainer>
      
      <RowDiv>
        <AmountInput required disabled={disabled} {...number('amount')}/>
        <div>
          {strings[profile.unitOfMeasurement]}
        </div>
        <StyledSubmitButton disabled={disabled || !qrCode} />
      </RowDiv>
    </StyledColumnForm>
  );
};
