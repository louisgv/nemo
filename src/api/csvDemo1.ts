import { DateTime } from "luxon";

// const parseDate = (s) => DateTime.fromFormat(s, 'dd/MM/yy').toISO()

const createSender = ({ informationProviderID, informationProviderContactName, informationProviderEmail }) => `
<sbdh:Sender>
    <sbdh:Identifier>${informationProviderID}</sbdh:Identifier>
    <sbdh:ContactInformation>
        <sbdh:Contact>${informationProviderContactName}</sbdh:Contact>
        <sbdh:EmailAddress>${informationProviderEmail}</sbdh:EmailAddress>
    </sbdh:ContactInformation>
</sbdh:Sender>
`

const createReceiver = ({ destinationID, destinationContactName, destinationEmail }) => `
<sbdh:Receiver>
    <sbdh:Identifier>${destinationID}</sbdh:Identifier>
    <sbdh:ContactInformation>
        <sbdh:Contact>${destinationContactName}</sbdh:Contact>
        <sbdh:EmailAddress>${destinationEmail}</sbdh:EmailAddress>
    </sbdh:ContactInformation>
</sbdh:Receiver>
`

const createFishVocab = ({ seafoodID, speciesCode, speciesScientificName, tradeItemDescription, informationProviderID, tradeItemConditionCode }) => `
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
    ${Object.keys(props).map(k => `<attribute id="urn:epcglobal:cbv:mda#${k}">${props[k]}</attribute>`).join('\n')}
</VocabularyElement>
`

const createOutputProductVocab = (data: CsvPayloadFields) => createVocabEl({
    id: data.outputProductID,
    informationProvider: data.informationProviderID,
    descriptionShort: data.outputProductName
})

