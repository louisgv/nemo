import { parseUom } from '.'

const createSingleAggregationDisaggregationEvent = (
  d: CsvAggregationDisaggregationPayloadFields
) => {
  return `                         
<AggregationEvent>
    <eventTime>${d.eventTime}</eventTime>
    <eventTimeZoneOffset>${d.eventTimeZoneOffset}</eventTimeZoneOffset>
    <parentID>${d.parentEPC}</parentID>
    <childEPCs>
    </childEPCs>
    <action>${d.action}</action>
    <bizStep>urn:epcglobal:cbv:bizstep:${
      d.action === 'ADD' ? 'packing' : 'removing'
    }</bizStep>
    <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
    <readPoint>
        <id>${d.readPoint}</id>
    </readPoint>
    <bizLocation>
        <id>${d.bizLocation}</id>
    </bizLocation>
    <extension>
        <childQuantityList>
            <quantityElement>
                <epcClass>${d.childEPC}</epcClass>
                <quantity>${d.quantity}</quantity>
                <uom>${parseUom(d.unitOfMeasure)}</uom>
            </quantityElement>
        </childQuantityList>
    </extension>

    <!-- EXTENSION -->
    <gdst:visibilityEvent>${
      d.action === 'ADD' ? 'Aggregate' : 'Disaggregate'
    }</gdst:visibilityEvent>    
    <gdst:productOwner>${d.productOwner}</gdst:productOwner>
    <cbvmda:informationProvider>${
      d.informationProvider
    }</cbvmda:informationProvider>
</AggregationEvent>`
}

export const createAggregatedAggregationDisaggregationXml = async (
  dList: [CsvAggregationDisaggregationPayloadFields]
) => {
  const d = dList[0]
  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <!-- GDST Basic Interoperability CSV File Nemo Converter - Aggregation / Disaggregation -->
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
                  <sbdh:Identifier>${
                    d.informationProviderID
                  }</sbdh:Identifier><!-- Sending Entity -->
                  <sbdh:ContactInformation>
                      <sbdh:Contact>${
                        d.informationProviderContact
                      }</sbdh:Contact>
                      <sbdh:EmailAddress>${
                        d.informationProviderEmail
                      }</sbdh:EmailAddress>
                  </sbdh:ContactInformation>
              </sbdh:Sender>
              <sbdh:Receiver>
                  <sbdh:Identifier>${
                    d.informationReceiverID
                  }</sbdh:Identifier>                <!-- Receiving Entity -->
                  <sbdh:ContactInformation>
                      <sbdh:Contact>${
                        d.informationReceiverContact
                      }</sbdh:Contact>
                      <sbdh:EmailAddress>${
                        d.informationReceiverEmail
                      }</sbdh:EmailAddress>
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
                                  <attribute id="urn:epcglobal:cbv:mda#informationProvider">${
                                    d.informationProviderChild
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesCode">${
                                    d.speciesCodeChild
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesName">${
                                    d.speciesNameChild
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#descriptionShort">${
                                    d.descriptionShortChild
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#tradeItemConditionCode">${
                                    d.itemConditionCodeChild
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#tradeItemConditionCode">${
                                    d.itemConditionCodeParent
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#additionalTradeItemIdentification">${
                                    d.additionalTradeItemIdentificationParent
                                  }</attribute>
                              </VocabularyElement>
                          </VocabularyElementList>
                      </Vocabulary>
                      <Vocabulary type="urn:epcglobal:epcis:vtype:Location">
                          <VocabularyElementList>
                              <VocabularyElement id="${d.location}">
                                  <attribute id="urn:epcglobal:cbv:mda#informationProvider">${
                                    d.informationProvider
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#name">${
                                    d.name
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#partyIDTypeCode">${
                                    d.partyIDTypeCode
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#additionalPartyID">${
                                    d.additionalPartyID
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">${
                                    d.streetAddressOne
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo">${
                                    d.streetAddressTwo
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#city">${
                                    d.city
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#state">${
                                    d.state
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#postalCode">${
                                    d.postalCode
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#countryCode">${
                                    d.countryCode
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#latitude">${
                                    d.latitude
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#longitude">${
                                    d.longitude
                                  }</attribute>
                                  <attribute id="unr:epcglobal:cbv:mda#contact">${
                                    d.contact
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#telephone">${
                                    d.telephone
                                  }</attribute>
                                  <attribute id="urn:epcglobal:cbv:mda#email">${
                                    d.email
                                  }</attribute>
                              </VocabularyElement>
  
                          </VocabularyElementList>
                      </Vocabulary>
                  </VocabularyList>
              </EPCISMasterData>
          </extension>
      </EPCISHeader>
      <EPCISBody>
          <EventList>
            ${dList.map(createSingleAggregationDisaggregationEvent).join('\n')}
          </EventList>
      </EPCISBody>
  </epcis:EPCISDocument>
`
}
