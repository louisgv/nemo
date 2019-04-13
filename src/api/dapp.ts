import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

import { eosVault } from "../_data";

const debug = require("debug")("api.dapp");

export const createTransactionPayload = (actor: string, data: any) => {
  return {
    actions: [
      {
        account: "nemoeosmark1",
        name: "echo",
        authorization: [
          {
            actor,
            permission: "active"
          }
        ],
        data
      }
    ]
  }
}
