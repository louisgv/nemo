import neatCsv from 'neat-csv'
import { createCsvFileReaderStream, parseUom } from '.'
import {
  csvBusinessDocumentHeader,
  csvEpcClassHeader,
  csvLocationHeader,
  csvObjectEventHeader,
  csvTransformationEventHeader,
  csvAggregationEventHeader
} from './csvHeader'
import { DateTime } from 'luxon'

const withIgnoreError = async fx => {
  try {
    return fx()
  } catch (error) {
    console.error(error)
    return ''
  }
}

const parseCsvColumnList = ({ csvData, index, indexKey, itemKeyList }) => {
  const dataList = []

  const currentData = csvData[index]

  if (itemKeyList.filter(k => !!currentData[k]).length === 0) return dataList

  if (index < csvData.length - 1) {
    let j = 0
    do {
      const nextItem = csvData[index + j]
      if (
        itemKeyList.filter((k: string | number) => !!nextItem[k]).length > 0
      ) {
        const newItem = {}

        itemKeyList.forEach((k: string | number) => {
          newItem[k] = nextItem[k] || currentData[k]
        })

        dataList.push(newItem)
      }
      j++
    } while (csvData[index + j] && !csvData[index + j][indexKey])
  }
  return dataList
}

export const createAggregationEventXml = file =>
  withIgnoreError(async () => {
    const readerStream = createCsvFileReaderStream(file)
    const parsedData = (await neatCsv(readerStream, {
      headers: csvAggregationEventHeader,
      skipLines: 5
    })) as any
    return parsedData
      .map(
        (
          {
            action,
            bizStep,
            informationProvider,
            productOwner,
            parentID,
            eventTime,
            eventTimeZoneOffset,
            visibilityEvent,
            disposition,
            readPoint_id,
            bizLocation_id,
            ...rest
          },
          index
        ) => {
          if (!action || !bizStep || !eventTime || !informationProvider)
            return ''

          const epcItemsXml = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: ['childEPCs_epc']
          })
            .map(d => `<epc>${d.childEPCs_epc}</epc>`)
            .join('\n')

          const childEPCsXml = !!epcItemsXml
            ? `<childEPCs>${epcItemsXml}</childEPCs>`
            : ''

          const childQuantityListItem = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'extension_childQuantityList_quantityElement_epcClass',
              'extension_childQuantityList_quantityElement_quantity',
              'extension_childQuantityList_quantityElement_uom'
            ]
          })
            .map(
              d => `<quantityElement><epcClass>${d.extension_childQuantityList_quantityElement_epcClass}</epcClass>
    <quantity>${d.extension_childQuantityList_quantityElement_quantity}</quantity>
    <uom>${d.extension_childQuantityList_quantityElement_uom}</uom>
  </quantityElement>`
            )
            .join('\n')

          const childQuantityListXml = !!childQuantityListItem
            ? `<childQuantityList>${childQuantityListItem}</childQuantityList>`
            : ''

          const extensionItemsXml = [childQuantityListXml].join('\n')

          const extensionXml = !!extensionItemsXml
            ? `<extension>${extensionItemsXml}</extension>`
            : ''

          return `<AggregationEvent>
  <eventTime>${eventTime}</eventTime> 
  <eventTimeZoneOffset>${eventTimeZoneOffset}</eventTimeZoneOffset>
  <action>${action}</action>
  <bizStep>urn:epcglobal:cbv:bizstep:${bizStep}</bizStep>
  <disposition>urn:epcglobal:cbv:disp:${disposition}</disposition>
  <disposition>urn:epcglobal:cbv:disp:${disposition}</disposition>
  <parentID>${parentID}</parentID> <!--  Pallet ID -->

  <gdst:visibilityEvent>${visibilityEvent}</gdst:visibilityEvent>
  <gdst:productOwner>${productOwner}</gdst:productOwner>
  <cbvmda:informationProvider>${informationProvider}</cbvmda:informationProvider> 
  
  <readPoint><id>${readPoint_id}</id></readPoint>
  <bizLocation><id>${bizLocation_id}</id></bizLocation>
  ${childEPCsXml}
  ${extensionXml}
</AggregationEvent>`
        }
      )
      .join('\n')
  })
