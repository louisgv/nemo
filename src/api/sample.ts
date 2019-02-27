export const testMasterPayload = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE project>
<epcis:EPCISDocument xmlns:epcis="urn:epcglobal:epcis:xsd:1"
    xmlns:p="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader"
    xmlns:example="http://ns.example.com/epcis" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    creationDate="2005-07-11T11:30:47.0Z" schemaVersion="1.2">
    <EPCISHeader>
        <p:StandardBusinessDocumentHeader>
            <!-- Required -->
            <p:HeaderVersion>1.2</p:HeaderVersion>
            <p:Sender>
                <p:Identifier Authority="">p:Identifier</p:Identifier>
            </p:Sender>
            <p:Receiver>
                <p:Identifier Authority="">p:Identifier</p:Identifier>
            </p:Receiver>
            <p:DocumentIdentification>
                <!-- Required -->
                <p:Standard>EPCglobal</p:Standard>
                <!-- Required -->
                <p:TypeVersion>1.2</p:TypeVersion>
                <p:InstanceIdentifier>p:InstanceIdentifier</p:InstanceIdentifier>
                <!-- Required -->
                <p:Type>MasterData</p:Type>
                <p:MultipleType>true</p:MultipleType>
                <p:CreationDateAndTime>2001-12-31T12:00:00</p:CreationDateAndTime>
            </p:DocumentIdentification>
        </p:StandardBusinessDocumentHeader>
        <extension>
            <EPCISMasterData>
                <VocabularyList>
                    <Vocabulary type="urn:epcglobal:epcis:vtype:EPCClass">
                        <VocabularyElementList>
                            <VocabularyElement id="http://epcis.cosintl.com/user/vocab/obj/YFN.83a58cf6-c3e0-40fd-9a01-e459deab98f4"> <!-- Catch Info -->
                                <attribute id="urn:epcglobal:cbv:mda#descriptionShort">Wild Caught Yellowfin Tuna</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesName">Thunnus albacares</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesCode">YFN</attribute> <!-- #10 GDST KDE Species -->
                            </VocabularyElement>
                        </VocabularyElementList>
                    </Vocabulary> 
                </VocabularyList>
            </EPCISMasterData>
        </extension>
    </EPCISHeader>
    <EPCISBody>
        <EventList>
        </EventList>
    </EPCISBody>
</epcis:EPCISDocument>
`

export const testCatchPayload = `
<epcis:EPCISDocument xmlns:epcis="urn:epcglobal:epcis:xsd:1" 
    schemaVersion="1.1" 
    creationDate="2018-12-20T09:04:09.971+11:00" 
    xmlns:eecc="http://ns.eecc.info/epcis"
    xmlns:sbdh="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="urn:epcglobal:epcis:xsd:1 http://www.gs1si.org/BMS/epcis/1_2/EPCglobal-epcis-1_2.xsd" 
    xmlns:cbvmda="urn:epcglobal:cbv:mda">
      <EPCISBody>
        <EventList>
            <ObjectEvent> <!-- V1 CREATE THE CATCH EVENT ID WITH GDST KDEs-->
                <eventTime>2016-12-01T08:09:23.582+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <epcList>
                </epcList>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep>
                <disposition>urn:epcglobal:cbv:disp:active</disposition>
                <readPoint>
                    <id>geo:0.886256,148.445297</id> <!-- Point where catch was recorded -->
                </readPoint>
                <extension>
                    <quantityList>
                        <quantityElement> <!--  User defined QR Code for unique Catch Event of Yellowfin Tuna -->
                            <epcClass>http://epcis.cosintl.com/user/vocab/obj/YFN.83a58cf6-c3e0-40fd-9a01-e459deab98f4</epcClass>
                            <quantity>5714</quantity> <!-- #11 GDST KDE Weight/Commodity -->
                            <uom>KGM</uom>
                        </quantityElement>
                    </quantityList>
                    <ilmd>
                        <cbvmda:vesselCatchInformationList> <!--  Attach GDST KDEs to unique Catch Event -->
                            <vesselCatchInformation>
                                <vesselID>IMO.8748490</vesselID> <!-- #2 & 3 GDST KDE Vessel ID -->
                                <vesselName>BAE FU 103</vesselName> <!-- #1 GDST KDE Vessel Name  -->
                                <vesselOwnerName>VESSEL OWNER 1</vesselOwnerName> <!-- A1 GDST KDE Vessel Ownership -->
                                <organizationName>FISHING COMPANY 1</organizationName>
                                <vesselCaptainName>KUO,PING-YU</vesselCaptainName>
                                <vesselFlagState>TW</vesselFlagState> <!-- #4 Vessel Flag State -->
                                <catchArea>FAO.71</catchArea> <!-- #7 GDST KDE Catch Area -->
                                <fishingGearTypeCode>PS</fishingGearTypeCode> <!-- #5 Gear Type -->
                            </vesselCatchInformation>
                        </cbvmda:vesselCatchInformationList>
                        <cbvmda:productionMethodCode>MARINE_FISHERY</cbvmda:productionMethodCode> <!-- #19 GDST KDE Production Method -->
                        <cbvmda:harvestStartDate>2016-11-10</cbvmda:harvestStartDate> <!-- #8 & 9 GDST KDE Date of Capture -->
                        <cbvmda:harvestEndDate>2016-12-01</cbvmda:harvestEndDate> <!-- #8 & 9 GDST KDE Date of Capture -->
                        <cbvmda:certificationList> <!-- #6 GDST KDE Fishing Authorization / Organization License, Certs (Aqua) -->
                            <certification>
                                <certificationStandard>MSC</certificationStandard>
                                <certificationAgency>Agency 101</certificationAgency>
                                <certificationValue>999</certificationValue>
                                <certificationIdentification>M12554-12486-FC-GFF-1Y</certificationIdentification>
                            </certification>
                        </cbvmda:certificationList>
                    </ilmd>
                </extension>
            </ObjectEvent>    
        </EventList>
    </EPCISBody>
</epcis:EPCISDocument>
`;
