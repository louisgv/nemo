import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import { DateTime } from 'luxon'

import FileDrop from 'react-file-drop'
import { FillButton, Divider } from '../_theme'

import fileReaderStream from 'filereader-stream'
import neatCsv from 'neat-csv'
import {
  csvAggregatedCatchProcessHeader,
  csvAggregationDisaggregationHeader,
  csvShipReceiveHeader
} from '../api/csvToXml/csvHeader'
import {
  createSingleCatchAndProcessXml,
  createAggregatedCatchAndProcessXml
} from '../api/csvToXml/catchAndProcessXml'
import { Accordion, AccordionPanel, Box, Heading } from 'grommet'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import api from '../api'
import { saveAs } from 'file-saver'
import { createAggregatedAggregationDisaggregationXml } from '../api/csvToXml/aggregationDisaggregationXml'
import { createShipReceiveXml } from '../api/csvToXml/shipReceiveXml'

type SentStateType = 'default' | 'sending' | 'sent'

const StyledGrommet = styled(Grommet)`
  width: 100%;
`

const DataContainer = styled.div`
  max-height: 30vh;
  overflow-y: auto;
`

export const FileDropContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const HiddenContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;

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
`

const HiddenFileInput = styled.div`
  display: none;
`

const FileDropText = styled.div`
  padding: 1em;
`

const AccordionContent = styled(Box)`
  height: 20vh;
  overflow-y: auto;
`

const CodeContainer = styled.code`
  white-space: pre-wrap;
  font-size: smaller;
`

export const XmlDownloadButton = ({
  disabled = false,
  fileLabel,
  xml = '',
  downloadText = 'Download Aggregated XML'
}) => (
  <FillButton
    background={'limegreen'}
    disabled={disabled}
    onClick={() => {
      const blob = new Blob([xml], {
        type: 'application/xml;charet=ustf-8'
      })
      const dt = DateTime.local()

      const creationDate = dt.toISO()

      saveAs(blob, `GDST-EPCIS-${fileLabel}-${creationDate}.xml`)
    }}>
    {downloadText}
  </FillButton>
)

const AggregatedXmlDownload = ({
  disabled,
  fileLabel,
  eventCount = 0,
  aggregatedXml = null
}) => {
  return (
    aggregatedXml && (
      <>
        <Accordion margin="small">
          <AccordionPanel label={`Total ${eventCount} EPCIS Events`}>
            <AccordionContent>
              <CodeContainer>{aggregatedXml}</CodeContainer>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>

        <XmlDownloadButton
          fileLabel={fileLabel}
          xml={aggregatedXml}
          disabled={disabled}
        />
      </>
    )
  )
}

const EpcisEventList = ({ epcisXmlList = [] }) => {
  const [sent, setSent] = useState<SentStateType>('default')

  const onSubmit = async () => {
    setSent('sending')
    await Promise.all(epcisXmlList.map(api.freepcis.sendCatchEvent))
    setSent('sent')
  }

  return (
    epcisXmlList.length > 0 && (
      <>
        <Heading size="small" level={2}>
          {epcisXmlList.length} event{epcisXmlList.length > 0 && 's'} found:
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

        <Divider />
        <FillButton disabled={sent !== 'default'} onClick={onSubmit}>
          {sent === 'sending'
            ? 'Sending...'
            : sent === 'sent'
            ? 'Data sent!'
            : 'Send to FreEPCIS'}
        </FillButton>
      </>
    )
  )
}

export const CsvFileDrop = ({
  processFile,
  dropText = 'Drop your CSV file here, or tap the box to select a file.',
  className=''
}) => {
  const fileInputRef = useRef(null)

  return (
    <HiddenContainer onClick={() => fileInputRef.current.click()} className={className}>
      <FileDrop onDrop={processFile}>
        <FileDropText>{dropText}</FileDropText>
      </FileDrop>
      <HiddenFileInput>
        <input
          ref={fileInputRef}
          accept=".csv"
          type="file"
          onChange={evt => {
            processFile(evt.target.files)
          }}
        />
      </HiddenFileInput>
    </HiddenContainer>
  )
}

export const CsvFileInput = ({
  triggerNextStep,
  singleParser,
  aggregatedParser,
  fileLabel,
  headers
}: any) => {
  const [disabled, setDisabled] = useState(false)

  const [epcisXmlList, setEpcisXmlList] = useState([])

  const [aggregatedXml, setAggregatedXml] = useState(null)

  const [eventCount, setEventCount] = useState(0)

  const processFile = async ([file]: any) => {
    if (!file) return

    if (file.name.split('.').pop() !== 'csv') {
      return
    }

    const readerStream = fileReaderStream(file)
    const [, ...csvRowList] = (await neatCsv(readerStream, {
      headers
    })) as any

    console.log(csvRowList)
    if (singleParser) {
      setEpcisXmlList(await Promise.all(csvRowList.map(singleParser)))
    }

    if (aggregatedParser) {
      setAggregatedXml(await aggregatedParser(csvRowList))
      setEventCount(csvRowList.length)
    }
  }

  return (
    <FileDropContainer>
      {!disabled && (
        <>
          <CsvFileDrop processFile={processFile} />
          <StyledGrommet theme={grommet}>
            <EpcisEventList epcisXmlList={epcisXmlList} />

            <AggregatedXmlDownload
              disabled={disabled}
              fileLabel={fileLabel}
              eventCount={eventCount}
              aggregatedXml={aggregatedXml}
            />
          </StyledGrommet>
        </>
      )}

      <FillButton
        disabled={disabled}
        onClick={() => {
          setDisabled(true)
          triggerNextStep()
        }}>
        Finalize
      </FillButton>
    </FileDropContainer>
  )
}

export const CatchAndProcessCsvInput = props => (
  <CsvFileInput
    singleParser={createSingleCatchAndProcessXml}
    aggregatedParser={createAggregatedCatchAndProcessXml}
    fileLabel="CatchAndProcess"
    headers={csvAggregatedCatchProcessHeader}
    {...props}
  />
)

export const AggregationDisaggregationCsvInput = props => (
  <CsvFileInput
    aggregatedParser={createAggregatedAggregationDisaggregationXml}
    fileLabel="AggregationDisaggregation"
    headers={csvAggregationDisaggregationHeader}
    {...props}
  />
)

export const ShipReceiveCsvInput = props => (
  <CsvFileInput
    aggregatedParser={createShipReceiveXml}
    fileLabel="ShipReceive"
    headers={csvShipReceiveHeader}
    {...props}
  />
)