export const createTransformationEventXml = file =>
  withIgnoreError(async () => {
    const readerStream = createCsvFileReaderStream(file)
    const parsedData = (await neatCsv(readerStream, {
      headers: csvTransformationEventHeader,
      skipLines: 4
    })) as any
    return parsedData
      .map(
        (
          {
            bizStep,
            informationProvider,
            productOwner,
            eventTime,
            eventTimeZoneOffset,
            visibilityEvent,
            disposition,
            readPoint_id,
            bizLocation_id,
            ...rest
          },
          index
        ) => {
          if (!bizStep || !eventTime || !informationProvider) return ''

          const inputQuantityItemXml = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'inputQuantityList_quantityElement_epcClass',
              'inputQuantityList_quantityElement_quantity',
              'inputQuantityList_quantityElement_uom'
            ]
          })
            .map(
              d =>
                `<quantityElement> 
  <epcClass>${d.inputQuantityList_quantityElement_epcClass}</epcClass>
  <quantity>${d.inputQuantityList_quantityElement_quantity}</quantity>
  ${
    d.inputQuantityList_quantityElement_uom
      ? `<uom>${d.inputQuantityList_quantityElement_uom}</uom>`
      : ''
  }
</quantityElement>`
            )
            .join('\n')

          const inputQuantityListXml = !!inputQuantityItemXml
            ? `<inputQuantityList>${inputQuantityItemXml}</inputQuantityList>`
            : ''

          const outputQuantityItemXml = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'outputQuantityList_quantityElement_epcClass',
              'outputQuantityList_quantityElement_quantity',
              'outputQuantityList_quantityElement_uom'
            ]
          })
            .map(
              d =>
                `<quantityElement> 
    <epcClass>${d.outputQuantityList_quantityElement_epcClass}</epcClass>
    <quantity>${d.outputQuantityList_quantityElement_quantity}</quantity>
    ${
      d.outputQuantityList_quantityElement_uom
        ? `<uom>${d.outputQuantityList_quantityElement_uom}</uom>`
        : ''
    }
  </quantityElement>`
            )
            .join('\n')

          const outputQuantityListXml = !!outputQuantityItemXml
            ? `<inputQuantityList>${outputQuantityItemXml}</inputQuantityList>`
            : ''

          const ilmdCbvmdaItemsXml = [
            'lotNumber',
            'productionDate',
            'bestBeforeDate',
            'preservationTechniqueCode'
          ]
            .filter(k => !!rest[`ilmd_${k}`])
            .map(k => `<cbvmda:${k}>${rest[`ilmd_${k}`]}</cbvmda:${k}>`)
            .join('\n')

          const ilmdCertificationItemsXml = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'ilmd_certificationList_certification_certificationAgency',
              'ilmd_certificationList_certification_certificationIdentification',
              'ilmd_certificationList_certification_certificationStandard',
              'ilmd_certificationList_certification_certificationValue'
            ]
          })
            .map(
              d => `<certification>
  <certificationStandard>${d.ilmd_certificationList_certification_certificationStandard}</certificationStandard> 
  <certificationAgency>${d.ilmd_certificationList_certification_certificationAgency}</certificationAgency>
  <certificationValue>${d.ilmd_certificationList_certification_certificationValue}</certificationValue>
  <certificationIdentification>${d.ilmd_certificationList_certification_certificationIdentification}</certificationIdentification>
</certification>`
            )
            .join('\n')
            .trim()

          const ilmdCertificationXml = !!ilmdCertificationItemsXml
            ? `<cbvmda:certificationList>${ilmdCertificationItemsXml}</cbvmda:certificationList>`
            : ''
          const ilmdItemsXml = [ilmdCbvmdaItemsXml, ilmdCertificationXml]
            .join('\n')
            .trim()

          const ilmdXml = !!ilmdItemsXml
            ? `<ilmd>
                ${ilmdItemsXml}
              </ilmd>`
            : ''

          return `<extension>
<TransformationEvent>
  <eventTime>${eventTime}</eventTime> 
  <eventTimeZoneOffset>${eventTimeZoneOffset}</eventTimeZoneOffset>
  <bizStep>urn:epcglobal:cbv:bizstep:${bizStep}</bizStep>
  <disposition>urn:epcglobal:cbv:disp:${disposition}</disposition>
  
  <gdst:visibilityEvent>${visibilityEvent}</gdst:visibilityEvent>
  <gdst:productOwner>${productOwner}</gdst:productOwner> 
  <cbvmda:informationProvider>${informationProvider}</cbvmda:informationProvider>   
  
  <readPoint><id>${readPoint_id}</id></readPoint>
  <bizLocation><id>${bizLocation_id}</id></bizLocation>

  ${inputQuantityListXml}
  ${outputQuantityListXml}
  ${ilmdXml}
</TransformationEvent>
</extension>`
        }
      )
      .join('\n')
  })

