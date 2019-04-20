import React, { useState } from "react";
import styled from "styled-components";
import copy from "copy-to-clipboard";

import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

import {
  StyledColumn,
  StyledColumnForm,
  LabeledInput,
  FillButton,
  Divider,
  StyledLabel
} from "../_theme";
import { useFormState } from "react-use-form-state";
import { dappVault, claimCatchEvent } from "../api/dapp";
import { useIpfs } from "../hooks/use-ipfs";
import api from "../api";

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

const EpcisDataContainer = styled.div`
  overflow: scroll;
  height: 30vh;
`;

const EpcisDataViewer = styled.code`
  font-size: 10px;
`;

export const DappProducerReceiveInput = ({
  triggerNextStep,
  previousStep
}: any) => {
  const { apiUrl } = dappVault;

  const { ipfs, isIpfsReady, ipfsInitError } = useIpfs();

  const [disabled, setDisabled] = useState(false);
  const [formState, { text }] = useFormState<TestInputFields>({
    apiUrl
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [epcisData, setEpcisData] = useState("");
  const [receiptId, setReceiptId] = useState("");

  const onFinish = async (event: any) => {
    event.preventDefault();
    setDisabled(true);
    triggerNextStep();
  };

  return (
    <Container>
      {isIpfsReady && (
        <StyledColumnForm
          onSubmit={async event => {
            event.preventDefault();

            try {
              const catchResult = await claimCatchEvent(formState.values, ipfs);

              setReceiptId(catchResult.originId);
              setEpcisData(catchResult.epcisData);

              setSuccess("sent");
              // setSuccess(`IPFS URL: ${nemoTx.data.str}`);
            } catch (err) {
              console.error(err);
              if (err instanceof RpcError) {
                console.log(JSON.stringify(err.json, null, 2));
              } 
              setError(err.message);
            }
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

          {/* <LabeledInput
            disabled={disabled}
            label={"CODE"}
            {...text("verifyId")}
            placeholder={"(optional) Claim Code"}
          /> */}

          <FillButton disabled={disabled}>Pay and Claim</FillButton>
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
          <StyledLabel>
            Paid and claimed. Will take ~3 minutes for it to register -
          </StyledLabel>
          <a
            href="https://jungle.eosweb.net/account/nemoeosmark1"
            target="_blank"
          >
            https://jungle.eosweb.net/account/nemoeosmark1
          </a>
          <Divider />
          <StyledLabel> Check your balance here: </StyledLabel>
          <a
            href="https://jungle.eosweb.net/account/nemotestero4"
            target="_blank"
          >
            https://jungle.eosweb.net/account/nemotestero4
          </a>
          <Divider />
          <StyledLabel> Here is your Receipt ID: </StyledLabel>
          <br />
          {receiptId}
          <br />
          <FillButton onClick={() => copy(receiptId)}>
            Click to Copy Receipt ID
          </FillButton>
          <Divider />
          <StyledLabel> Here is the EPCIS data: </StyledLabel>

          <EpcisDataContainer>
            <EpcisDataViewer>{epcisData}</EpcisDataViewer>
          </EpcisDataContainer>

          <FillButton onClick={() => copy(epcisData)}>
            Click to Copy EPCIS
          </FillButton>
          <FillButton
            disabled={disabled}
            onClick={async e => {
              e.preventDefault();
              setDisabled(true);
              await api.freepcis.sendCatchEvent(epcisData);
              triggerNextStep();
            }}
          >
            Send to FreEPCIS
          </FillButton>
        </div>
      )}
      <FillButton
        disabled={disabled}
        style={{ background: "red" }}
        onClick={onFinish}
      >
        Finalize/Cancel
      </FillButton>
    </Container>
  );
};
