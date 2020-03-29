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

const debug = require('debug')('TrawlerCsvToXml')

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
      // headers: csvAggregationEventHeader,
      // skipLines: 5
      mapHeaders: ({ index }) => csvAggregationEventHeader[index] || null,
      skipLines: 4
    })) as any
    return parsedData
      .map(
        (
          {
            eventId,
            action,
            bizStep,
            informationProvider,
            productOwner,
            parentID,
            eventTime,
            eventTimeZoneOffset,
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

          const certificationListItem = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'extension_certificationList_certification_certificationType',
              'extension_certificationList_certification_certificationAgency',
              'extension_certificationList_certification_certificationIdentification',
              'extension_certificationList_certification_certificationStandard',
              'extension_certificationList_certification_certificationValue'
            ]
          })
            .map(
              d => `<cbvmda:certification>
    <gdst:certificateType>${d.extension_certificationList_certification_certificationType}</gdst:certificateType>
    <cbvmda:certificationAgency>${d.extension_certificationList_certification_certificationAgency}</cbvmda:certificationAgency>
    <cbvmda:certificationIdentification>${d.extension_certificationList_certification_certificationIdentification}</certificationIdentification>
    <cbvmda:certificationStandard>${d.extension_certificationList_certification_certificationStandard}</certificationStandard>
    <cbvmda:certificationValue>${d.extension_certificationList_certification_certificationValue}</certificationValue>
  </cbvmda:certification>`
            )
            .join('\n')

          const certificationListXml = !!certificationListItem
            ? `<cbvmda:certificationList>${certificationListItem}</cbvmda:certificationList>`
            : ''

          const extensionItemsXml = [
            childQuantityListXml,
            certificationListXml
          ].join('\n')

          const extensionXml = !!extensionItemsXml
            ? `<extension>${extensionItemsXml}</extension>`
            : ''

          return {
            date: new Date(eventTime),
            xml: `<AggregationEvent>
  <eventTime>${eventTime}</eventTime> 
  <eventTimeZoneOffset>${eventTimeZoneOffset}</eventTimeZoneOffset>
  <baseExtension>
    <eventID>${eventId}</eventID>
  </baseExtension>
  
  ${childEPCsXml}

  <action>${action}</action>
  <bizStep>urn:epcglobal:cbv:bizstep:${bizStep}</bizStep>
  <disposition>urn:epcglobal:cbv:disp:${disposition}</disposition>
  <parentID>${parentID}</parentID>
  
  <readPoint><id>${readPoint_id}</id></readPoint>
  <bizLocation><id>${bizLocation_id}</id></bizLocation>
  ${extensionXml}
  <gdst:productOwner>${productOwner}</gdst:productOwner>
  <cbvmda:informationProvider>${informationProvider}</cbvmda:informationProvider> 
</AggregationEvent>`
          }
        }
      )
      .filter(t => !!t.xml)
  })