export const createObjectEventXml = file =>
  withIgnoreError(async () => {
    const readerStream = createCsvFileReaderStream(file)
    const parsedData = (await neatCsv(readerStream, {
      headers: csvObjectEventHeader,
      skipLines: 5
    })) as any

    return parsedData
      .map(
        (
          {
            action,
            bizStep,
            informationProvider,
            productOwner,
            eventTime,
            eventTimeZoneOffset,
            visibilityEvent,
            disposition,
            readPoint_id,
            bizLocation_id,
            ...rest
          },
          index
        ) => {
          if (!action || !eventTime || !informationProvider) return ''

          //#region parse basic lists
          const epcItemsXml = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: ['epcList_epc']
          })
            .map(d => `<epc>${d.epcList_epc}</epc>`)
            .join('\n')

          const epcListXml = !!epcItemsXml
            ? `<epcList>${epcItemsXml}</epcList>`
            : ''

          const bizTransactionItem = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'bizTransactionList_bizTransaction_type',
              'bizTransactionList_bizTransaction_value'
            ]
          })
            .map(
              d =>
                `<bizTransaction type="urn:epcglobal:cbv:btt:${d.bizTransactionList_bizTransaction_type}">${d.bizTransactionList_bizTransaction_value}</bizTransaction>`
            )
            .join('\n')

          const bizTransactionListXml = !!bizTransactionItem
            ? `<bizTransactionList>${bizTransactionItem}</bizTransactionList>`
            : ''

          const sourceListItem = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'extension_sourceList_source_type',
              'extension_sourceList_source_value'
            ]
          })
            .map(
              d =>
                `<source type="urn:epcglobal:cbv:sdt:${d.extension_sourceList_source_type}">${d.extension_sourceList_source_value}</source>`
            )
            .join('\n')

          const sourceListXml = !!sourceListItem
            ? `<sourceList>${sourceListItem}</sourceList>`
            : ''

          const destinationListItem = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'extension_destinationList_destination_type',
              'extension_destinationList_destination_value'
            ]
          })
            .map(
              d =>
                `<destination type="urn:epcglobal:cbv:sdt:${d.extension_destinationList_destination_type}">${d.extension_destinationList_destination_value}</destination>`
            )
            .join('\n')

          const destinationListXml = !!destinationListItem
            ? `<destinationList>${destinationListItem}</destinationList>`
            : ''

          const quantityListItem = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'extension_quantityList_quantityElement_epcClass',
              'extension_quantityList_quantityElement_quantity',
              'extension_quantityList_quantityElement_uom'
            ]
          })
            .map(
              d => `<quantityElement><epcClass>${d.extension_quantityList_quantityElement_epcClass}</epcClass>
  <quantity>${d.extension_quantityList_quantityElement_quantity}</quantity>
  <uom>${d.extension_quantityList_quantityElement_uom}</uom>
</quantityElement>`
            )
            .join('\n')

          const quantityListXml = !!quantityListItem
            ? `<quantityList>${quantityListItem}</quantityList>`
            : ''
          //#endregion

          //#region parse ilmd
          const ilmdCbvmdaItemsXml = [
            'productionMethodCode',
            'harvestEndDate',
            'harvestStartDate',
            'unloadingPort'
          ]
            .filter(k => !!rest[`extension_ilmd_${k}`])
            .map(
              k => `<cbvmda:${k}>${rest[`extension_ilmd_${k}`]}</cbvmda:${k}>`
            )
            .join('\n')

          const ilmdGdstItemsXml = [
            'FIP',
            'harvestCertification',
            'harvestCertificationCoC',
            'ISSF',
            'landingDateEnd',
            'landingDateStart',
            'ratingsScheme',
            'ratingsScore',
            'vesselRegistryLink',
            'vesselTransponder'
          ]
            .filter(k => !!rest[`extension_ilmd_${k}`])
            .map(k => `<gdst:${k}>${rest[`extension_ilmd_${k}`]}</gdst:${k}>`)
            .join('\n')

          const ilmdCertificationItemsXml = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'extension_ilmd_certificationList_certification_certificationAgency',
              'extension_ilmd_certificationList_certification_certificationIdentification',
              'extension_ilmd_certificationList_certification_certificationStandard',
              'extension_ilmd_certificationList_certification_certificationValue'
            ]
          })
            .map(
              d => `<certification>
  <certificationStandard>${d.extension_ilmd_certificationList_certification_certificationStandard}</certificationStandard> 
  <certificationAgency>${d.extension_ilmd_certificationList_certification_certificationAgency}</certificationAgency>
  <certificationValue>${d.extension_ilmd_certificationList_certification_certificationValue}</certificationValue>
  <certificationIdentification>${d.extension_ilmd_certificationList_certification_certificationIdentification}</certificationIdentification>
</certification>`
            )
            .join('\n')
            .trim()

          const ilmdCertificationXml = !!ilmdCertificationItemsXml
            ? `<cbvmda:certificationList>${ilmdCertificationItemsXml}</cbvmda:certificationList>`
            : ''

          const ilmdItemsXml = [
            ilmdCbvmdaItemsXml,
            ilmdGdstItemsXml,
            ilmdCertificationXml
          ]
            .join('\n')
            .trim()

          const ilmdXml = !!ilmdItemsXml
            ? `<ilmd>
              ${ilmdItemsXml}
            </ilmd>`
            : ''

          //#endregion

          const extensionItemsXml = [
            sourceListXml,
            destinationListXml,
            quantityListXml,
            ilmdXml
          ].join('\n')

          const extensionXml = !!extensionItemsXml
            ? `<extension>${extensionItemsXml}</extension>`
            : ''

          return `<ObjectEvent>
    <eventTime>${eventTime}</eventTime> 
    <eventTimeZoneOffset>${eventTimeZoneOffset}</eventTimeZoneOffset>
    <action>${action}</action>
    <bizStep>urn:epcglobal:cbv:bizstep:${bizStep}</bizStep>
    <disposition>urn:epcglobal:cbv:disp:${disposition}</disposition>
    <readPoint><id>${readPoint_id}</id></readPoint>
    <bizLocation><id>${bizLocation_id}</id></bizLocation>
    
    <gdst:visibilityEvent>${visibilityEvent}</gdst:visibilityEvent>
    <gdst:productOwner>${productOwner}</gdst:productOwner>
    <cbvmda:informationProvider>${informationProvider}</cbvmda:informationProvider> 
    ${epcListXml}
    ${bizTransactionListXml}
    ${extensionXml}
</ObjectEvent>`
        }
      )
      .join('\n')
  })

