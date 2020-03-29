import React, { useState } from 'react'
import styled from 'styled-components'

import {
  FileDropContainer,
  CsvFileDrop,
  XmlDownloadButton
} from './CsvFileInput'

import { FillButton } from '../_theme'
import {
  createTrawlerXml,
  createBusinessDocumentHeaderXml as createBDHXml,
  createEpcClassXml,
  createLocationXml,
  createObjectEventXml,
  createTransformationEventXml,
  createAggregationEventXml
} from '../api/csvToXml/trawlerCsvToXml'

const debug = require('debug')('TrawlerEpcisToolsInput')

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

export const TrawlerEpcisToolsInput = ({ triggerNextStep }: any) => {
  const [disabled, setDisabled] = useState(false)
  const [bdhXml, setBdhXml] = useState('')
  const [bdhFileName, setBdhFileName] = useState('')

  const [epcClassXml, setEpcClassXml] = useState('')
  const [epcClassFileName, setEpcClassFileName] = useState('')

  const [locationXml, setLocationXml] = useState('')
  const [locationFileName, setLocationFileName] = useState('')

  const [objectEventXmlList, setObjectEventXmlList] = useState([])
  const [objectEventFileName, setObjectEventFileName] = useState('')

  const [transformationEventXmlList, setTransformationEventXmlList] = useState(
    []
  )
  const [
    transformationEventFileName,
    setTransformationEventFileName
  ] = useState('')

  const [aggregationEventXmlList, setAggregationEventXmlList] = useState([])
  const [aggregationEventFileName, setAggregationEventFileName] = useState('')

  const isAnyXmlValid = () =>
    !!bdhXml ||
    !!epcClassXml ||
    !!locationXml ||
    objectEventXmlList[0] ||
    transformationEventXmlList[0] ||
    aggregationEventXmlList[0]

  return (
    <FileDropContainer>
      <DropContainer>
        <StyledCsvFileDrop
          fileValid={!!bdhXml}
          dropText={!!bdhXml ? bdhFileName : 'BusinessDocumentHeader'}
          processFile={async ([file]) => {
            const newXml = await createBDHXml(file)
            if (!newXml) return
            debug(newXml)

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
            debug(newXml)

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
            debug(newXml)

            setLocationXml(newXml)
            setLocationFileName(file.name)
          }}
        />
        <StyledCsvFileDrop
          fileValid={objectEventXmlList[0]}
          dropText={objectEventXmlList[0] ? objectEventFileName : 'ObjectEvent'}
          processFile={async ([file]) => {
            const newXml = await createObjectEventXml(file)
            if (!newXml) return
            debug(newXml)

            setObjectEventXmlList(newXml)
            setObjectEventFileName(file.name)
          }}
        />
        <StyledCsvFileDrop
          fileValid={transformationEventXmlList[0]}
          dropText={
            transformationEventXmlList[0]
              ? transformationEventFileName
              : 'TransformationEvent'
          }
          processFile={async ([file]) => {
            const newXml = await createTransformationEventXml(file)
            if (!newXml) return
            debug(newXml)

            setTransformationEventXmlList(newXml)
            setTransformationEventFileName(file.name)
          }}
        />
        <StyledCsvFileDrop
          fileValid={aggregationEventXmlList[0]}
          dropText={
            aggregationEventXmlList[0]
              ? aggregationEventFileName
              : 'AggregationEvent'
          }
          processFile={async ([file]) => {
            const newXml = await createAggregationEventXml(file)
            debug(newXml)

            if (!newXml) return
            setAggregationEventXmlList(newXml)
            setAggregationEventFileName(file.name)
          }}
        />
      </DropContainer>

      <XmlDownloadButton
        disabled={!isAnyXmlValid()}
        fileLabel="Trawler"
        xml={createTrawlerXml({
          bdhXml,
          epcClassXml,
          locationXml,
          xmlList: [
            ...objectEventXmlList,
            ...transformationEventXmlList,
            ...aggregationEventXmlList
          ]
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