const createLocationVocab = (data: CsvPayloadFields) => createVocabEl({
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

const createFishCatchEvent = (data: CsvPayloadFields) => `
<ObjectEvent> <!-- V1 Fishing/Catch Event (represents one catch, if multiple creat multiple events and IDs) -->
    <eventTime>${data.eventDateV1}</eventTime> <!-- Reflects when the catch event is recorded, not actually when fish are caught -->
    <eventTimeZoneOffset>${data.eventTimeZoneOffsetV1}</eventTimeZoneOffset>
    <epcList>
    </epcList>
    <action>ADD</action> <!-- Action ADD indicates this is the creation point of the specific lot of fish -->
    <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep> <!-- Indicates first time this ID appears in traceability event stream -->
    <disposition>urn:epcglobal:cbv:disp:active</disposition> <!-- This indicates the lot is active. -->
    <readPoint>
        <id>${data.readPointV1}</id> <!-- This should either be where the catch event was recorded or where the fish was landed -->
    </readPoint>
    <bizLocation>
        <id>${data.bizLocationV1}</id> <!-- Optional, if the vessel has a globally unique ID.  Otherwise, exclude.-->
    </bizLocation>
    <extension>              
        <quantityList>
            <quantityElement> 
                <epcClass>${data.seafoodID}</epcClass> <!-- #10 GDST KDE Seafood Identifier -->
                <quantity>${data.seafoodQuantity}</quantity> <!-- #11 GDST KDE Weight/Commodity -->
                <uom>${data.seafoodUOM}</uom> <!-- SIMP UOM is KG -->
            </quantityElement>
        </quantityList>
        <ilmd>
            <cbvmda:vesselCatchInformationList> <!--  Attach GDST KDEs to unique Catch Event -->
                <vesselCatchInformation>
                    <vesselOperator>${data.vesselOperator}</vesselOperator> <!-- #24 GDST KDE Vessel Ownership -->
                    <vesselID>${data.vesselID}</vesselID>
                    <vesselRegistration>${data.vesselRegistration}</vesselRegistration>
                    <vesselName>${data.vesselName}</vesselName>
                    <vesselFlagState>${data.vesselFlagState}</vesselFlagState>
                    <catchArea>${data.catchAreaFAO}</catchArea> <!-- #7 GDST KDE FAO Catch Area -->
                    <fishingGearTypeCode>${data.fishingGearTypeCode}</fishingGearTypeCode> <!-- #5 GDST KDE Gear Type Code -->
                </vesselCatchInformation>
            </cbvmda:vesselCatchInformationList>
            <cbvmda:productionMethodCode>${data.productionMethodCode}</cbvmda:productionMethodCode> <!-- SIMP Source Type Code "HCF" -->
            <cbvmda:harvestStartDate>${data.harvestStartDate}</cbvmda:harvestStartDate> <!-- #8 & 9 GDST KDE Date of Capture -->
            <cbvmda:harvestEndDate>${data.harvestEndDate}</cbvmda:harvestEndDate> <!-- #8 & 9 GDST KDE Date of Capture -->
            <cbvmda:certificationList> <!-- CERTIFICATES -->
                <certification>
                    <certificationStandard>MSC</certificationStandard>
                    <certificationIdentification>${data.mscCertification}</certificationIdentification>
                </certification>
                <certification>
                    <certificationStandard>${data.landingAuthority}</certificationStandard>
                    <certificationIdentification>${data.landingAuthorization}</certificationIdentification>
                </certification>
            </cbvmda:certificationList>
        </ilmd>
    </extension>
    <!-- EXTENSION -->
    <gdst:visibilityEvent>${data.visibilityEvent}</gdst:visibilityEvent> <!-- Visibility Data -->
    <gdst:productOwner>${data.productOwnerV1}</gdst:productOwner> <!-- Product Owner -->
    <cbvmda:informationProvider>${data.informationProviderID}</cbvmda:informationProvider> <!-- Submitter of Data -->
</ObjectEvent>
`

const createProcessEvent = (data: CsvPayloadFields) => `
<extension> <!-- V2 Process Into Loins -->
    <TransformationEvent>
        <eventTime>${data.eventDateV2}</eventTime>
        <eventTimeZoneOffset>${data.eventTimeZoneOffsetV2}</eventTimeZoneOffset>
        <inputQuantityList>
            <quantityElement> 
                <epcClass>${data.inputSeafoodID}</epcClass>
                <quantity>${data.inputSeafoodQuantity}</quantity>
                <uom>${data.inputSeafoodUOM}</uom>
            </quantityElement>
        </inputQuantityList>
        <outputQuantityList>
            <quantityElement>
                <epcClass>${data.outputProductID}</epcClass> 
                <quantity>${data.outputQuantity}</quantity>
                <uom>${data.outputUOM}</uom>
            </quantityElement>
        </outputQuantityList> 
        <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep>
        <disposition>urn:epcglobal:cbv:disp:active</disposition>
        <readPoint>
            <id>${data.readPointV2}</id> <!-- Actual Location where event is captured -->
        </readPoint>
        <bizLocation>
            <id>${data.bizLocationV2}</id> <!-- Processor Location -->
        </bizLocation>
        <ilmd> <!-- Master Data Related to a specific production lot -->
            <cbvmda:lotNumber>${data.lotNumber}</cbvmda:lotNumber>
            <cbvmda:productionDate>${data.productionDate}</cbvmda:productionDate>
            <cbvmda:bestbeforeDate>${data.bestBeforeDate}</cbvmda:bestbeforeDate>
            <cbvmda:storageStateCode>${data.storageStateCode}</cbvmda:storageStateCode>
            <cbvmda:firstFreezeDate>${data.firstFreezeDate}</cbvmda:firstFreezeDate>
        </ilmd>
        <!-- EXTENSION -->
        <gdst:visibilityEvent>${data.transformationVisibilityEvent}</gdst:visibilityEvent>
        <gdst:productOwner>${data.productOwnerV3}</gdst:productOwner> <!-- PGLN of company who owned products when event occurred. In the case of a transaction, it is the seller. -->
        <cbvmda:informationProvider>${data.informationProviderID}</cbvmda:informationProvider> <!-- PGLN of company who input the data. -->
    </TransformationEvent>
</extension>
`

export const createAggregatedXmlDemo = async (dataList: [CsvPayloadFields]) => {
    const dt = DateTime.local();

    const creationDate = dt.toISO();

    // Use the 1st row for sender and receiver
    const {
        informationProviderID, informationProviderContactName, informationProviderEmail, destinationID, destinationContactName, destinationEmail
    } = dataList[0]

    const fishIdSet = new Set()
    const fishVocabList = dataList.filter(({ seafoodID }) => {
        if (fishIdSet.has(seafoodID)) return false
        fishIdSet.add(seafoodID)
        return true
    })

    const outputProductIdSet = new Set()
    const outputProductVocabList = dataList.filter(({ outputProductID }) => {
        if (outputProductIdSet.has(outputProductID)) return false
        outputProductIdSet.add(outputProductID)
        return true
    })

    /**
     *  
        id: processorID,
        informationProvider: informationProviderID,
        name: processorOwnerName,
        streetAddressOne: processorAddress1,
        streetAddressTwo: processorAddress2,
        city: processorCity,
        state: processorState,
        postalCode: processorPostalCode,
        countryCode: processorCountryCode,
        contact: processorContactName,
        email: processorContactEmail
     */

    const locationIdSet = new Set()
    const locationVocabList = dataList.filter(({ processorID }) => {
        if (locationIdSet.has(processorID)) return false
        locationIdSet.add(processorID)
        return true
    })

    return `
<epcis:EPCISDocument xmlns:epcis="urn:epcglobal:epcis:xsd:1" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:sbdh="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader" schemaVersion="0" creationDate="2001-12-17T09:30:47Z" 
    xsi:schemaLocation="urn:epcglobal:epcis:xsd:1  http://www.gs1si.org/BMS/epcis/1_2/EPCglobal-epcis-1_2.xsd" 
    xmlns:cbvmda="urn:epcglobal:cbv:mda"
    xmlns:gdst="https://traceability-dialogue.org/epcis">
    <EPCISHeader>
        <sbdh:StandardBusinessDocumentHeader>
            <sbdh:HeaderVersion>1.0</sbdh:HeaderVersion>

            ${createSender({ informationProviderID, informationProviderContactName, informationProviderEmail })}

            ${createReceiver({ destinationID, destinationContactName, destinationEmail })}

            <sbdh:DocumentIdentification> <!-- Meets minimum GDST Wild Caught BUL KDE 4.0 and CTEs  -->
                <sbdh:Standard>GDST</sbdh:Standard> 
                <sbdh:TypeVersion>4.0</sbdh:TypeVersion>
                <sbdh:Type>Wild</sbdh:Type>
                <sbdh:CreationDateAndTime>${creationDate}</sbdh:CreationDateAndTime>
            </sbdh:DocumentIdentification>
        </sbdh:StandardBusinessDocumentHeader>
        <extension>
            <EPCISMasterData>
                <VocabularyList> 
                    <Vocabulary type="urn:epcglobal:epcis:vtype:EPCClass">
                        <VocabularyElementList>

                            ${fishVocabList.map(createFishVocab).join('\n')}

                            ${outputProductVocabList.map(createOutputProductVocab).join('\n')}

                        </VocabularyElementList>
                    </Vocabulary>
                    <Vocabulary type="urn:epcglobal:epcis:vtype:Location">
                        <VocabularyElementList>
                            ${locationVocabList.map(createLocationVocab).join('\n')}
                        </VocabularyElementList>
                    </Vocabulary>           
                </VocabularyList>
            </EPCISMasterData>
        </extension>
    </EPCISHeader>
        <EPCISBody>
        <EventList>
            ${dataList.map(createFishCatchEvent).join('\n')}

            ${dataList.map(createProcessEvent).join('\n')}
            </EventList>
    </EPCISBody>
</epcis:EPCISDocument>
`
}

export const createCsvDemo1Payload = async (data: CsvPayloadFields) => {
    const dt = DateTime.local();

    const creationDate = dt.toISO();

    // const { latitude, longitude } = (await getCoordinate()) as any;

    // const quantityElementList = generateQuantityElementList(
    //   fishCode,
    //   quantityList
    // );

    // const vesselCaptainName = upper(`${lastName}_${firstName}`, ",");

    // const productionMethodCode = productionMethodCodeMap[productionMethod];

    // const vesselID = upper(vesselIdType) + "." + vesselIdString;

    // const vesselFlagState = upper(language);

    return `
<epcis:EPCISDocument xmlns:epcis="urn:epcglobal:epcis:xsd:1" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:sbdh="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader" schemaVersion="0" creationDate="2001-12-17T09:30:47Z" 
    xsi:schemaLocation="urn:epcglobal:epcis:xsd:1  http://www.gs1si.org/BMS/epcis/1_2/EPCglobal-epcis-1_2.xsd" 
    xmlns:cbvmda="urn:epcglobal:cbv:mda"
    xmlns:gdst="https://traceability-dialogue.org/epcis">
    <EPCISHeader>
        <sbdh:StandardBusinessDocumentHeader>
            <sbdh:HeaderVersion>1.0</sbdh:HeaderVersion>

            ${createSender(data)}

            ${createReceiver(data)}

            <sbdh:DocumentIdentification> <!-- Meets minimum GDST Wild Caught BUL KDE 4.0 and CTEs  -->
                <sbdh:Standard>GDST</sbdh:Standard> 
                <sbdh:TypeVersion>4.0</sbdh:TypeVersion>
                <sbdh:Type>Wild</sbdh:Type>
                <sbdh:CreationDateAndTime>${creationDate}</sbdh:CreationDateAndTime>
            </sbdh:DocumentIdentification>
        </sbdh:StandardBusinessDocumentHeader>
        <extension>
            <EPCISMasterData>
                <VocabularyList> 
                    <Vocabulary type="urn:epcglobal:epcis:vtype:EPCClass">
                        <VocabularyElementList>
                            ${createFishVocab(data)}

                            ${createOutputProductVocab(data)}
                        </VocabularyElementList>
                    </Vocabulary>
                    <Vocabulary type="urn:epcglobal:epcis:vtype:Location">
                        <VocabularyElementList>
                            ${createLocationVocab(data)}    
                        </VocabularyElementList>
                    </Vocabulary>           
                </VocabularyList>
            </EPCISMasterData>
        </extension>
    </EPCISHeader>
        <EPCISBody>
        <EventList>
            ${createFishCatchEvent(data)}
            ${createProcessEvent(data)}
            </EventList>
    </EPCISBody>
</epcis:EPCISDocument>
`
};