export const createLocationXml = file =>
  withIgnoreError(async () => {
    const readerStream = createCsvFileReaderStream(file)
    const parsedData = (await neatCsv(readerStream, {
      headers: csvLocationHeader,
      skipLines: 3
    })) as any

    const vocabArrayKeyList = [
      'geofencePolygonPolygonPointSeq',
      'geofencePolygonPolygonPointValue'
    ]

    const vocabElementListItems = parsedData
      .map(
        (
          {
            id,
            informationProvider,

            ...optionalAttributeMap
          },
          index
        ) => {
          if (!id) return ''
          const optionalAttributeItems = Object.entries(optionalAttributeMap)
            .filter(([k, v]) => !!v && !vocabArrayKeyList.includes(k))
            .map(
              ([k, v]) =>
                `<attribute id="urn:epcglobal:cbv:mda#${k}">${v}</attribute>`
            )
            .join('\n')

          const polygonItemsXml = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'id',
            itemKeyList: vocabArrayKeyList
          })
            .map(
              d =>
                `<polygonPoint seq="${d.geofencePolygonPolygonPointSeq}">${d.geofencePolygonPolygonPointValue}</polygonPoint>`
            )
            .join('\n')
            .trim()

          const geofanceXml = !!polygonItemsXml
            ? `<attribute id="urn:epcglobal:cbv:tr#geofencePolygon">${polygonItemsXml}</attribute>`
            : ''

          return `<VocabularyElement id="${id}">
  <attribute id="urn:epcglobal:cbv:mda#informationProvider">${informationProvider}</attribute>
  ${optionalAttributeItems}
  ${geofanceXml}
</VocabularyElement>`
        }
      )
      .join('\n')

    return `<Vocabulary type="urn:epcglobal:epcis:vtype:Location">
  <VocabularyElementList>
    ${vocabElementListItems}
  </VocabularyElementList>
</Vocabulary>`
  })

