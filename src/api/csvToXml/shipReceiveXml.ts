import { parseUom } from '.'

const createSingleShipReceiveEvent = (
  d: CsvShipReceivePayloadFields
) => {
  return ``
}

export const createShipReceiveXml = async (
  dList: [CsvShipReceivePayloadFields]
) => {
  const d = dList[0]
  return `
  <?xml version="1.0" encoding="UTF-8"?> 
<!-- GDST Basic Interoperability CSV File Nemo Converter -->
<epcis:EPCISDocument xmlns:epcis="urn:epcglobal:epcis:xsd:1"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:sbdh="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader"
    schemaVersion="1.2" creationDate="2001-12-17T09:30:47Z"
    xsi:schemaLocation="urn:epcglobal:epcis:xsd:1  http://www.gs1si.org/BMS/epcis/1_2/EPCglobal-epcis-1_2.xsd"
    xmlns:cbvmda="urn:epcglobal:cbv:mda" xmlns:gdst="https://traceability-dialogue.org/epcis">
    <EPCISHeader>
        <sbdh:StandardBusinessDocumentHeader>
            <sbdh:HeaderVersion>1.0</sbdh:HeaderVersion>
            <sbdh:Sender>
                <sbdh:Identifier>${d.informationProviderID}</sbdh:Identifier>
                <!-- Information Provider ID -->
                <sbdh:ContactInformation>
                    <sbdh:Contact>${d.informationProviderContactName}</sbdh:Contact>
                    <!-- Information Contact Name -->
                    <sbdh:EmailAddress>${d.informationProviderEmail}</sbdh:EmailAddress>
                    <!-- Information Provider Email -->
                </sbdh:ContactInformation>
            </sbdh:Sender>
            <sbdh:Receiver>
                <sbdh:Identifier>${d.destinationID}</sbdh:Identifier>
                <!-- Destination ID - optional -->
                <sbdh:ContactInformation>
                    <sbdh:Contact>${d.destinationContactName}</sbdh:Contact>
                    <!-- Destination Contact Name - optional -->
                    <sbdh:EmailAddress>${d.destinationEmail}</sbdh:EmailAddress>
                    <!-- Destination Email - optional -->
                </sbdh:ContactInformation>
            </sbdh:Receiver>
            <sbdh:DocumentIdentification>
                <!-- Meets minimum GDST Wild Caught BUL KDE 4.0 and CTEs  -->
                <sbdh:Standard>GDST</sbdh:Standard>
                <sbdh:TypeVersion>4.0</sbdh:TypeVersion>
                <sbdh:InstanceIdentifier>100002</sbdh:InstanceIdentifier>
                <sbdh:Type>Wild</sbdh:Type>
                <sbdh:CreationDateAndTime>2016-12-15T11:11:52+08:00</sbdh:CreationDateAndTime>
                <!-- Date file was submitted-->
            </sbdh:DocumentIdentification>
        </sbdh:StandardBusinessDocumentHeader>
        <extension>
            <EPCISMasterData>
                <VocabularyList>
                    <Vocabulary type="urn:epcglobal:epcis:vtype:Location">
                        <VocabularyElementList>
                            <VocabularyElement id="${d.shipFromParty}">
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">${d.informationProvider}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#name">${d.shipFromPartyOwnerName}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">${d.shipFromPartyAddress1}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo">${d.shipFromPartyAddress2}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">${d.shipFromPartyCity}</attribute>
                                <!-- SIMP Address -->
                                <attribute id="urn:epcglobal:cbv:mda#state">${d.shipFromPartyCountry}</attribute>
                                <!-- SIMP Address -->
                                <attribute id="urn:epcglobal:cbv:mda#postalCode">${d.shipFromPartyPostalCode}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state">${d.shipFromPartyState}"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">${d.shipFromPartyCountryCode}</attribute>
                                <!-- SIMP Address -->
                                <attribute id="unr:epcglobal:cbv:mda#contact">${d.shipFromPartyContactName}</attribute>
                                <!-- SIMP Ext. Buyer (BY) -->
                                <attribute id="urn:epcglobal:cbv:mda#email">${d.shipFromPartyContactEmail}</attribute>
                                <!-- SIMP Extension -->
                            </VocabularyElement>
                            <VocabularyElement id="${d.shipToParty}">
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">${d.informationProvider}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#name">${d.shipToPartyOwnerName}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">${d.shipToPartyAddress1}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo">${d.shipToPartyAddress2}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">${d.shipToPartyCity}</attribute>
                                <!-- SIMP Address -->
                                <attribute id="urn:epcglobal:cbv:mda#state">${d.shipToPartyCountry}</attribute>
                                <!-- SIMP Address -->
                                <attribute id="urn:epcglobal:cbv:mda#postalCode">${d.shipToPartyPostalCode}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state">${d.shipToPartyState}"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">${d.shipToPartyCountryCode}</attribute>
                                <!-- SIMP Address -->
                                <attribute id="unr:epcglobal:cbv:mda#contact">${d.shipToPartyContactName}</attribute>
                                <!-- SIMP Ext. Buyer (BY) -->
                                <attribute id="urn:epcglobal:cbv:mda#email">${d.shipToPartyContactEmail}</attribute>
                                <!-- SIMP Extension -->
                            </VocabularyElement>
                            <VocabularyElement id="${d.shipFromLocation}">
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">${d.informationProvider}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#name">${d.shipFromLocationOwnerName}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">${d.shipFromLocationAddress1}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo">${d.shipFromLocationAddress2}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">${d.shipFromLocationCity}</attribute>
                                <!-- SIMP Address -->
                                <attribute id="urn:epcglobal:cbv:mda#state">${d.shipFromLocationCountry}</attribute>
                                <!-- SIMP Address -->
                                <attribute id="urn:epcglobal:cbv:mda#postalCode">${d.shipFromLocationPostalCode}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state">${d.shipFromLocationState}"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">${d.shipFromLocationCountryCode}</attribute>
                                <!-- SIMP Address -->
                            </VocabularyElement>
                            <VocabularyElement id="${d.shipToLocation}">
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">${d.informationProvider}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#name">${d.shipToLocationOwnerName}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">${d.shipToLocationAddress1}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo">${d.shipToLocationAddress2}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">${d.shipToLocationCity}</attribute>
                                <!-- SIMP Address -->
                                <attribute id="urn:epcglobal:cbv:mda#state">${d.shipToLocationCountry}</attribute>
                                <!-- SIMP Address -->
                                <attribute id="urn:epcglobal:cbv:mda#postalCode">${d.shipToLocationPostalCode}</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state">${d.shipToLocationState}"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">${d.shipToLocationCountryCode}</attribute>
                                <!-- SIMP Address -->
                            </VocabularyElement>
                        </VocabularyElementList>
                    </Vocabulary>
                </VocabularyList>
            </EPCISMasterData>
        </extension>
    </EPCISHeader>
    <EPCISBody>
        <EventList>
            <ObjectEvent> <!-- V1 Shipping  -->
                <eventTime>${d.eventTimeV1}</eventTime>
                <eventTimeZoneOffset>${d.eventTimeZoneOffsetV1}</eventTimeZoneOffset>
                <epcList>
                    <epc>${d.palletId}</epc> <!-- Container ID or Pallet ID, either an SSCC or User Specified URL -->
                </epcList>
                <action>OBSERVE</action>
                <bizStep>urn:epcglobal:cbv:bizstep:shipping</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_transit</disposition>
                <readPoint>
                    <id>${d.readPoint1}</id> <!-- Actual Location where event is captured, either a geo location or GLN -->
                </readPoint>
                <bizLocation>
                    <id>${d.bizLocation1}</id> <!-- Typically the GLN of a shipper or User Specified URL for location -->
                </bizLocation>
                <bizTransactionList> <!-- Customer PO, Shipper Invoice -->
                    <bizTransaction type="urn:epcglobal:cbv:btt:po">${d.po}</bizTransaction>
                    <bizTransaction type="urn:epcglobal:cbv:btt:inv">${d.invoice}</bizTransaction>
                    <bizTransaction type="urn:gdst:btt:cert">${d.certificate}</bizTransaction> <!-- LPCO Trans Type, type, permit num -->
                </bizTransactionList>
                <extension>
                    <sourceList> <!-- Ship from/to legal entities for chain of custody and physical locations  -->
                        <source type="urn:epcglobal:cbv:sdt:owning_party">urn:epc:id:pgln:${d.shipFromParty}</source> <!-- Legal Entity selling the product -->
                        <source type="urn:epcglobal:cbv:sdt:location">urn:epc:id:sgln:${d.shipFromLocation}</source> <!-- Physical Location where product is shipped from -->
                    </sourceList>
                    <destinationList>
                        <source type="urn:epcglobal:cbv:sdt:owning_party">urn:epc:id:pgln:${d.shipToParty}</source> <!-- Legal Entity buying the product -->
                        <source type="urn:epcglobal:cbv:sdt:location">urn:epc:id:sgln:${d.shipToLocation}</source> <!-- Physical Location where product is shipped to -->
                    </destinationList>
                </extension>
                 
                <!-- EXTENSION -->
                <gdst:productOwner>urn:epc:id:pgln:${d.legalEntitySellingProduct}</gdst:productOwner> <!-- PGLN of company who owned products when event occurred. In the case of a transaction, it is the seller. -->
                <cbvmda:informationProvider>urn:epc:id:pgln:${d.legalEntitySellingProduct}</cbvmda:informationProvider> <!-- PGLN of company who input the data. -->
                 
            </ObjectEvent>
            <ObjectEvent> <!-- V2 Receiving  -->
                <eventTime>${d.eventTimeV2}</eventTime>
                <eventTimeZoneOffset>${d.eventTimeZoneOffsetV2}</eventTimeZoneOffset>
                <epcList>
                    <epc>${d.palletId}</epc> <!-- Container ID or Pallet ID, either an SSCC or User Specified URL -->
                </epcList>
                <action>OBSERVE</action>
                <bizStep>urn:epcglobal:cbv:bizstep:receiving</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_transit</disposition>
                <readPoint>
                    <id>${d.readPoint1}</id> <!-- Actual Location where event is captured, either a geo location or GLN -->
                </readPoint>
                <bizLocation>
                    <id>${d.bizLocation1}</id> <!-- Typically the GLN of receiver or User Specified URL for location -->
                </bizLocation>
                <bizTransactionList> <!-- Customer PO, Shipper Invoice -->
                    <bizTransaction type="urn:epcglobal:cbv:btt:po">${d.po}</bizTransaction>
                    <bizTransaction type="urn:epcglobal:cbv:btt:inv">${d.invoice}</bizTransaction>
                    <bizTransaction type="urn:gdst:btt:cert">${d.certificate}</bizTransaction> <!-- LPCO Trans Type, type, permit num -->
                </bizTransactionList>
                <extension>
                    <sourceList> <!-- Ship from/to legal entities for chain of custody and physical locations  -->
                        <source type="urn:epcglobal:cbv:sdt:owning_party">urn:epc:id:pgln:${d.shipFromParty}</source> <!-- Legal Entity selling the product -->
                        <source type="urn:epcglobal:cbv:sdt:location">urn:epc:id:sgln:${d.shipFromLocation}</source> <!-- Physical Location where product is shipped from -->
                    </sourceList>
                    <destinationList>
                        <source type="urn:epcglobal:cbv:sdt:owning_party">urn:epc:id:pgln:${d.shipToParty}</source> <!-- Legal Entity buying the product -->
                        <source type="urn:epcglobal:cbv:sdt:location">urn:epc:id:sgln:${d.shipToLocation}</source> <!-- Physical Location where product is shipped to -->
                    </destinationList>
                </extension>
                <!-- EXTENSION -->
                <gdst:productOwner>urn:epc:id:pgln:${d.legalEntityBuyingProduct}</gdst:productOwner> <!-- PGLN of company who owned products when event occurred. In the case of a transaction, it is the seller. -->
                <cbvmda:informationProvider>urn:epc:id:pgln:${d.legalEntityBuyingProduct}</cbvmda:informationProvider> <!-- PGLN of company who input the data. -->
                 
            </ObjectEvent>
 
        </EventList>
    </EPCISBody>
</epcis:EPCISDocument>
`
}
