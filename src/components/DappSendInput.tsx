import React, { useState } from "react";
import styled from "styled-components";

import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import copy from "copy-to-clipboard";

import {
  StyledColumn,
  StyledColumnForm,
  LabeledInput,
  FillButton,
  Divider,
  StyledLabel
} from "../_theme";

import { useFormState } from "react-use-form-state";
import { eosVault } from "../_data";

const debug = require("debug")("DappSendInput");

interface TestInputFields {
  echoString: string;
  apiUrl: string;
}

const Container = styled(StyledColumn)`
  word-break: break-word;
  margin: 0.5em;
`;

export const DappSendInput = ({ triggerNextStep }: any) => {
  const { keys, account, apiUrl } = eosVault;

  const [disabled, setDisabled] = useState(false);
  const [formState, { text }] = useFormState<TestInputFields>({
    apiUrl
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [originId, setOriginId] = useState("");

  return (
    <Container>
      <StyledColumnForm
        onSubmit={async e => {
          e.preventDefault();
          setDisabled(true);

          // Jungle testnet keys

          const signatureProvider = new JsSignatureProvider(keys);

          try {
            const rpc = new JsonRpc(formState.values.apiUrl);

            const api = new Api({ rpc, signatureProvider });

            const result = await api.transact(
              {
                actions: [
                  {
                    account: account.contract,
                    name: "echo",
                    authorization: [
                      {
                        actor: account.captain,
                        permission: "active"
                      }
                    ],
                    data: {
                      str: formState.values.echoString
                    }
                  }
                ]
              },
              {
                blocksBehind: 3,
                expireSeconds: 30
              }
            );

            debug(result);

            // const blockNum = result.processed.block_num;

            setOriginId(`${result.transaction_id}.NEMOTX.${result.processed.block_num}`);

            setSuccess("sent");
          } catch (error) {
            console.error(e);
            if (e instanceof RpcError)
              console.log(JSON.stringify(e.json, null, 2));

            setError("Try a differrent P2P server...");
          }

          triggerNextStep({
            value: originId
          });
        }}
      >
        <LabeledInput
          label={"API"}
          disabled={disabled}
          required
          {...text("apiUrl")}
          placeholder={"find a p2p server . . ."}
          autoFocus
        />

        <LabeledInput
          disabled={disabled}
          label={"STR"}
          required
          {...text("echoString")}
          placeholder={"put anything here . . ."}
          autoFocus
        />

        <FillButton disabled={disabled}>Submit</FillButton>
      </StyledColumnForm>
      {error.length > 0 && <div style={{ color: "red" }}>ERROR: {error}</div>}
      {success.length > 0 && (
        <div>
          Message sent. Will take ~3 minutes for it to register -
          <a
            href="https://jungle.eosweb.net/account/nemoeosmark1"
            target="_blank"
          >
            https://jungle.eosweb.net/account/nemoeosmark1
          </a>
          <Divider />
          <StyledLabel> Give this id to the producer: </StyledLabel>
          <br />
          {originId}
          <FillButton onClick={() => copy(originId)}>
            Click to Copy Transaction ID
          </FillButton>
        </div>
      )}
    </Container>
  );
};