export const createTransformationEventXml = file =>
  withIgnoreError(async () => {
    const readerStream = createCsvFileReaderStream(file)
    const parsedData = (await neatCsv(readerStream, {
      // headers: csvTransformationEventHeader,
      // skipLines: 4
      mapHeaders: ({ index }) => csvTransformationEventHeader[index] || null,
      skipLines: 3
    })) as any
    return parsedData
      .map(
        (
          {
            eventId,
            bizStep,
            informationProvider,
            productOwner,
            eventTime,
            eventTimeZoneOffset,
            disposition,
            readPoint_id,
            bizLocation_id,
            humanWelfarePolicy,

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
            ? `<outputQuantityList>${outputQuantityItemXml}</outputQuantityList>`
            : ''

          const ilmdCbvmdaItemsXml = [
            'lotNumber',
            'productionDate',
            'harvestStartDate',
            'harvestEndDate',
            'itemExpirationDate',
            'aquacultureMethod',
            'proteinSource',
            'countryOfOrigin',
            'bestBeforeDate',
            'preservationTechniqueCode'
          ]
            .filter(k => !!rest[`ilmd_${k}`])
            .map(k => `<cbvmda:${k}>${rest[`ilmd_${k}`]}</cbvmda:${k}>`)
            .join('\n')

          const ilmdVesselCatchInformationItemsXml = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'ilmd_vesselCatchInformationList_vesselCatchInformation_vesselName',
              'ilmd_vesselCatchInformationList_vesselCatchInformation_vesselID',
              'ilmd_vesselCatchInformationList_vesselCatchInformation_vesselPublicRegistry',
              'ilmd_vesselCatchInformationList_vesselCatchInformation_vesselFlagState',
              'ilmd_vesselCatchInformationList_vesselCatchInformation_imoNumber'
            ]
          })
            .map(
              d => `<cbvmda:vesselCatchInformation>
    <cbvmda:vesselName>${d.ilmd_vesselCatchInformationList_vesselCatchInformation_vesselName}</cbvmda:vesselName> 
    <cbvmda:vesselID>${d.ilmd_vesselCatchInformationList_vesselCatchInformation_vesselID}</cbvmda:vesselID>
    <gdst:vesselPublicRegistry>${d.ilmd_vesselCatchInformationList_vesselCatchInformation_vesselPublicRegistry}</gdst:vesselPublicRegistry>
    <cbvmda:vesselFlagState>${d.ilmd_vesselCatchInformationList_vesselCatchInformation_vesselFlagState}</cbvmda:vesselFlagState>
    <gdst:imoNumber>${d.ilmd_vesselCatchInformationList_vesselCatchInformation_imoNumber}</gdst:imoNumber>
</cbvmda:vesselCatchInformation>`
            )
            .join('\n')
            .trim()

          const ilmdVesselCatchInformationListXml = !!ilmdVesselCatchInformationItemsXml
            ? `<cbvmda:vesselCatchInformationList>${ilmdVesselCatchInformationItemsXml}</cbvmda:vesselCatchInformationList>`
            : ''

          const ilmdCertificationItemsXml = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'ilmd_certificationList_certification_certificationType',
              'ilmd_certificationList_certification_certificationAgency',
              'ilmd_certificationList_certification_certificationIdentification',
              'ilmd_certificationList_certification_certificationStandard',
              'ilmd_certificationList_certification_certificationValue'
            ]
          })
            .map(
              d => `<cbvmda:certification>
  <gdst:certificateType>${d.ilmd_certificationList_certification_certificationType}</gdst:certificateType>              
  <cbvmda:certificationStandard>${d.ilmd_certificationList_certification_certificationStandard}</c,certificationStandard> 
  <cbvmda:certificationAgency>${d.ilmd_certificationList_certification_certificationAgency}</certificationAgency>
  <cbvmda:certificationValue>${d.ilmd_certificationList_certification_certificationValue}</certificationValue>
  <cbvmda:certificationIdentification>${d.ilmd_certificationList_certification_certificationIdentification}</certificationIdentification>
</cbvmda:certification>`
            )
            .join('\n')
            .trim()

          const ilmdCertificationXml = !!ilmdCertificationItemsXml
            ? `<cbvmda:certificationList>${ilmdCertificationItemsXml}</cbvmda:certificationList>`
            : ''

          const ilmdItemsXml = [
            ilmdCbvmdaItemsXml,
            ilmdVesselCatchInformationListXml,
            ilmdCertificationXml
          ]
            .join('\n')
            .trim()

          const ilmdXml = !!ilmdItemsXml
            ? `<ilmd>
                ${ilmdItemsXml}
              </ilmd>`
            : ''

          return {
            date: new Date(eventTime),
            xml: `<extension>
<TransformationEvent>
  <eventTime>${eventTime}</eventTime> 
  <eventTimeZoneOffset>${eventTimeZoneOffset}</eventTimeZoneOffset>
  <baseExtension>
    <eventID>${eventId}</eventID>
  </baseExtension>
  <bizStep>urn:epcglobal:cbv:bizstep:${bizStep}</bizStep>
  <disposition>urn:epcglobal:cbv:disp:${disposition}</disposition>
  
  <readPoint><id>${readPoint_id}</id></readPoint>
  <bizLocation><id>${bizLocation_id}</id></bizLocation>

  ${inputQuantityListXml}
  ${outputQuantityListXml}
  ${ilmdXml}
  <gdst:humanWelfarePolicy>${humanWelfarePolicy}</gdst:humanWelfarePolicy>
  <gdst:productOwner>${productOwner}</gdst:productOwner> 
  <cbvmda:informationProvider>${informationProvider}</cbvmda:informationProvider>   
</TransformationEvent>
</extension>`
          }
        }
      )
      .filter(t => !!t)
  })

