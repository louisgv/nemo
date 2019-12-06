import fileReaderStream from 'filereader-stream'
// const parseDate = (s) => DateTime.fromFormat(s, 'dd/MM/yy').toISO()

export const createCsvFileReaderStream =(file)=> {
  if (!file) throw new Error("no file")

  if (file.name.split('.').pop() !== 'csv') {
    throw new Error('not csv')
  }

  return fileReaderStream(file)
}

export const parseUom = (s: string) =>
  s && s[0].toLowerCase() === 'l' ? 'LBR' : 'KGM'

export const createSender = ({
  informationProviderID,
  informationProviderContactName,
  informationProviderEmail
}) => `
<sbdh:Sender>
    <sbdh:Identifier>${informationProviderID}</sbdh:Identifier>
    <sbdh:ContactInformation>
        <sbdh:Contact>${informationProviderContactName}</sbdh:Contact>
        <sbdh:EmailAddress>${informationProviderEmail}</sbdh:EmailAddress>
    </sbdh:ContactInformation>
</sbdh:Sender>
`

export const createReceiver = ({
  destinationID,
  destinationContactName,
  destinationEmail
}) => `
<sbdh:Receiver>
    <sbdh:Identifier>${destinationID}</sbdh:Identifier>
    <sbdh:ContactInformation>
        <sbdh:Contact>${destinationContactName}</sbdh:Contact>
        <sbdh:EmailAddress>${destinationEmail}</sbdh:EmailAddress>
    </sbdh:ContactInformation>
</sbdh:Receiver>
`

export const createFishVocab = ({
  seafoodID,
  speciesCode,
  speciesScientificName,
  tradeItemDescription,
  informationProviderID,
  tradeItemConditionCode
}) => `
<VocabularyElement id="${seafoodID}"> 
    <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesCode">${speciesCode}</attribute>
    <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesName">${speciesScientificName}</attribute>
    <attribute id="urn:epcglobal:cbv:mda#descriptionShort">${tradeItemDescription}</attribute>
    <attribute id="urn:epcglobal:cbv:mda#informationProvider">${informationProviderID}</attribute>
    <attribute id="urn:epcglobal:cbv:mda#tradeItemConditionCode">${tradeItemConditionCode}</attribute>
</VocabularyElement>
`
const createVocabEl = ({ id, ...props }) => `
<VocabularyElement id="${id}">
    ${Object.keys(props)
      .map(
        k =>
          `<attribute id="urn:epcglobal:cbv:mda#${k}">${props[k]}</attribute>`
      )
      .join('\n')}
</VocabularyElement>
`

export const createOutputProductVocab = (data: CsvCatchProcessPayloadFields) =>
  createVocabEl({
    id: data.outputProductID,
    informationProvider: data.informationProviderID,
    descriptionShort: data.outputProductName
  })

export const createLocationVocab = (data: CsvCatchProcessPayloadFields) =>
  createVocabEl({
    id: data.processorID,
    informationProvider: data.informationProviderID,
    name: data.processorOwnerName,
    streetAddressOne: data.processorAddress1,
    streetAddressTwo: data.processorAddress2,
    city: data.processorCity,
    state: data.processorState,
    postalCode: data.processorPostalCode,
    countryCode: data.processorCountryCode,
    contact: data.processorContactName,
    email: data.processorContactEmail
  })

