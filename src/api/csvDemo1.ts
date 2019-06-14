import { DateTime } from "luxon";
import { upper } from "case";

const parseDate = (s) => DateTime.fromFormat(s, 'dd/MM/yy').toISO()

export const createCsvDemo1Payload = async ({
    informationProvider='urn:epc:id:pgln:0047000.000001',
    informationProviderID,
    informationProviderContactName,
    informationProviderEmail,

    seafoodID,
    speciesCode,
    speciesForFisheryStatisticsPurposesName='FISH_SAMPLE',
    speciesDescriptionShort='Some kind of fish',
    tradeItemConditionCode,

    outputID,
    outputName,

    processorID,
    processorOwnerName,
    processorAddress1,
    processorAddress2="",
    processorCity,
    processorCountry="USA",
    processorPostalCode,
    processorCountryCode,
    processorContactName,
    processorContactEmail,

    eventDateV1,

    seafoodQuantity,
    seafoodUOM,

    vesselOperator,
    vesselID,
    vesselRegistration,
    vesselName,
    vesselFlagState,

    catchAreaFAO,
    fishingGearTypeCode,

    productionMethodCode,
    harvestStartDate,
    harvestEndDate,

    mscCertificate,
    landingAuthority,
    landingAuthorization,

    visibilityEvent,
    productOwnerV1,

    transshipLandingLocation,

    transshipmentVisibilityEvent="Fishing",
    productOwnerV3,

    eventTimeV3="2016-12-01T08:09:23.582+11:00",
    eventTimeZoneOffsetV3="+11:00",
    outputQuantity="1152",
    outputUOM="KGM",

    processorBizLocation,
    lotNumber,
    productionDate,
    bestBeforeDate,
    storageStateCode,
    firstFreezDate,
    transformationVisibilityEvent
}: any) => {
    const dt = DateTime.local();

    const creationDateAndTime = dt.toISO();
    const eventTimeZoneOffset = dt.toFormat("ZZ");

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
  <?xml version="1.0" encoding="UTF-8"?> 
  <!-- GDST Basic Interoperability CSV File Nemo Converter -->
  <epcis:EPCISDocument xmlns:epcis="urn:epcglobal:epcis:xsd:1"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:sbdh="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader" 
      schemaVersion="0" 
      creationDate="2001-12-17T09:30:47Z" 
      xsi:schemaLocation="urn:epcglobal:epcis:xsd:1  http://www.gs1si.org/BMS/epcis/1_2/EPCglobal-epcis-1_2.xsd"
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
                  <sbdh:Identifier>urn:epc:id:pgln:0637196.000004</sbdh:Identifier> <!-- Destination ID - optional -->
                  <sbdh:ContactInformation>
                      <sbdh:Contact>Amy Adams</sbdh:Contact> <!-- Destination Contact Name - optional -->
                      <sbdh:EmailAddress>amy@traceco.com</sbdh:EmailAddress> <!-- Destination Email - optional -->
                  </sbdh:ContactInformation>
              </sbdh:Receiver>
              <sbdh:DocumentIdentification> <!-- Meets minimum GDST Wild Caught BUL KDE 4.0 and CTEs  -->
                  <sbdh:Standard>GDST</sbdh:Standard> 
                  <sbdh:TypeVersion>4.0</sbdh:TypeVersion>
                  <sbdh:Type>Wild</sbdh:Type>
                  <sbdh:CreationDateAndTime>${creationDateAndTime}</sbdh:CreationDateAndTime> <!-- Date file was submitted 2016-12-15T11:11:52+08:00 -->
              </sbdh:DocumentIdentification>
          </sbdh:StandardBusinessDocumentHeader>
          <extension>
              <EPCISMasterData>
                  <VocabularyList> 
                      <Vocabulary type="urn:epcglobal:epcis:vtype:EPCClass">
                          <VocabularyElementList>
                              <VocabularyElement id="${seafoodID}"> <!-- Assigned GTIN for Whole Wild Caught Yellowfin Tuna -->
                                  <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesCode">${speciesCode}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesName">${speciesForFisheryStatisticsPurposesName}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#descriptionShort">${speciesDescriptionShort}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#informationProvider">${informationProviderID}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#tradeItemConditionCode">${tradeItemConditionCode}</attribute>
                              </VocabularyElement>
                              <VocabularyElement id="${outputID}"> <!-- Processed Fish -->
                                  <attribute id="urn:epcglobal:cbv:mda#informationProvider">${outputID}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#descriptionShort">${outputName}</attribute> 
                                  <attribute id="urn:epcglobal:cbv:mda#informationProvider">${informationProviderID}</attribute>
                              </VocabularyElement>
                          </VocabularyElementList>
                      </Vocabulary>
                      <Vocabulary type="urn:epcglobal:epcis:vtype:Location">
                          <VocabularyElementList>
                              <VocabularyElement id="${processorID}">
                                  <attribute id="urn:epcglobal:cbv:mda#informationProvider">${informationProvider}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#name">${processorOwnerName}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">${processorAddress1}</attribute> 
                                  <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo">${processorAddress2}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#city">${processorCity}</attribute> <!-- SIMP Address -->
                                  <attribute id="urn:epcglobal:cbv:mda#state">${processorCountry}</attribute> <!-- SIMP Address -->
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
                  <eventTimeZoneOffset>${DateTime.fromISO(eventDateV1).toFormat('ZZ')}</eventTimeZoneOffset>
                  <epcList>
                  </epcList>
                  <action>ADD</action> <!-- Action ADD indicates this is the creation point of the specific lot of fish -->
                  <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep> <!-- Indicates first time this ID appears in traceability event stream -->
                  <disposition>urn:epcglobal:cbv:disp:active</disposition> <!-- This indicates the lot is active. -->
                  <readPoint>
                      <id>geo:0.886256,148.445297</id> <!-- This should either be where the catch event was recorded or where the fish was landed -->
                  </readPoint>
                  <bizLocation>
                      <id>urn:epc:id:sgln:0047000.00004.0</id> <!-- Optional, if the vessel has a globally unique ID.  Otherwise, exclude.-->
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
                          <cbvmda:harvestStartDate>${parseDate(harvestStartDate)}</cbvmda:harvestStartDate> <!-- #8 & 9 GDST KDE Date of Capture -->
                          <cbvmda:harvestEndDate>${parseDate(harvestEndDate)}</cbvmda:harvestEndDate> <!-- #8 & 9 GDST KDE Date of Capture -->
                          <cbvmda:certificationList> <!-- CERTIFICATES -->
                              <certification>
                                  <certificationStandard>MSC</certificationStandard>
                                  <certificationIdentification>${mscCertificate}</certificationIdentification>
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
              <ObjectEvent> <!-- V2 Receipt at Transship Vessel -->
                  <eventTime>${eventDateV1}</eventTime>
                  <eventTimeZoneOffset>${DateTime.fromISO(eventDateV1).toFormat('ZZ')}</eventTimeZoneOffset>
                  <epcList></epcList>
                  <action>OBSERVE</action>
                  <bizStep>urn:epcglobal:cbv:bizstep:receiving</bizStep>
                  <disposition>urn:epcglobal:cbv:disp:in_transit</disposition>
                  <readPoint>
                      <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                  </readPoint>
                  <bizLocation>
                      <id>${transshipLandingLocation}</id> <!-- Transshipment Vessel -->
                  </bizLocation>
                  <extension>
                      <quantityList>
                          <quantityElement> 
                              <epcClass>${seafoodID}</epcClass> <!-- Unique ID that links Catch/Fishing to Transshipment -->
                              <quantity>${seafoodQuantity}</quantity>
                              <uom>${seafoodUOM}</uom>
                          </quantityElement>
                      </quantityList>
                  </extension>
                  <!-- EXTENSION -->
                  <gdst:visibilityEvent>${transshipmentVisibilityEvent}</gdst:visibilityEvent>
                  <gdst:productOwner>${productOwnerV3}</gdst:productOwner> <!-- PGLN of company who owned products when event occurred. In the case of a transaction, it is the seller. -->
                  <cbvmda:informationProvider>${informationProvider}</cbvmda:informationProvider> <!-- PGLN of company who input the data. -->
              </ObjectEvent>
              <extension> <!-- V3 Process Into Loins -->
                  <TransformationEvent>
                      <eventTime>${eventTimeV3}</eventTime>
                      <eventTimeZoneOffset>${eventTimeZoneOffsetV3}</eventTimeZoneOffset>
                      <inputQuantityList>
                          <quantityElement> 
                              <epcClass>${seafoodID}</epcClass>
                              <quantity>${seafoodQuantity}</quantity>
                              <uom>${seafoodUOM}</uom>
                          </quantityElement>
                      </inputQuantityList>
                      <outputQuantityList>
                          <quantityElement>
                              <epcClass>${outputID}</epcClass> 
                              <quantity>${outputQuantity}</quantity>
                              <uom>${outputUOM}</uom>
                          </quantityElement>
                      </outputQuantityList> 
                      <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep>
                      <disposition>urn:epcglobal:cbv:disp:active</disposition>
                      <readPoint>
                          <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                      </readPoint>
                      <bizLocation>
                          <id>${processorBizLocation}</id> <!-- Processor Location -->
                      </bizLocation>
                      <ilmd> <!-- Master Data Related to a specific production lot -->
                          <cbvmda:lotNumber>${lotNumber}</cbvmda:lotNumber>
                          <cbvmda:productionDate>${productionDate}</cbvmda:productionDate>
                          <cbvmda:bestbeforeDate>${bestBeforeDate}</cbvmda:bestbeforeDate>
                          <cbvmda:storageStateCode>${storageStateCode}</cbvmda:storageStateCode>
                          <cbvmda:firstFreezeDate>${firstFreezDate}</cbvmda:firstFreezeDate>
                      </ilmd>
                      <!-- EXTENSION -->
                      <gdst:visibilityEvent>${transformationVisibilityEvent}</gdst:visibilityEvent>
                      <gdst:productOwner>${productOwnerV3}</gdst:productOwner> <!-- PGLN of company who owned products when event occurred. In the case of a transaction, it is the seller. -->
                      <cbvmda:informationProvider>${informationProvider}</cbvmda:informationProvider> <!-- PGLN of company who input the data. -->
                  </TransformationEvent>
              </extension>
            </EventList>
      </EPCISBody>
  </epcis:EPCISDocument>
`;
};