export const createObjectEventXml = file =>
  withIgnoreError(async () => {
    const readerStream = createCsvFileReaderStream(file)
    const parsedData = (await neatCsv(readerStream, {
      // headers: csvObjectEventHeader,
      // skipLines: 5
      mapHeaders: ({ index }) => csvObjectEventHeader[index] || null,
      skipLines: 4
    })) as any

    debug(parsedData)

    return parsedData
      .map(
        (
          {
            eventId,
            action,
            bizStep,
            informationProvider,
            productOwner,
            eventTime,
            eventTimeZoneOffset,
            disposition,
            readPoint_id,
            bizLocation_id,

            humanWelfarePolicy,

            extension_ilmd_productionMethodForFishAndSeafoodCode,
            ...rest
          },
          index
        ) => {
          if (!action || !eventTime || !informationProvider) return ''

          const isObserve = action === 'OBSERVE'

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
                `<destination type="urn:epcglobal:cbv:sdt:${d.extension_destinationList_destination_type}">
                  ${d.extension_destinationList_destination_value}
                </destination>`
            )
            .join('\n')

          const destinationListXml = !!destinationListItem
            ? `<destinationList>${destinationListItem}</destinationList>`
            : ''

          const humanWelfarePolicyXml = !!humanWelfarePolicy
            ? `<gdst:humanWelfarePolicy>${humanWelfarePolicy}</gdst:humanWelfarePolicy>`
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
              d => `<quantityElement>
  <epcClass>${d.extension_quantityList_quantityElement_epcClass}</epcClass>
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
            'unloadingPort',
            'harvestEndDate',
            'harvestStartDate',
            'transshipStartDate',
            'transshipEndDate',
            'landingEndDate',
            'landingStartDate'
          ]
            .filter(k => !!rest[`extension_ilmd_${k}`])
            .map(
              k => `<cbvmda:${k}>${rest[`extension_ilmd_${k}`]}</cbvmda:${k}>`
            )
            .join('\n')

          const ilmdGdstItemsXml = ['broodstockSource']
            .filter(k => !!rest[`extension_ilmd_${k}`])
            .map(k => `<gdst:${k}>${rest[`extension_ilmd_${k}`]}</gdst:${k}>`)
            .join('\n')

          const ilmdProductionMethodXml = !!extension_ilmd_productionMethodForFishAndSeafoodCode
            ? `<productionMethodForFishAndSeafoodCode>${extension_ilmd_productionMethodForFishAndSeafoodCode}</productionMethodForFishAndSeafoodCode>`
            : ''

          const ilmdVesselCatchInformationItemsXml = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_catchArea',
              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_rmfoArea',
              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_economicZone',
              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_subnationalPermitArea',

              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_fishingGearTypeCode',
              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselFlagState',
              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselID',
              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselName',
              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_gpsAvailability',
              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselPublicRegistry',

              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_satelliteTrackingAuthority',
              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_fisheryImprovementProject',
              'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_imoNumber'
            ]
          })
            .map(
              d => `<cbvmda:vesselCatchInformation>
  <cbvmda:vesselName>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselName}</cbvmda:vesselName>
  <cbvmda:vesselID>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselID}</cbvmda:vesselID>
  <gdst:imoNumber>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_imoNumber}</gdst:imoNumber>
  <cbvmda:vesselFlagState>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselFlagState}</cbvmda:vesselFlagState>
  <gdst:vesselPublicRegistry>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselPublicRegistry}</gdst:vesselPublicRegistry>
  <gdst:gpsAvailability>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_gpsAvailability}</gdst:gpsAvailability>
  <gdst:satelliteTrackingAuthority>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_satelliteTrackingAuthority}</gdst:satelliteTrackingAuthority>
  <cbvmda:economicZone>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_economicZone}</cbvmda:economicZone>
  <gdst:fisheryImprovementProject>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_fisheryImprovementProject}</gdst:fisheryImprovementProject>
  <gdst:rmfoArea>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_rmfoArea}</gdst:rmfoArea>
  <gdst:subnationalPermitArea>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_subnationalPermitArea}</gdst:subnationalPermitArea>
  <cbvmda:catchArea>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_catchArea}</cbvmda:catchArea>
  <cbvmda:fishingGearTypeCode>${d.extension_ilmd_vesselCatchInformationList_vesselCatchInformation_fishingGearTypeCode}</cbvmda:fishingGearTypeCode>
