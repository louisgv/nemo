import { DateTime } from "luxon";
import { upper } from "case";

const parseDate = (s) => DateTime.fromFormat(s, 'dd/MM/yy').toISO()

export const createCsvDemo1Payload = async ({
    informationProviderID, informationProviderContactName, informationProviderEmail, destinationID, destinationContactName, destinationEmail, eventDateV1, eventTimeZoneOffsetV1, readPointV1, bizLocationV1, seafoodID, speciesCode, speciesScientificName, tradeItemDescription, tradeItemConditionCode, seafoodQuantity, seafoodUOM, vesselOperator, vesselID, vesselRegistration, vesselName, vesselFlagState, catchAreaFAO, fishingGearTypeCode, productionMethodCode, harvestStartDate, harvestEndDate, unloadingPort, mscCertification, landingAuthority, landingAuthorization, landingDateStart, landingDateEnd, harvestCertification, harvestCertificationCoC, FIP, ISSF, ratingsScore, ratingsScheme, vesselTransponder, vesselRegistryLink, visibilityEvent, productOwnerV1, eventDateV2, eventTimeZoneOffsetV2, readPointV2, bizLocationV2, inputSeafoodID, inputSeafoodQuantity, inputSeafoodUOM, outputProductID, outputProductName, outputQuantity, outputUOM, lotNumber, productionDate, bestBeforeDate, storageStateCode, firstFreezeDate, countryOfOrigin, processorOwnerName, processorID, processorAddress1, processorAddress2, processorCity, processorState, processorPostalCode, processorCountryCode, processorContactName, processorContactEmail, transformationVisibilityEvent, productOwnerV3
}: any) => {
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
        xmlns:sbdh="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader" schemaVersion="0" creationDate="2001-12-17T09:30:47Z" xsi:schemaLocation="urn:epcglobal:epcis:xsd:1  http://www.gs1si.org/BMS/epcis/1_2/EPCglobal-epcis-1_2.xsd" 
        xmlns:cbvmda="urn:epcglobal:cbv:mda"
        xmlns:gdst="https://traceability-dialogue.org/epcis">
        <EPCISHeader>
            <sbdh:StandardBusinessDocumentHeader>
                <sbdh:HeaderVersion>1.0</sbdh:HeaderVersion>
                <sbdh:Sender>
                    <sbdh:Identifier>${informationProviderID}</sbdh:Identifier> <!-- Information Provider ID -->
                    <sbdh:ContactInformation>
                        <sbdh:Contact>${informationProviderContactName}</sbdh:Contact> <!-- Information Contact Name -->
                        <sbdh:EmailAddress>${informationProviderEmail}</sbdh:EmailAddress> <!-- Information Provider Email -->
                    </sbdh:ContactInformation>
                </sbdh:Sender>
                <sbdh:Receiver>
                    <sbdh:Identifier>${destinationID}</sbdh:Identifier> <!-- Destination ID - optional -->
                    <sbdh:ContactInformation>
                        <sbdh:Contact>${destinationContactName}</sbdh:Contact> <!-- Destination Contact Name - optional -->
                        <sbdh:EmailAddress>${destinationEmail}</sbdh:EmailAddress> <!-- Destination Email - optional -->
                    </sbdh:ContactInformation>
                </sbdh:Receiver>
                <sbdh:DocumentIdentification> <!-- Meets minimum GDST Wild Caught BUL KDE 4.0 and CTEs  -->
                    <sbdh:Standard>GDST</sbdh:Standard> 
                    <sbdh:TypeVersion>4.0</sbdh:TypeVersion>
                    <sbdh:Type>Wild</sbdh:Type>
                    <sbdh:CreationDateAndTime>2016-12-15T11:11:52+08:00</sbdh:CreationDateAndTime> <!-- Date file was submitted-->
                </sbdh:DocumentIdentification>
            </sbdh:StandardBusinessDocumentHeader>
            <extension>
                <EPCISMasterData>
                    <VocabularyList> 
                        <Vocabulary type="urn:epcglobal:epcis:vtype:EPCClass">
                            <VocabularyElementList>
                                <VocabularyElement id="${seafoodID}"> <!-- Assigned GTIN for Whole Wild Caught Yellowfin Tuna -->
                                    <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesCode">${speciesCode}</attribute>
                                    <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesName">${speciesScientificName}</attribute>
                                    <attribute id="urn:epcglobal:cbv:mda#descriptionShort">${tradeItemDescription}</attribute>
                                    <attribute id="urn:epcglobal:cbv:mda#informationProvider">${informationProviderID}</attribute>
                                    <attribute id="urn:epcglobal:cbv:mda#tradeItemConditionCode">${tradeItemConditionCode}</attribute>
                                </VocabularyElement>
                                <VocabularyElement id="${outputProductID}"> <!-- Processed Fish -->
                                    <attribute id="urn:epcglobal:cbv:mda#informationProvider">${outputProductID}</attribute>
                                    <attribute id="urn:epcglobal:cbv:mda#descriptionShort">${outputProductName}</attribute> 
                                    <attribute id="urn:epcglobal:cbv:mda#informationProvider">${informationProviderID}</attribute>
                                </VocabularyElement>
                            </VocabularyElementList>
                        </Vocabulary>
                        <Vocabulary type="urn:epcglobal:epcis:vtype:Location">
                            <VocabularyElementList>
                                <VocabularyElement id="${processorID}">
                                    <attribute id="urn:epcglobal:cbv:mda#informationProvider">${informationProviderID}</attribute>
                                    <attribute id="urn:epcglobal:cbv:mda#name">${processorOwnerName}</attribute>
                                    <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">${processorAddress1}</attribute> 
                                    <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo">${processorAddress2}</attribute>
                                    <attribute id="urn:epcglobal:cbv:mda#city">${processorCity}</attribute> <!-- SIMP Address -->
                                    <attribute id="urn:epcglobal:cbv:mda#state">${processorState}</attribute> <!-- SIMP Address -->
                                    <attribute id="urn:epcglobal:cbv:mda#postalCode">${processorPostalCode}</attribute>
                                    <attribute id="urn:epcglobal:cbv:mda#countryCode">${processorCountryCode}</attribute> <!-- SIMP Address -->
                                    <attribute id="unr:epcglobal:cbv:mda#contact">${processorContactName}</attribute> <!-- SIMP Ext. Buyer (BY) -->
                                    <attribute id="urn:epcglobal:cbv:mda#email">${processorContactEmail}</attribute> <!-- SIMP Extension -->
                                </VocabularyElement>
                            </VocabularyElementList>
                        </Vocabulary>           
                    </VocabularyList>
                </EPCISMasterData>
            </extension>
        </EPCISHeader>
          <EPCISBody>
            <EventList>
                <ObjectEvent> <!-- V1 Fishing/Catch Event (represents one catch, if multiple creat multiple events and IDs) -->
                    <eventTime>${eventDateV1}</eventTime> <!-- Reflects when the catch event is recorded, not actually when fish are caught -->
                    <eventTimeZoneOffset>${eventTimeZoneOffsetV1}</eventTimeZoneOffset>
                    <epcList>
                    </epcList>
                    <action>ADD</action> <!-- Action ADD indicates this is the creation point of the specific lot of fish -->
                    <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep> <!-- Indicates first time this ID appears in traceability event stream -->
                    <disposition>urn:epcglobal:cbv:disp:active</disposition> <!-- This indicates the lot is active. -->
                    <readPoint>
                        <id>${readPointV1}</id> <!-- This should either be where the catch event was recorded or where the fish was landed -->
                    </readPoint>
                    <bizLocation>
                        <id>${bizLocationV1}</id> <!-- Optional, if the vessel has a globally unique ID.  Otherwise, exclude.-->
                    </bizLocation>
                    <extension>              
                        <quantityList>
                            <quantityElement> 
                                <epcClass>${seafoodID}</epcClass> <!-- #10 GDST KDE Seafood Identifier -->
                                <quantity>${seafoodQuantity}</quantity> <!-- #11 GDST KDE Weight/Commodity -->
                                <uom>${seafoodUOM}</uom> <!-- SIMP UOM is KG -->
                            </quantityElement>
                        </quantityList>
                        <ilmd>
                            <cbvmda:vesselCatchInformationList> <!--  Attach GDST KDEs to unique Catch Event -->
                                <vesselCatchInformation>
                                    <vesselOperator>${vesselOperator}</vesselOperator> <!-- #24 GDST KDE Vessel Ownership -->
                                    <vesselID>${vesselID}</vesselID>
                                    <vesselRegistration>${vesselRegistration}</vesselRegistration>
                                    <vesselName>${vesselName}</vesselName>
                                    <vesselFlagState>${vesselFlagState}</vesselFlagState>
                                    <catchArea>${catchAreaFAO}</catchArea> <!-- #7 GDST KDE FAO Catch Area -->
                                    <fishingGearTypeCode>${fishingGearTypeCode}</fishingGearTypeCode> <!-- #5 GDST KDE Gear Type Code -->
                                </vesselCatchInformation>
                            </cbvmda:vesselCatchInformationList>
                            <cbvmda:productionMethodCode>${productionMethodCode}</cbvmda:productionMethodCode> <!-- SIMP Source Type Code "HCF" -->
                            <cbvmda:harvestStartDate>${harvestStartDate}</cbvmda:harvestStartDate> <!-- #8 & 9 GDST KDE Date of Capture -->
                            <cbvmda:harvestEndDate>${harvestEndDate}</cbvmda:harvestEndDate> <!-- #8 & 9 GDST KDE Date of Capture -->
                            <cbvmda:certificationList> <!-- CERTIFICATES -->
                                <certification>
                                    <certificationStandard>MSC</certificationStandard>
                                    <certificationIdentification>${mscCertification}</certificationIdentification>
                                </certification>
                                <certification>
                                    <certificationStandard>${landingAuthority}</certificationStandard>
                                    <certificationIdentification>${landingAuthorization}</certificationIdentification>
                                </certification>
                            </cbvmda:certificationList>
                        </ilmd>
                    </extension>
                    <!-- EXTENSION -->
                    <gdst:visibilityEvent>${visibilityEvent}</gdst:visibilityEvent> <!-- Visibility Data -->
                    <gdst:productOwner>${productOwnerV1}</gdst:productOwner> <!-- Product Owner -->
                    <cbvmda:informationProvider>${informationProviderID}</cbvmda:informationProvider> <!-- Submitter of Data -->
                </ObjectEvent>
                <extension> <!-- V2 Process Into Loins -->
                    <TransformationEvent>
                        <eventTime>${eventDateV2}</eventTime>
                        <eventTimeZoneOffset>${eventTimeZoneOffsetV2}</eventTimeZoneOffset>
                        <inputQuantityList>
                            <quantityElement> 
                                <epcClass>${inputSeafoodID}</epcClass>
                                <quantity>${inputSeafoodQuantity}</quantity>
                                <uom>${inputSeafoodUOM}</uom>
                            </quantityElement>
                        </inputQuantityList>
                        <outputQuantityList>
                            <quantityElement>
                                <epcClass>${outputProductID}</epcClass> 
                                <quantity>${outputQuantity}</quantity>
                                <uom>${outputUOM}</uom>
                            </quantityElement>
                        </outputQuantityList> 
                        <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep>
                        <disposition>urn:epcglobal:cbv:disp:active</disposition>
                        <readPoint>
                            <id>${readPointV2}</id> <!-- Actual Location where event is captured -->
                        </readPoint>
                        <bizLocation>
                            <id>${bizLocationV2}</id> <!-- Processor Location -->
                        </bizLocation>
                        <ilmd> <!-- Master Data Related to a specific production lot -->
                            <cbvmda:lotNumber>${lotNumber}</cbvmda:lotNumber>
                            <cbvmda:productionDate>${productionDate}</cbvmda:productionDate>
                            <cbvmda:bestbeforeDate>${bestBeforeDate}</cbvmda:bestbeforeDate>
                            <cbvmda:storageStateCode>${storageStateCode}</cbvmda:storageStateCode>
                            <cbvmda:firstFreezeDate>${firstFreezeDate}</cbvmda:firstFreezeDate>
                        </ilmd>
                        <!-- EXTENSION -->
                        <gdst:visibilityEvent>${transformationVisibilityEvent}</gdst:visibilityEvent>
                        <gdst:productOwner>${productOwnerV3}</gdst:productOwner> <!-- PGLN of company who owned products when event occurred. In the case of a transaction, it is the seller. -->
                        <cbvmda:informationProvider>${informationProviderID}</cbvmda:informationProvider> <!-- PGLN of company who input the data. -->
                    </TransformationEvent>
                </extension>
              </EventList>
        </EPCISBody>
    </epcis:EPCISDocument>
`
};
