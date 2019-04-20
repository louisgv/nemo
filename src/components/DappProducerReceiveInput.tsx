import React, { useState } from "react";
import styled from "styled-components";

import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

import {
  StyledColumn,
  StyledColumnForm,
  LabeledInput,
  FillButton
} from "../_theme";
import { useFormState } from "react-use-form-state";
import { dappVault, getCatchEvent } from "../api/dapp";
import { useIpfs } from "../hooks/use-ipfs";

const debug = require("debug")("DappProducerReceiveInput");

interface TestInputFields {
  verifyId: string;
  apiUrl: string;
  txId: number;
}

const Container = styled(StyledColumn)`
  word-break: break-word;
  margin: 0.5em;
`;

export const DappProducerReceiveInput = ({ triggerNextStep, previousStep }: any) => {
  const { ipfsRepo, apiUrl } = dappVault;

  const { ipfs, isIpfsReady, ipfsInitError } = useIpfs({
    repo: ipfsRepo,
    silent: true
  });

  const [disabled, setDisabled] = useState(false);
  const [formState, { text }] = useFormState<TestInputFields>({
    apiUrl
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <Container>
      <StyledColumnForm
        onSubmit={async event => {
          event.preventDefault();
          // setDisabled(true);

          try {

            await getCatchEvent(formState.values, ipfs)

            // setSuccess(`IPFS URL: ${nemoTx.data.str}`);
          } catch (err) {
            console.error(err);
            if (err instanceof RpcError)
              console.log(JSON.stringify(err.json, null, 2));

            setError("Try a differrent P2P server...");
          }

          // triggerNextStep();
        }}
      >
        <LabeledInput
          label={"API"}
          disabled={disabled}
          required
          {...text("apiUrl")}
          placeholder={"find a p2p server . . ."}
        />
        
        <LabeledInput
          disabled={disabled}
          label={"ID"}
          required
          {...text("txId")}
          placeholder={"put ID from table here . . ."}
        />

        <LabeledInput
          disabled={disabled}
          label={"CODE"}
          {...text("verifyId")}
          placeholder={"(optional) Claim Code"}
        />

        <FillButton disabled={disabled}>Pay and Claim</FillButton>
      </StyledColumnForm>
      {error.length > 0 && <div style={{ color: "red" }}>ERROR: {error}</div>}
      {success.length > 0 && <div>{success}</div>}
    </Container>
  );
};
