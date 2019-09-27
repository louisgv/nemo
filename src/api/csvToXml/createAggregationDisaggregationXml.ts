export const createAggregationDisaggregationXml = async (
  d: CsvAggregationDisaggregationPayloadFields
) => {
  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <!-- Created September 24, 2019 Thomas Burke, tburke@ift.org mobile +1.404.820.7558-->
  <!-- GDST Basic Interoperability CSV File Nemo Converter - Aggregation / Disaggregation -->
  <epcis:EPCISDocument xmlns:epcis="urn:epcglobal:epcis:xsd:1" 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
      xmlns:sbdh="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader" schemaVersion="0" creationDate="2001-12-17T09:30:47Z" xsi:schemaLocation="urn:epcglobal:epcis:xsd:1  http://www.gs1si.org/BMS/epcis/1_2/EPCglobal-epcis-1_2.xsd" 
      xmlns:cbvmda="urn:epcglobal:cbv:mda" 
      xmlns:gdst="https://traceability-dialogue.org/epcis">
      <EPCISHeader>
          <sbdh:StandardBusinessDocumentHeader>
              <sbdh:HeaderVersion>1.0</sbdh:HeaderVersion>
              <sbdh:Sender>
                  <sbdh:Identifier>${d.informationProviderID}</sbdh:Identifier><!-- Sending Entity -->
                  <sbdh:ContactInformation>
                      <sbdh:Contact>${d.informationProviderContact}</sbdh:Contact>
                      <sbdh:EmailAddress>${d.informationProviderEmail}</sbdh:EmailAddress>
                  </sbdh:ContactInformation>
              </sbdh:Sender>
              <sbdh:Receiver>
                  <sbdh:Identifier>${d.informationReceiverID}</sbdh:Identifier>                <!-- Receiving Entity -->
                  <sbdh:ContactInformation>
                      <sbdh:Contact>${d.informationReceiverContact}</sbdh:Contact>
                      <sbdh:EmailAddress>${d.informationReceiverEmail}</sbdh:EmailAddress>
                  </sbdh:ContactInformation>
              </sbdh:Receiver>
              <sbdh:DocumentIdentification>
                  <sbdh:Standard>GS1</sbdh:Standard>
                  <sbdh:TypeVersion>3.0</sbdh:TypeVersion>
                  <sbdh:InstanceIdentifier>9999</sbdh:InstanceIdentifier>
                  <sbdh:Type>Seafood Traceability</sbdh:Type>
                  <sbdh:MultipleType>false</sbdh:MultipleType>
                  <sbdh:CreationDateAndTime>2016-12-15T11:11:52+08:00</sbdh:CreationDateAndTime>
              </sbdh:DocumentIdentification>
          </sbdh:StandardBusinessDocumentHeader>
          <extension>
              <EPCISMasterData>
                  <VocabularyList>
                      <Vocabulary type="urn:epcglobal:epcis:vtype:EPCClass">
                          <VocabularyElementList>
                              <VocabularyElement id="${d.childEPC}">
                                  <attribute id="urn:epcglobal:cbv:mda#informationProvider">${d.informationProviderChild}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesCode">${d.speciesCodeChild}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesName">${d.speciesNameChild}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#descriptionShort">${d.descriptionShortChild}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#tradeItemConditionCode">${d.itemConditionCodeChild}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#tradeItemConditionCode">${d.itemConditionCodeParent}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#additionalTradeItemIdentification">${d.additionalTradeItemIdentificationParent}</attribute>
                              </VocabularyElement>
                          </VocabularyElementList>
                      </Vocabulary>
                      <Vocabulary type="urn:epcglobal:epcis:vtype:Location">
                          <VocabularyElementList>
                              <VocabularyElement id="${d.aggregationLocation}">
                                  <attribute id="urn:epcglobal:cbv:mda#informationProvider">${d.informationProviderAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#name">${d.nameAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#partyIDTypeCode">${d.partyIDTypeCodeAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#additionalPartyID">${d.additionalPartyIDAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">${d.streetAddressOneAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo">${d.streetAddressTwoAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#city">${d.cityAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#state">${d.stateAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#postalCode">${d.postalCodeAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#countryCode">${d.countryCodeAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#latitude">${d.latitudeAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#longitude">${d.longitudeAggregation}</attribute>
                                  <attribute id="unr:epcglobal:cbv:mda#contact">${d.contactAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#telephone">${d.telephoneAggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#email">${d.emailAggregation}</attribute>
                              </VocabularyElement>
  
                              <VocabularyElement id="${d.disaggregationLocation}">
                                  <attribute id="urn:epcglobal:cbv:mda#informationProvider">${d.informationProviderDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#name">${d.nameDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#partyIDTypeCode">${d.partyIDTypeCodeDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#additionalPartyID">${d.additionalPartyIDDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">${d.streetAddressOneDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo">${d.streetAddressTwoDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#city">${d.cityDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#state">${d.stateDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#postalCode">${d.postalCodeDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#countryCode">${d.countryCodeDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#latitude">${d.latitudeDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#longitude">${d.longitudeDisaggregation}</attribute>
                                  <attribute id="unr:epcglobal:cbv:mda#contact">${d.contactDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#telephone">${d.telephoneDisaggregation}</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#email">${d.emailDisaggregation}</attribute>
                              </VocabularyElement>
                          </VocabularyElementList>
                      </Vocabulary>
                  </VocabularyList>
              </EPCISMasterData>
          </extension>
      </EPCISHeader>
      <EPCISBody>
          <EventList>
              <AggregationEvent>                <!-- Aggregation  -->
                  <eventTime>${d.eventTime}</eventTime>
                  <eventTimeZoneOffset>${d.eventTimeZoneOffset}</eventTimeZoneOffset>
                  <parentID>${d.parentEPC}</parentID>
                  <childEPCs>
                  </childEPCs>
                  <action>ADD</action>
                  <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                  <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                  <readPoint>
                      <id>${d.readPointAggregation}</id>
                  </readPoint>
                  <bizLocation>
                      <id>${d.bizLocationAggregation}</id>
                  </bizLocation>
                  <extension>
                      <childQuantityList>
                          <quantityElement>
                              <epcClass>${d.childEPC}</epcClass>
                              <quantity>${d.quantity}</quantity>
                              <uom>${d.uom}</uom>
                          </quantityElement>
                      </childQuantityList>
                  </extension>
  
                  <!-- EXTENSION -->
                  <gdst:visibilityEvent>Aggregate</gdst:visibilityEvent>
                  <gdst:productOwner>${d.productOwner}</gdst:productOwner>
                  <cbvmda:informationProvider>${d.informationProvider}</cbvmda:informationProvider>
              </AggregationEvent>
  
              <AggregationEvent>                <!-- Disaggregation  -->
                  <eventTime>${d.eventTime}</eventTime>
                  <eventTimeZoneOffset>${d.eventTimeZoneOffset}</eventTimeZoneOffset>
                  <parentID>${d.parentEPC}</parentID>
                  <childEPCs>
                  </childEPCs>
                  <action>DELETE</action><!-- Delete Action for Disaggregation -->
                  <bizStep>urn:epcglobal:cbv:bizstep:removing</bizStep>
                  <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                  <readPoint>
                      <id>${d.readPointDisaggregation}</id>
                  </readPoint>
                  <bizLocation>
                      <id>${d.bizLocationDisaggregation}</id>
                  </bizLocation>
                  <extension>                
                      <childQuantityList>
                          <quantityElement>
                              <epcClass>${d.childEPC}</epcClass>
                              <quantity>${d.quantity}</quantity>
                              <uom>${d.uom}</uom>
                          </quantityElement>
                      </childQuantityList>
                  </extension>
  
                  <!-- EXTENSION -->
                  <gdst:visibilityEvent>Disaggregate</gdst:visibilityEvent>
                  <gdst:productOwner>${d.productOwner}</gdst:productOwner>
                  <cbvmda:informationProvider>${d.informationProvider}</cbvmda:informationProvider>
  
              </AggregationEvent>
          </EventList>
      </EPCISBody>
  </epcis:EPCISDocument>
`
}
