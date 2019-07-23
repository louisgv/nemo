import React, { useState } from "react";
import styled from "styled-components";
import { useFormState } from "react-use-form-state";
import { animated } from "react-spring";

import {
  useCatchCacheState,
  fao3AMap,
  useProfileState,
  useLanguageState
} from "../_data";

import {
  LabeledInput,
  StyledColumnForm,
  ReviewInput,
  Divider,
  FillButton,
  StyledLabel
} from "../_theme";
import api from "../api";
import { createCatchPayload } from "../api/catch";
import { useIpfs } from "../hooks/use-ipfs";

// const debug = require("debug")("DappSendInput");

const Container = styled(animated.div)`
  width: 100%;
  word-break: break-word;
`;

const QuantityItem = styled(ReviewInput)`
  label {
  }
`;

export const CatchReview = ({ triggerNextStep, steps }: any) => {
  const { add_catchArea } = steps;

  const { apiUrl } = api.dapp.dappVault;

  const { ipfs, isIpfsReady, ipfsInitError } = useIpfs();

  const [catchCache, setCatchCache] = useCatchCacheState();

  const [profile] = useProfileState();

  const [language] = useLanguageState();

  const [disabled, setDisabled] = useState(false);

  const [sendMethod, setSendMethod] = useState("");

  const [error] = useState("");
  const [success, setSuccess] = useState("");
  const [, setOriginId] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const { quantityList, ...catchCacheRest } = catchCache;

  const [formState, { text }] = useFormState({
    ...catchCacheRest,
    catchArea: add_catchArea.value
  });

  const [dappFormState, dappInput] = useFormState({
    apiUrl,
    price: "0.0200 EOS"
  });
  // console.log(formState.values)

  // console.log(Object.keys(formState.values))

  if (!quantityList) {
    return <div>Cache Cleaned . . .</div>;
  }

  return (
    <Container>
      <StyledColumnForm
        onSubmit={async e => {
          e.preventDefault();
          setDisabled(true);

          const fishCode = fao3AMap[catchCache.fishKey];

          const epcisDoc = await createCatchPayload({
            ...profile,
            ...catchCache,
            catchArea: add_catchArea.value,
            language,
            fishCode
          });

          const sendToEOS = async () => {
            // Take the epcisDoc and send it to IPFS, grab the resulting hash

            // Take the hash and send it to the EOS table

            // Get the blockhash and blockid, combine and Output the hash to the user
            const catchResult = await api.dapp.sendCatchEvent(
              dappFormState.values,
              ipfs,
              epcisDoc
            );

            setIpfsHash(catchResult.ipfsHash);
            setOriginId(catchResult.originId);

            setSuccess("sent");
          };

          const sendPromise = []

          switch (sendMethod) {
            case "both":
              sendPromise.push(sendToEOS())
              sendPromise.push(api.freepcis.sendCatchEvent(epcisDoc))
              break;
            case "ipfs-eos":
              sendPromise.push(sendToEOS())
              break;
            default:
            case "freepcis":
              sendPromise.push(api.freepcis.sendCatchEvent(epcisDoc))
              break;
          }

          await Promise.all(sendPromise)

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

        <Divider />

        <FillButton
          disabled={disabled || catchCache.sent}
          onClick={() => setSendMethod("freepcis")}
        >
          Send to FreEPCIS
        </FillButton>

        <br />

        <LabeledInput
          label={"API"}
          disabled={disabled}
          required
          {...dappInput.text("apiUrl")}
          placeholder={"find an eos api . . ."}
        />

        <LabeledInput
          label={"PRICE"}
          disabled={disabled}
          required
          {...dappInput.text("price")}
          placeholder={"selling price . . ."}
        />

        {isIpfsReady && (
          <>
            <FillButton
              background={'sandybrown'}
              disabled={disabled || catchCache.sent}
              onClick={() => setSendMethod("ipfs-eos")}
            >
              Send to EOS
            </FillButton>
            <FillButton
              background={'darkorchid'}
              disabled={disabled || catchCache.sent}
              onClick={() => setSendMethod("both")}
            >
              Send to FreEPCIS and EOS
            </FillButton>
          </>
        )}
      </StyledColumnForm>

      <div style={{ color: "red" }}>
        {error.length > 0 && <span>ERROR: {error}</span>}
        {ipfsInitError && (
          <span>ERROR: {ipfsInitError.message || ipfsInitError}</span>
        )}
      </div>
      {success.length > 0 && (
        <div>
          Catch event posted. Will take ~3 minutes for it to register -
          <a
            href="https://jungle.eosx.io/account/nemoeosmark1?mode=contract&sub=tables"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://jungle.eosx.io/account/nemoeosmark1?mode=contract&sub=tables
          </a>
          <Divider />
          <StyledLabel>
            {" "}
            You can check the epcis data on IPFS here -{" "}
          </StyledLabel>
          <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">
            {`https://ipfs.io/ipfs/${ipfsHash}`}
          </a>
          {/* 
            <StyledLabel> Give this Claim Code to the producer: </StyledLabel>
            <br />
            {originId}
            <FillButton onClick={() => copy(originId)}>
              Click to Copy Claim Code
            </FillButton> 
          */}
        </div>
      )}
    </Container>
  );
};
