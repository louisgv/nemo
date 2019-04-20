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
import { dappVault } from "../api/dapp";

const debug = require("debug")("DappReceiveInput");

interface TestInputFields {
  txString: string;
  apiUrl: string;
}

const Container = styled(StyledColumn)`
  word-break: break-word;
  margin: 0.5em;
`;

export const DappReceiveInput = ({ triggerNextStep, previousStep }: any) => {
  const { keys, apiUrl } = dappVault;

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
          setDisabled(true);

          const signatureProvider = new JsSignatureProvider(keys);

          try {
            const rpc = new JsonRpc(formState.values.apiUrl);

            const api = new Api({ rpc, signatureProvider });

            const [txId, blockNum] = formState.values.txString.split(
              ".NEMOTX."
            );

            const result = await api.rpc.history_get_transaction(
              txId,
              parseInt(blockNum)
            );

            // (formState.values.txString);

            // Sending money
            // await api.transact(
            //   {
            //     actions: [
            //       {
            //         account: account.eosiotoken,
            //         name: "transfer",
            //         authorization: [
            //           {
            //             actor: account.producer,
            //             permission: "active"
            //           }
            //         ],
            //         data: {
            //           from: account.producer,
            //           to: account.captain,
            //           quantity: "0.0020 EOS",
            //           memo: ""
            //         }
            //       }
            //     ]
            //   },
            //   {
            //     blocksBehind: 3,
            //     expireSeconds: 30
            //   }
            // );

            // Get balance
            // await rpc.get_currency_balance(
            //   account.eosiotoken,
            //   account.contract,
            //   "EOS"
            // );

            // await rpc.get_table_rows({
            //   json: true, // Get the response as json
            //   code: account.eosiotoken, // Contract that we target
            //   scope: account.eosiotoken, // Account that owns the data
            //   table: "accounts", // Table name
            //   lower_bound: account.contract,
            //   limit: 10, // Maximum number of rows that we want to get
            //   reverse: true, // Optional: Get reversed data
            //   show_payer: true // Optional: Show ram payer
            // });

            debug(result);

            const [nemoTx] = result.trx.trx.actions;

            setSuccess(`IPFS URL: ${nemoTx.data.str}`);
          } catch (err) {
            console.error(err);
            if (err instanceof RpcError)
              console.log(JSON.stringify(err.json, null, 2));

            setError("Try a differrent P2P server...");
          }

          triggerNextStep();
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
          label={"TX ID"}
          required
          {...text("txString")}
          placeholder={"put Transaction ID here . . ."}
        />

        <FillButton disabled={disabled}>Submit</FillButton>
      </StyledColumnForm>
      {error.length > 0 && <div style={{ color: "red" }}>ERROR: {error}</div>}
      {success.length > 0 && <div>{success}</div>}
    </Container>
  );
};
