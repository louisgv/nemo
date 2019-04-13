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
import { useIpfs } from "../hooks/use-ipfs";

const debug = require("debug")("DappSendInput");

interface TestInputFields {
  echoString: string;
  apiUrl: string;
}

const Container = styled(StyledColumn)`
  word-break: break-word;
  margin: 0.5em;
`;

export const DappSendInput = ({ triggerNextStep, step }: any) => {
  const { ipfs, isIpfsReady, ipfsInitError } = useIpfs({
    repo: "/nemo",
    silent: true
  });

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
      {isIpfsReady && (
        <StyledColumnForm
          onSubmit={async event => {
            event.preventDefault();
            setDisabled(true);

            try {
              // Jungle testnet keys
              const { apiUrl, echoString } = formState.values;
              const content = Buffer.from(echoString);
              const results = await ipfs.add(content);
              debug(results)

              const {hash} = results[0];

              const signatureProvider = new JsSignatureProvider(keys);

              const rpc = new JsonRpc(apiUrl);

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
                        str: hash
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

              setOriginId(
                `${result.transaction_id}.NEMOTX.${result.processed.block_num}`
              );

              setSuccess("sent");
            } catch (err) {
              console.error(err);
              if (err instanceof RpcError)
                console.log(JSON.stringify(err.json, null, 2));

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
      )}

      <div style={{ color: "red" }}>
        {error.length > 0 && <span>ERROR: {error}</span>}
        {ipfsInitError && (
          <span>ERROR: {ipfsInitError.message || ipfsInitError}</span>
        )}
      </div>
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
