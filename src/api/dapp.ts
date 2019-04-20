const debug = require("debug")("api.dapp");
import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

// Jungle testnet keys
export const dappVault = {
  ipfsRepo: '/nemo',
  apiUrl: "https://api.jungle.alohaeos.com:443",
  keys: [
    "5JjfJTnv7auXdk3QskJ79SiXo3dfJHhkH785AF7P7KedhyHkbLG",
    "5J74G7maytuLsujt5Bn14b3ifbHbgVtxVBU6aDBkpXsobdw4g3w",
    "5JdVxGhEgV481QDMS1PMDjhoQRdyuBssFnqjRnVWurpjgDeRb5z",
    "5JWmbWCHjMD59QUnwrmvCxTeYgc7PxVRVf4dYNtj7Zs7BjM2XnA"
  ],
  table: 'nemotablemk2',
  account: {
    eosiotoken: "eosio.token",
    contract: "nemoeosmark1",
    captain: "nemotestero3",
    producer: "nemotestero4"
  }
}

export const encodeNemoTXValue = (id: string, blockNum: any) => `${id}.NEMOTX.${blockNum}`

export const decodeNemoTXValue = (tx: string) => tx.split('.NEMOTX.')

export const getCatchEvent = async ({ verifyId, txId, apiUrl }: any, ipfs: any) => {

  // debug()
  const { account, table, keys } = dappVault;

  const signatureProvider = new JsSignatureProvider(keys);

  const rpc = new JsonRpc(apiUrl);

  const api = new Api({ rpc, signatureProvider });

  const [verifyTxId, blockNum] = decodeNemoTXValue(verifyId)

  const [verifyTx, tableRow] = await Promise.all([
    api.rpc.history_get_transaction(
      verifyTxId,
      parseInt(blockNum)
    ),
    rpc.get_table_rows({
      json: true,                 // Get the response as json
      code: account.contract,           // Contract that we target
      scope: account.contract,           // Account that owns the data
      table,          // Table name
      lower_bound: txId,      // Table primary key value
      limit: 1,                   // Here we limit to 1 to get only the
      show_payer: false,         // Optional: Show ram payer
    })
  ])

  debug(verifyTx, tableRow);

  // const [nemoTx] = result.trx.trx.actions;

}

export const sendCatchEvent = async ({
  apiUrl,
  price
}: any, ipfs: any, body: any) => {

  const { account, keys } = dappVault;

  const content = Buffer.from(body);
  const results = await ipfs.add(content);

  const { hash } = results[0];

  const signatureProvider = new JsSignatureProvider(keys);

  const rpc = new JsonRpc(apiUrl);

  const api = new Api({ rpc, signatureProvider });

  const result = await api.transact(
    {
      actions: [
        {
          account: account.contract,
          name: "submit",
          authorization: [
            {
              actor: account.captain,
              permission: "active"
            }
          ],
          data: {
            seller: account.captain,
            value: hash,
            price,
          }
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30
    }
  );

  return encodeNemoTXValue(result.transaction_id, result.processed.block_num)
};