</cbvmda:vesselCatchInformation>`
            )
            .join('\n')
            .trim()

          const ilmdVesselCatchInformationListXml = !!ilmdVesselCatchInformationItemsXml
            ? `<cbvmda:vesselCatchInformationList>${ilmdVesselCatchInformationItemsXml}</cbvmda:vesselCatchInformationList>`
            : ''

          const certificationItemsXml = parseCsvColumnList({
            csvData: parsedData,
            index,
            indexKey: 'informationProvider',
            itemKeyList: [
              'extension_ilmd_certificationList_certification_certificationType',
              'extension_ilmd_certificationList_certification_certificationAgency',
              'extension_ilmd_certificationList_certification_certificationIdentification',
              'extension_ilmd_certificationList_certification_certificationStandard',
              'extension_ilmd_certificationList_certification_certificationValue'
            ]
          })
            .map(
              d => `<cbvmda:certification>
    <gdst:certificateType>${d.extension_ilmd_certificationList_certification_certificationType}</gdst:certificateType>
    <cbvmda:certificationStandard>${d.extension_ilmd_certificationList_certification_certificationStandard}</cbvmda:certificationStandard> 
    <cbvmda:certificationAgency>${d.extension_ilmd_certificationList_certification_certificationAgency}</certificationAgency>
    <cbvmda:certificationValue>${d.extension_ilmd_certificationList_certification_certificationValue}</certificationValue>
    <cbvmda:certificationIdentification>${d.extension_ilmd_certificationList_certification_certificationIdentification}</certificationIdentification>
  </cbvmda:certification>`
            )
            .join('\n')
            .trim()

          const certificationXml = !!certificationItemsXml
            ? isObserve
              ? `<gdst:certificationList>${certificationItemsXml}</gdst:certificationList>`
              : `<cbvmda:certificationList>${certificationItemsXml}</cbvmda:certificationList>`
            : ''

          const ilmdItemsXml = [
            ilmdCbvmdaItemsXml,
            ilmdGdstItemsXml,
            ilmdVesselCatchInformationListXml,
            ilmdProductionMethodXml,
            !isObserve ? certificationXml : ''
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
            quantityListXml,
            sourceListXml,
            destinationListXml,
            ilmdXml
          ].join('\n')

          const extensionXml = !!extensionItemsXml
            ? `<extension>${extensionItemsXml}</extension>`
            : ''

          return {
            date: new Date(eventTime),
            xml: `<ObjectEvent>
    <eventTime>${eventTime}</eventTime> 
    <eventTimeZoneOffset>${eventTimeZoneOffset}</eventTimeZoneOffset>
    <baseExtension>
      <eventID>${eventId}</eventID>
    </baseExtension>
    ${epcListXml}
    <action>${action}</action>
    <bizStep>urn:epcglobal:cbv:bizstep:${bizStep}</bizStep>
    <disposition>urn:epcglobal:cbv:disp:${disposition}</disposition>
    <readPoint><id>${readPoint_id}</id></readPoint>
    <bizLocation><id>${bizLocation_id}</id></bizLocation>
    ${bizTransactionListXml}
    ${isObserve ? certificationXml : ''}
    ${extensionXml}
    ${humanWelfarePolicyXml}
    <gdst:productOwner>${productOwner}</gdst:productOwner>
    <cbvmda:informationProvider>${informationProvider}</cbvmda:informationProvider> 