export const createEpcClassXml = file =>
  withIgnoreError(async () => {
    const readerStream = createCsvFileReaderStream(file)
    const parsedData = (await neatCsv(readerStream, {
      headers: csvEpcClassHeader,
      skipLines: 3
    })) as any

    const vocabArrayKeyList = [
      'grossWeightMeasurementValue',
      'grossWeightMeasurementUnitCode'
    ]

    const vocabElementListItems = parsedData
      .map(
        (
          {
            id,
            informationProvider,
            speciesForFisheryStatisticsPurposesCode,

            ...optionalAttributeMap
          },
          index
        ) => {
          if (!id) return ''
          const optionalAttributeItems = Object.entries(optionalAttributeMap)
            .filter(([k, v]) => !!v && !vocabArrayKeyList.includes(k))
            .map(
              ([k, v]) =>
                `<attribute id="urn:epcglobal:cbv:mda#${k}">${v}</attribute>`
            )
            .join('\n')

          const grossWeightDataList = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'id',
            itemKeyList: vocabArrayKeyList
          })

          const grossWeightItemsXml = grossWeightDataList
            .map(
              ({
                grossWeightMeasurementUnitCode,
                grossWeightMeasurementValue
              }) =>
                `<measurement measurementUnitCode="${parseUom(
                  grossWeightMeasurementUnitCode
                )}">${grossWeightMeasurementValue}</measurement>`
            )
            .join('\n')
            .trim()

          const grossWeightXml = !!grossWeightItemsXml
            ? `<attribute id="urn:epcglobal:cbv:mda#grossWeight">${grossWeightItemsXml}</attribute>`
            : ''

          return `<VocabularyElement id="${id}">
  <attribute id="urn:epcglobal:cbv:mda#informationProvider">${informationProvider}</attribute>
  <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesCode">${speciesForFisheryStatisticsPurposesCode}</attribute>
  ${optionalAttributeItems}
  ${grossWeightXml}
</VocabularyElement>`
        }
      )
      .join('\n')

    return `<Vocabulary type="urn:epcglobal:epcis:vtype:EPCClass">
    <VocabularyElementList>
      ${vocabElementListItems}
    </VocabularyElementList>
</Vocabulary>`
  })