export const createFishCatchEvent = (data: CsvCatchProcessPayloadFields) => `
<ObjectEvent> <!-- V1 Fishing/Catch Event (represents one catch, if multiple creat multiple events and IDs) -->
    <eventTime>${
      data.eventDateV1
    }</eventTime> <!-- Reflects when the catch event is recorded, not actually when fish are caught -->
    <eventTimeZoneOffset>${data.eventTimeZoneOffsetV1}</eventTimeZoneOffset>
    <epcList>
    </epcList>
    <action>ADD</action> <!-- Action ADD indicates this is the creation point of the specific lot of fish -->
    <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep> <!-- Indicates first time this ID appears in traceability event stream -->
    <disposition>urn:epcglobal:cbv:disp:active</disposition> <!-- This indicates the lot is active. -->
    <readPoint>
        <id>${
          data.readPointV1
        }</id> <!-- This should either be where the catch event was recorded or where the fish was landed -->
    </readPoint>
    <bizLocation>
        <id>${
          data.bizLocationV1
        }</id> <!-- Optional, if the vessel has a globally unique ID.  Otherwise, exclude.-->
    </bizLocation>
    <extension>              
        <quantityList>
            <quantityElement> 
                <epcClass>${
                  data.seafoodID
                }</epcClass> <!-- #10 GDST KDE Seafood Identifier -->
                <quantity>${
                  data.seafoodQuantity
                }</quantity> <!-- #11 GDST KDE Weight/Commodity -->
                <uom>${parseUom(data.seafoodUOM)}</uom> <!-- SIMP UOM is KG -->
            </quantityElement>
        </quantityList>
        <ilmd>
            <cbvmda:vesselCatchInformationList> <!--  Attach GDST KDEs to unique Catch Event -->
                <vesselCatchInformation>
                    <vesselOperator>${
                      data.vesselOperator
                    }</vesselOperator> <!-- #24 GDST KDE Vessel Ownership -->
                    <vesselID>${data.vesselID}</vesselID>
                    <vesselRegistration>${
                      data.vesselRegistration
                    }</vesselRegistration>
                    <vesselName>${data.vesselName}</vesselName>
                    <vesselFlagState>${data.vesselFlagState}</vesselFlagState>
                    <catchArea>${
                      data.catchAreaFAO
                    }</catchArea> <!-- #7 GDST KDE FAO Catch Area -->
                    <fishingGearTypeCode>${
                      data.fishingGearTypeCode
                    }</fishingGearTypeCode> <!-- #5 GDST KDE Gear Type Code -->
                </vesselCatchInformation>
            </cbvmda:vesselCatchInformationList>
            <cbvmda:productionMethodCode>${
              data.productionMethodCode
            }</cbvmda:productionMethodCode> <!-- SIMP Source Type Code "HCF" -->
            <cbvmda:harvestStartDate>${
              data.harvestStartDate
            }</cbvmda:harvestStartDate> <!-- #8 & 9 GDST KDE Date of Capture -->
            <cbvmda:harvestEndDate>${
              data.harvestEndDate
            }</cbvmda:harvestEndDate> <!-- #8 & 9 GDST KDE Date of Capture -->
            <cbvmda:certificationList> <!-- CERTIFICATES -->
                <certification>
                    <certificationStandard>MSC</certificationStandard>
                    <certificationIdentification>${
                      data.mscCertification
                    }</certificationIdentification>
                </certification>
                <certification>
                    <certificationStandard>${
                      data.landingAuthority
                    }</certificationStandard>
                    <certificationIdentification>${
                      data.landingAuthorization
                    }</certificationIdentification>
                </certification>
            </cbvmda:certificationList>
            <cbvmda:unloadingPort>${data.unloadingPort}</cbvmda:unloadingPort>
            <gdst:landingDateStart>${
              data.landingDateStart
            }</gdst:landingDateStart>
            <gdst:landingDateEnd>${data.landingDateEnd}</gdst:landingDateEnd>
            <gdst:harvestCertification>${
              data.harvestCertification
            }</gdst:harvestCertification>
            <gdst:harvestCertificationCoC>${
              data.harvestCertificationCoC
            }</gdst:harvestCertificationCoC>
            <gdst:FIP>${data.FIP}</gdst:FIP>
            <gdst:ISSF>${data.ISSF}</gdst:ISSF>
            <gdst:ratingsScore>${data.ratingsScore}</gdst:ratingsScore>
            <gdst:ratingsScheme>${data.ratingsScheme}</gdst:ratingsScheme>
            <gdst:vesselTransponder>${
              data.vesselTransponder
            }</gdst:vesselTransponder>
            <gdst:vesselRegistryLink>${
              data.vesselRegistryLink
            }</gdst:vesselRegistryLink>
        </ilmd>
    </extension>
    <!-- EXTENSION -->
    <gdst:visibilityEvent>${
      data.visibilityEvent
    }</gdst:visibilityEvent> <!-- Visibility Data -->
    <gdst:productOwner>${
      data.productOwnerV1
    }</gdst:productOwner> <!-- Product Owner -->
    <cbvmda:informationProvider>${
      data.informationProviderID
    }</cbvmda:informationProvider> <!-- Submitter of Data -->
</ObjectEvent>
`

export const createProcessEvent = (data: CsvCatchProcessPayloadFields) => `
<extension> <!-- V2 Process Into Loins -->
    <TransformationEvent>
        <eventTime>${data.eventDateV2}</eventTime>
        <eventTimeZoneOffset>${data.eventTimeZoneOffsetV2}</eventTimeZoneOffset>
        <inputQuantityList>
            <quantityElement> 
                <epcClass>${data.inputSeafoodID}</epcClass>
                <quantity>${data.inputSeafoodQuantity}</quantity>
                <uom>${parseUom(data.inputSeafoodUOM)}</uom>
            </quantityElement>
        </inputQuantityList>
        <outputQuantityList>
            <quantityElement>
                <epcClass>${data.outputProductID}</epcClass> 
                <quantity>${data.outputQuantity}</quantity>
                <uom>${parseUom(data.outputUOM)}</uom>
            </quantityElement>
        </outputQuantityList> 
        <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep>
        <disposition>urn:epcglobal:cbv:disp:active</disposition>
        <readPoint>
            <id>${
              data.readPointV2
            }</id> <!-- Actual Location where event is captured -->
        </readPoint>
        <bizLocation>
            <id>${data.bizLocationV2}</id> <!-- Processor Location -->
        </bizLocation>
        <ilmd> <!-- Master Data Related to a specific production lot -->
            <cbvmda:lotNumber>${data.lotNumber}</cbvmda:lotNumber>
            <cbvmda:productionDate>${
              data.productionDate
            }</cbvmda:productionDate>
            <cbvmda:bestbeforeDate>${
              data.bestBeforeDate
            }</cbvmda:bestbeforeDate>
            <cbvmda:storageStateCode>${
              data.storageStateCode
            }</cbvmda:storageStateCode>
            <cbvmda:firstFreezeDate>${
              data.firstFreezeDate
            }</cbvmda:firstFreezeDate>
            <cbvmda:countryOfOrigin>${
              data.countryOfOrigin
            }</cbvmda:countryOfOrigin>
        </ilmd>
        <!-- EXTENSION -->
        <gdst:visibilityEvent>${
          data.transformationVisibilityEvent
        }</gdst:visibilityEvent>
        <gdst:productOwner>${
          data.productOwnerV3
        }</gdst:productOwner> <!-- PGLN of company who owned products when event occurred. In the case of a transaction, it is the seller. -->
        <cbvmda:informationProvider>${
          data.informationProviderID
        }</cbvmda:informationProvider> <!-- PGLN of company who input the data. -->
    </TransformationEvent>
</extension>
`
