import React, { useState } from 'react'
import styled from 'styled-components'

import { FileDropContainer, CsvFileDrop, XmlDownloadButton } from './CsvFileInput'

import { createAggregatedAggregationDisaggregationXml } from '../api/csvToXml/aggregationDisaggregationXml'

import { csvAggregationDisaggregationHeader } from '../api/csvToXml/csvHeader'
import { FillButton } from '../_theme'
import { createBoltonXml } from '../api/csvToXml/boltonCsvToXml'

const StyledCsvFileDrop = styled(CsvFileDrop)`
  margin-bottom: 0.5em;
  width: 30%;
  min-width: 250px;
  .file-drop {
    height: 50px;
  }
`

const DropContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-flow: wrap;
  justify-content: space-around;
`

export const BoltonEpcisToolsInput = ({ triggerNextStep }: any) => {
  const [disabled, setDisabled] = useState(false)

  const processHeader = () => {}

  return (
    <FileDropContainer>
      <DropContainer>
        <StyledCsvFileDrop
          dropText="BusinessDocumentHeader"
          processFile={processHeader}
        />
        <StyledCsvFileDrop
          dropText="EPCClass"
          processFile={processHeader}
        />
        <StyledCsvFileDrop
          dropText="Location"
          processFile={processHeader}
        />
        <StyledCsvFileDrop
          dropText="ObjectEvent"
          processFile={processHeader}
        />
        <StyledCsvFileDrop
          dropText="TransformationEvent"
          processFile={processHeader}
        />
        <StyledCsvFileDrop
          dropText="AggregationEvent"
          processFile={processHeader}
        />
      </DropContainer>

      <XmlDownloadButton fileLabel="Bolton" xml={createBoltonXml()}/>

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
