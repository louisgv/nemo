import React, { useState, useRef } from "react";
import styled from "styled-components";
import { durationList, useCatchCacheState } from "../_data";
import { createSelectOptionList } from "../core/utils";

import FileDrop from "react-file-drop";
import { FillButton } from "../_theme";

import fileReaderStream from "filereader-stream";
import neatCsv from "neat-csv";
import { csvDemo1Header } from "../data/csvConfig";
import { createCsvDemo1Payload } from "../api/csvDemo1";
import { Accordion, AccordionPanel, Box, Heading } from "grommet";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";

const StyledGrommet = styled(Grommet)`
  width: 100%;
`;

const DataContainer = styled.div`
  max-height: 30vh;
  overflow-y: auto;
`

const FileDropContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .file-drop {
    /* relatively position the container bc the contents are absolute */
    position: relative;
    height: 100px;
    width: 100%;
    border: 2px dashed;
  }

  .file-drop > .file-drop-target {
    cursor: pointer;

    /* basic styles */
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 2px;
    /* --------------- */

    /* horizontally and vertically center all content */
    display: flex;
    flex-direction: column;
    align-items: center;

    justify-content: center;
    align-content: center;
    text-align: center;
    /* --------------- */
  }

  .file-drop > .file-drop-target.file-drop-dragging-over-frame {
    /* overlay a black mask when dragging over the frame */
    border: none;
    background-color: ${p => p.theme.userFontColor};
    box-shadow: none;
    z-index: 50;
    opacity: 1;
    /* --------------- */

    /* typography */
    color: white;
    /* --------------- */
  }

  .file-drop > .file-drop-target.file-drop-dragging-over-target {
    /* turn stuff orange when we are dragging over the target */
    color: ${p => p.theme.headerBgColor};
    box-shadow: 0 0 13px 3px ${p => p.theme.headerBgColor};
  }
`;

const HiddenContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const HiddenFileInput = styled.div`
  display: none;
`;

const FileDropText = styled.div`
  padding: 1em;
`;

const AccordionContent = styled(Box)`
  height: 20vh;
  overflow-y: auto;
`;

const CodeContainer = styled.code`
  white-space: pre-wrap;
  font-size: smaller;
`;

export const CsvFileInput = ({ triggerNextStep }: any) => {
  const fileInputRef = useRef(null);

  const options = createSelectOptionList(durationList);

  const [disabled, setDisabled] = useState(false);

  const [catchCache, setCatchCache] = useCatchCacheState({});

  const [epcisXmlList, setEpcisXmlList] = useState([]);

  const processFile = async ([file]: any) => {
    console.log(file);

    if (!file) return;

    if (file.name.split(".").pop() !== "csv") {
      return;
    }

    const readerStream = fileReaderStream(file);
    const [headerData, ...csvRowList] = await neatCsv(readerStream, {
      headers: csvDemo1Header
    });

    console.log(csvRowList);

    const parsedData = await Promise.all(csvRowList.map(createCsvDemo1Payload));

    setEpcisXmlList(parsedData);
  };

  return (
    <FileDropContainer>
      {!disabled && (
        <>
          <HiddenContainer onClick={() => fileInputRef.current.click()}>
            <FileDrop onDrop={processFile}>
              <FileDropText>
                Drop your CSV file here, or tap the box to select a file.
              </FileDropText>
            </FileDrop>
            <HiddenFileInput>
              <input
                ref={fileInputRef}
                accept=".csv"
                type="file"
                onChange={evt => {
                  processFile(evt.target.files);
                }}
              />
            </HiddenFileInput>
          </HiddenContainer>
          {epcisXmlList.length > 0 && (
            <StyledGrommet theme={grommet}>
              <Heading size="small" level={2}>
                {epcisXmlList.length} event{epcisXmlList.length > 0 && "s"}{" "}
                found:
              </Heading>
              <DataContainer>
                <Accordion multiple margin="small">
                  {epcisXmlList.map((d, i) => (
                    <AccordionPanel key={i} label={`Event #${i + 1}`}>
                      <AccordionContent>
                        <CodeContainer>{d}</CodeContainer>
                      </AccordionContent>
                    </AccordionPanel>
                  ))}
                </Accordion>
              </DataContainer>
            </StyledGrommet>
          )}
        </>
      )}

      <FillButton
        disabled={disabled}
        onClick={() => {
          setDisabled(true);
          triggerNextStep();
        }}
      >
        Finalize
      </FillButton>
    </FileDropContainer>
  );
};
