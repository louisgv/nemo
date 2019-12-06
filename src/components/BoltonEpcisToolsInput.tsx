import React, { useState } from 'react'
import styled from 'styled-components'

import {
  FileDropContainer,
  CsvFileDrop,
  XmlDownloadButton
} from './CsvFileInput'

import { FillButton } from '../_theme'
import {
  createBoltonXml,
  createBusinessDocumentHeaderXml as createBDHXml
} from '../api/csvToXml/boltonCsvToXml'

type FileDropProps = {
  fileValid?: boolean
}

const StyledCsvFileDrop = styled(CsvFileDrop)<FileDropProps>`
  margin-bottom: 0.5em;
  width: 30%;
  min-width: 250px;
  .file-drop {
    height: 50px;
    color: ${p =>
      p.fileValid ? p.theme.headerBgColor : p.theme.userFontColor};
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
  const [bdhXml, setBdhXml] = useState('')
  const [bdhFileName, setBdhFileName] = useState('')

  const [epcClassXml, setEpcClassXml] = useState('')
  const [epcClassFileName, setEpcClassFileName] = useState('')

  const [locationXml, setLocationXml] = useState('')
  const [locationFileName, setLocationFileName] = useState('')

  const [objectEventXml, setObjectEventXml] = useState('')
  const [objectEventFileName, setObjectEventFileName] = useState('')
 
  const [transformationEventXml, setTransformationEventXml] = useState('')
  const [transformationEventFileName, setTransformationEventFileName] = useState('')

  const [aggregationEventXml, setAggregationEventXml] = useState('')
  const [aggregationEventFileName, setAggregationEventFileName] = useState('')

  return (
    <FileDropContainer>
      <DropContainer>
        <StyledCsvFileDrop
          fileValid={!!bdhXml}
          dropText={!!bdhXml ? bdhFileName : 'BusinessDocumentHeader'}
          processFile={async ([file]) => {
            const newBdhXml = await createBDHXml(file)
            if (!newBdhXml) return

            setBdhXml(newBdhXml)
            setBdhFileName(file.name)

            console.log(newBdhXml);
            
          }}
        />
        <StyledCsvFileDrop
          dropText="EPCClass"
          processFile={async ([file]) => {
            const newBDHXml = await createBDHXml(file)
            setEpcClassXml(newBDHXml)
          }}
        />
        <StyledCsvFileDrop
          dropText="Location"
          processFile={async ([file]) => {
            const newBDHXml = await createBDHXml(file)
            setLocationXml(newBDHXml)
          }}
        />
        <StyledCsvFileDrop
          dropText="ObjectEvent"
          processFile={async ([file]) => {
            const newBDHXml = await createBDHXml(file)
            setObjectEventXml(newBDHXml)
          }}
        />
        <StyledCsvFileDrop
          dropText="TransformationEvent"
          processFile={async ([file]) => {
            const newBDHXml = await createBDHXml(file)
            setTransformationEventXml(newBDHXml)
          }}
        />
        <StyledCsvFileDrop
          dropText="AggregationEvent"
          processFile={async ([file]) => {
            const newBDHXml = await createBDHXml(file)
            setAggregationEventXml(newBDHXml)
          }}
        />
      </DropContainer>

      <XmlDownloadButton fileLabel="Bolton" xml={createBoltonXml()} />

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