export const createBusinessDocumentHeaderXml = file =>
  withIgnoreError(async () => {
    const readerStream = createCsvFileReaderStream(file)
    const [, data] = (await neatCsv(readerStream, {
      headers: csvBusinessDocumentHeader
    })) as any

    const {
      senderId,
      senderName,
      senderEmail,
      receiverId,
      receiverName,
      receiverEmail
    } = data

    if (
      !senderId ||
      !senderName ||
      !senderEmail ||
      !receiverId ||
      !receiverName ||
      !receiverEmail
    ) {
      throw new Error('wrong format')
    }

    const dt = DateTime.local()
    const creationDate = dt.toISO()

    return `<sbdh:StandardBusinessDocumentHeader>
    <sbdh:HeaderVersion>1.0</sbdh:HeaderVersion>
    <sbdh:Sender>
        <sbdh:Identifier>${senderId}</sbdh:Identifier>
        <sbdh:ContactInformation>
            <sbdh:Contact>${senderName}</sbdh:Contact>
            <sbdh:EmailAddress>${senderEmail}</sbdh:EmailAddress>
        </sbdh:ContactInformation>
    </sbdh:Sender>
    <sbdh:Receiver>
        <sbdh:Identifier>${receiverId}</sbdh:Identifier>
        <sbdh:ContactInformation>
            <sbdh:Contact>${receiverName}</sbdh:Contact>
            <sbdh:EmailAddress>${receiverEmail}</sbdh:EmailAddress>
        </sbdh:ContactInformation>
    </sbdh:Receiver>
    <sbdh:DocumentIdentification>
        <sbdh:Standard>GS1</sbdh:Standard>
        <sbdh:TypeVersion>3.0</sbdh:TypeVersion>
        <sbdh:InstanceIdentifier>9999</sbdh:InstanceIdentifier>
        <sbdh:Type>Seafood Traceability</sbdh:Type>
        <sbdh:MultipleType>false</sbdh:MultipleType>
        <sbdh:CreationDateAndTime>${creationDate}</sbdh:CreationDateAndTime>
    </sbdh:DocumentIdentification>
</sbdh:StandardBusinessDocumentHeader>`
  })

export const createBoltonXml = ({
  bdhXml,
  epcClassXml,
  locationXml,
  objectEventXml,
  transformationEventXml,
  aggregationEventXml
}) => {
  return `<?xml version="1.0" encoding="UTF-8"?> 
<epcis:EPCISDocument xmlns:epcis="urn:epcglobal:epcis:xsd:1" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:sbdh="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader" 
  schemaVersion="0" 
  creationDate="2001-12-17T09:30:47Z" 
  xsi:schemaLocation="urn:epcglobal:epcis:xsd:1  http://www.gs1si.org/BMS/epcis/1_2/EPCglobal-epcis-1_2.xsd" 
  xmlns:cbvmda="urn:epcglobal:cbv:mda" 
  xmlns:gdst="https://traceability-dialogue.org/epcis">
  <EPCISHeader>
       ${bdhXml}
    <extension>
      <EPCISMasterData>
        <VocabularyList> 
          ${epcClassXml}
          ${locationXml}
        </VocabularyList>
      </EPCISMasterData>
    </extension>
  </EPCISHeader>
  <EPCISBody>
    <EventList>
      ${objectEventXml}
      ${aggregationEventXml}
      ${transformationEventXml}
    </EventList>
  </EPCISBody>
</epcis:EPCISDocument>`
}
