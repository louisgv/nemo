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

export const claimCatchEvent = async ({ txId, apiUrl }: any, ipfs: any) => {

  // debug()
  const { account, table, keys } = dappVault;

  const signatureProvider = new JsSignatureProvider(keys);

  const rpc = new JsonRpc(apiUrl);

  const api = new Api({ rpc, signatureProvider });

  const tableData = await rpc.get_table_rows({
    json: true,                 // Get the response as json
    code: account.contract,           // Contract that we target
    scope: account.contract,           // Account that owns the data
    table,          // Table name
    lower_bound: txId,      // Table primary key value
    limit: 1,                   // Here we limit to 1 to get only the
    show_payer: false,         // Optional: Show ram payer
  })

  debug(tableData);
  // result.trx.trx.actions;

  const [{
    buyer,
    seller,
    price,
    tax,
    value
  }] = tableData.rows

  if (buyer.length > 0) {
    throw new Error('Record is already claimed')
  }

  const result = await api.transact(
    {
      actions: [
        {
          account: account.eosiotoken,
          name: "transfer",
          authorization: [
            {
              actor: account.producer,
              permission: "active"
            }
          ],
          data: {
            from: account.producer,
            to: seller,
            quantity: price,
            memo: `payment for ${value}`
          }
        },
        {
          account: account.eosiotoken,
          name: "transfer",
          authorization: [
            {
              actor: account.producer,
              permission: "active"
            }
          ],
          data: {
            from: account.producer,
            to: account.contract,
            quantity: tax,
            memo: `tax for ${value}`
          }
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30
    }
  );

  const receipt = encodeNemoTXValue(result.transaction_id, result.processed.block_num)

  const claimResult = await api.transact(
    {
      actions: [
        {
          account: account.contract,
          name: "claim",
          authorization: [
            {
              actor: account.producer,
              permission: "active"
            }
          ],
          data: {
            buyer: account.producer,
            id: txId,
            receipt
          }
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30
    }
  );

  const epcisDataBuffer = await ipfs.cat(value)

  return {
    epcisData: epcisDataBuffer.toString('utf8'),
    originId: encodeNemoTXValue(claimResult.transaction_id, claimResult.processed.block_num)
  }
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

  return {
    ipfsHash: hash,
    originId: encodeNemoTXValue(result.transaction_id, result.processed.block_num)
  }
};
