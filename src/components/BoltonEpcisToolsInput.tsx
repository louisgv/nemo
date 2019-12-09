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
  createBusinessDocumentHeaderXml as createBDHXml,
  createEpcClassXml,
  createLocationXml,
  createObjectEventXml,
  createTransformationEventXml
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
  const [
    transformationEventFileName,
    setTransformationEventFileName
  ] = useState('')

  const [aggregationEventXml, setAggregationEventXml] = useState('')
  const [aggregationEventFileName, setAggregationEventFileName] = useState('')

  const isAllXmlValid = () =>
    !!bdhXml &&
    !!epcClassXml &&
    !!locationXml &&
    !!objectEventXml &&
    !!transformationEventXml &&
    !!aggregationEventXml

  return (
    <FileDropContainer>
      <DropContainer>
        <StyledCsvFileDrop
          fileValid={!!bdhXml}
          dropText={!!bdhXml ? bdhFileName : 'BusinessDocumentHeader'}
          processFile={async ([file]) => {
            const newXml = await createBDHXml(file)
            if (!newXml) return

            setBdhXml(newXml)
            setBdhFileName(file.name)
          }}
        />
        <StyledCsvFileDrop
          fileValid={!!epcClassXml}
          dropText={!!epcClassXml ? epcClassFileName : 'EPCClass'}
          processFile={async ([file]) => {
            const newXml = await createEpcClassXml(file)
            if (!newXml) return

            setEpcClassXml(newXml)
            setEpcClassFileName(file.name)
          }}
        />
        <StyledCsvFileDrop
          fileValid={!!locationXml}
          dropText={!!locationXml ? locationFileName : 'Location'}
          processFile={async ([file]) => {
            const newXml = await createLocationXml(file)
            if (!newXml) return

            setLocationXml(newXml)
            setLocationFileName(file.name)
          }}
        />
        <StyledCsvFileDrop
          fileValid={!!objectEventXml}
          dropText={!!objectEventXml ? objectEventFileName : 'ObjectEvent'}
          processFile={async ([file]) => {
            const newXml = await createObjectEventXml(file)
            if (!newXml) return
            
            setObjectEventXml(newXml)
            setObjectEventFileName(file.name)
          }}
        />
        <StyledCsvFileDrop
          fileValid={!!transformationEventXml}
          dropText={
            !!transformationEventXml
              ? transformationEventFileName
              : 'TransformationEvent'
          }
          processFile={async ([file]) => {
            const newXml = await createTransformationEventXml(file)
            if (!newXml) return
            console.log(newXml);

            setTransformationEventXml(newXml)
            setTransformationEventFileName(file.name)
          }}
        />
        <StyledCsvFileDrop
          fileValid={!!aggregationEventXml}
          dropText={
            !!aggregationEventXml
              ? aggregationEventFileName
              : 'AggregationEvent'
          }
          processFile={async ([file]) => {
            const newXml = await createBDHXml(file)
            if (!newXml) return
            setAggregationEventXml(newXml)
            setAggregationEventFileName(file.name)
          }}
        />
      </DropContainer>

      <XmlDownloadButton
        disabled={isAllXmlValid()}
        fileLabel="Bolton"
        xml={createBoltonXml({
          bdhXml,
          epcClassXml,
          locationXml,
          objectEventXml,
          transformationEventXml,
          aggregationEventXml
        })}
      />

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
