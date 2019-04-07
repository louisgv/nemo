import React, { useState } from "react";

import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

import { strings } from "../i18n";
import { StyledSubmitButton, StyledColumnForm } from "../_theme";

const debug = require("debug")("DappSendInput");

export const DappSendInput = ({ triggerNextStep }: any) => {
  return (
    <StyledColumnForm
      onSubmit={async e => {
        e.preventDefault();

        // Jungle testnet keys
        const keys = [
          "5JjfJTnv7auXdk3QskJ79SiXo3dfJHhkH785AF7P7KedhyHkbLG",
          "5J74G7maytuLsujt5Bn14b3ifbHbgVtxVBU6aDBkpXsobdw4g3w",
          "5JdVxGhEgV481QDMS1PMDjhoQRdyuBssFnqjRnVWurpjgDeRb5z",
          "5JWmbWCHjMD59QUnwrmvCxTeYgc7PxVRVf4dYNtj7Zs7BjM2XnA"
        ];

        const signatureProvider = new JsSignatureProvider(keys);

        const rpc = new JsonRpc("http://35.165.133.251:8888");

        const api = new Api({ rpc, signatureProvider });
        try {
          
          const result = await api.transact(
            {
              actions: [
                {
                  account: "nemoeosmark1",
                  name: "hi",
                  authorization: [
                    {
                      actor: "nemotestero4",
                      permission: "active"
                    }
                  ],
                  data: {
                    user: "nemotestero3"
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
        } catch (error) {
          console.error(e);
          if (e instanceof RpcError)
            console.log(JSON.stringify(e.json, null, 2));
        }

        triggerNextStep();
      }}
    >
      <StyledSubmitButton />
    </StyledColumnForm>
  );
};
