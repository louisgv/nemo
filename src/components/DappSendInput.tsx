import React, { useState } from "react";
import styled from "styled-components";

import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

import {
  StyledInput,
  StyledColumn,
  StyledColumnForm,
  LabeledInput,
  FillButton
} from "../_theme";
import { strings } from "../i18n";
import { useFormState } from "react-use-form-state";

const debug = require("debug")("DappSendInput");

interface TestInputFields {
  echoString: string;
  serverString: string;
}

const Container = styled(StyledColumn)`
  word-break: break-word;
  margin: 0.5em;
`;

export const DappSendInput = ({ triggerNextStep }: any) => {
  const [disabled, setDisabled] = useState(false);
  const [formState, { text }] = useFormState<TestInputFields>({
    serverString: "https://api.jungle.alohaeos.com:443"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <Container>
      <StyledColumnForm
        onSubmit={async e => {
          e.preventDefault();
          setDisabled(true);

          // Jungle testnet keys
          const keys = [
            "5JjfJTnv7auXdk3QskJ79SiXo3dfJHhkH785AF7P7KedhyHkbLG",
            "5J74G7maytuLsujt5Bn14b3ifbHbgVtxVBU6aDBkpXsobdw4g3w",
            "5JdVxGhEgV481QDMS1PMDjhoQRdyuBssFnqjRnVWurpjgDeRb5z",
            "5JWmbWCHjMD59QUnwrmvCxTeYgc7PxVRVf4dYNtj7Zs7BjM2XnA"
          ];

          const account = {
            captain: "nemotestero3",
            producer: "nemotestero4"
          };

          const signatureProvider = new JsSignatureProvider(keys);

          try {
            const rpc = new JsonRpc(formState.values.serverString);

            const api = new Api({ rpc, signatureProvider });

            const result = await api.transact(
              {
                actions: [
                  {
                    account: "nemoeosmark1",
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

            setSuccess("sent");
          } catch (error) {
            console.error(e);
            if (e instanceof RpcError)
              console.log(JSON.stringify(e.json, null, 2));

            setError("Try a differrent P2P server...");
          }

          triggerNextStep();
        }}
      >
        <LabeledInput
          label={"P2P URL"}
          disabled={disabled}
          required
          {...text("serverString")}
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
        </div>
      )}
    </Container>
  );
};