</ObjectEvent>`
          }
        }
      )
      .filter(t => !!t.xml)
  })

export const createLocationXml = file =>
  withIgnoreError(async () => {
    const readerStream = createCsvFileReaderStream(file)
    const parsedData = (await neatCsv(readerStream, {
      // headers: csvLocationHeader,
      // skipLines: 3
      mapHeaders: ({ index }) => csvLocationHeader[index] || null,
      skipLines: 2
    })) as any

    const vocabArrayKeyList = [
      'geofencePolygon_polygonPoint_seq',
      'geofencePolygon_polygonPoint_value'
    ]

    const vocabElementListItems = parsedData
      .map(
        (
          {
            id,

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
                `<polygonPoint seq="${d.geofencePolygon_polygonPoint_seq}">${d.geofencePolygon_polygonPoint_value}</polygonPoint>`
            )
            .join('\n')
            .trim()

          const geofanceXml = !!polygonItemsXml
            ? `<attribute id="urn:epcglobal:cbv:tr#geofencePolygon">${polygonItemsXml}</attribute>`
            : ''

          return `<VocabularyElement id="${id}">
  ${optionalAttributeItems}
  ${geofanceXml}
</VocabularyElement>`
        }
      )
      .join('\n')
      .trim()

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
      mapHeaders: ({ index }) => csvEpcClassHeader[index] || null,
      skipLines: 2
      // headers: csvEpcClassHeader,
      // skipLines: 3
    })) as any

    const vocabArrayKeyList = [
      'grossWeight_measurement_value',
      'grossWeight_measurementUnit_code'
    ]

    const vocabElementListItems = parsedData
      .map(({ id, ...optionalAttributeMap }, index) => {
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
            d =>
              `<measurement measurementUnitCode="${parseUom(
                d.grossWeight_measurementUnit_code
              )}">${d.grossWeight_measurement_value}</measurement>`
          )
          .join('\n')
          .trim()

        const grossWeightXml = !!grossWeightItemsXml
          ? `<attribute id="urn:epcglobal:cbv:mda#grossWeight">${grossWeightItemsXml}</attribute>`
          : ''

        return `<VocabularyElement id="${id}">
  ${optionalAttributeItems}
  ${grossWeightXml}
</VocabularyElement>`
      })
      .join('\n')
      .trim()

    return `<Vocabulary type="urn:epcglobal:epcis:vtype:EPCClass">
    <VocabularyElementList>
      ${vocabElementListItems}
    </VocabularyElementList>
</Vocabulary>`
  })

export const createBusinessDocumentHeaderXml = file =>
  withIgnoreError(async () => {
    const readerStream = createCsvFileReaderStream(file)
    const [data] = (await neatCsv(readerStream, {
      mapHeaders: ({ index }) => csvBusinessDocumentHeader[index] || null
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

export const createTrawlerXml = ({
  bdhXml,
  epcClassXml,
  locationXml,
  xmlList
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
      ${xmlList
        .sort((a, b) => a.date - b.date)
        .map(i => i.xml)
        .join('\n')}
    </EventList>
  </EPCISBody>
</epcis:EPCISDocument>`
}
