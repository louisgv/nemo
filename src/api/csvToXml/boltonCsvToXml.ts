export const createBoltonXml = () => {

  return `<?xml version="1.0" encoding="UTF-8"?> 
<epcis:EPCISDocument xmlns:epcis="urn:epcglobal:epcis:xsd:1" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:sbdh="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader" schemaVersion="0" creationDate="2001-12-17T09:30:47Z" xsi:schemaLocation="urn:epcglobal:epcis:xsd:1  http://www.gs1si.org/BMS/epcis/1_2/EPCglobal-epcis-1_2.xsd" 
    xmlns:cbvmda="urn:epcglobal:cbv:mda"
    xmlns:gdst="https://traceability-dialogue.org/epcis">
    <EPCISHeader>
        <sbdh:StandardBusinessDocumentHeader>
            <sbdh:HeaderVersion>1.0</sbdh:HeaderVersion>
            <sbdh:Sender>
                <sbdh:Identifier>urn:epc:id:pgln:8004030.00000</sbdh:Identifier> <!-- Sending company: Bolton Food SpA -->
                <sbdh:ContactInformation>
                    <sbdh:Contact>John Doe</sbdh:Contact>
                    <sbdh:EmailAddress>emailaddress</sbdh:EmailAddress>
                </sbdh:ContactInformation>
            </sbdh:Sender>
            <sbdh:Receiver>
                <sbdh:Identifier>urn:epc:id:pgln:0637196.000004</sbdh:Identifier> <!-- Receiving company: Metro Italy -->
                <sbdh:ContactInformation>
                    <sbdh:Contact>Amy Adams</sbdh:Contact>
                    <sbdh:EmailAddress>emailaddress</sbdh:EmailAddress>
                </sbdh:ContactInformation>
            </sbdh:Receiver>
            <sbdh:DocumentIdentification>
                <sbdh:Standard>GS1</sbdh:Standard>
                <sbdh:TypeVersion>3.0</sbdh:TypeVersion>
                <sbdh:InstanceIdentifier>9999</sbdh:InstanceIdentifier>
                <sbdh:Type>Seafood Traceability</sbdh:Type>
                <sbdh:MultipleType>false</sbdh:MultipleType>
                <sbdh:CreationDateAndTime>2019-05-05T11:11:52+08:00</sbdh:CreationDateAndTime>
            </sbdh:DocumentIdentification>
        </sbdh:StandardBusinessDocumentHeader>
        <extension>
            <EPCISMasterData>
                <VocabularyList> 
                    <Vocabulary type="urn:epcglobal:epcis:vtype:EPCClass">
                        <VocabularyElementList>
                            <VocabularyElement id="urn:epc:idpat:sgtin:081184900.3003.*"> <!-- Assigned GTIN for Whole Wild Caught Yellowfin Tuna 3 081184900 003 5 -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:0048000.000001</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#descriptionShort">Yellowfin Tuna</attribute> <!-- Optional -->
                                <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesName">Thunnus albacares</attribute> <!-- Optional -->
                                <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesCode">YFT</attribute> <!-- SIMP: Scientific Species Code -->
                                <attribute id="urn:epcglobal:cbv:mda#tradeItemConditionCode">WHL</attribute> <!-- SIMP: Processing Description, "NRD" -->
                            </VocabularyElement>
                            <VocabularyElement id="urn:epc:idpat:sgtin:081184900.2002.*"> <!-- Yellowfin Loins --> <!-- Assigned GTIN for Yellowfin Tuna Loins 2 081184900 002 1 -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:0048000.000001</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#speciesForFisheriesStatisticsPurposesCode">YFT</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesName">Thunnus albacares</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#descriptionShort">Frozen Cooked Yellowfin Tuna Loins Double Clean</attribute> <!-- Bolton's Product Description -->
                            </VocabularyElement>
                            <VocabularyElement id="urn:epc:idpat:sgtin:8004030.204175.*"> <!-- Assigned GTIN for Bolton Intermediate Tuna 2 8004030 04175 6 -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:0048000.000001</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#descriptionShort">RIO M.TONNO E.V.BIO MSC 65G  PZ</attribute> <!-- Individual 65g can of tuna -->
                                <attribute id="urn:epcglobal:cbv:mda#speciesForFisheriesStatisticsPurposesCode">YFT</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesName">Thunnus albacares</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#grossWeight"><measurement measurementUnitCode="KGM">0.065</measurement></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#additionalTradeItemIdentification">4715M</attribute>
                            </VocabularyElement>
                            <VocabularyElement id="urn:epc:idpat:sgtin:8004030.135151.*"> <!-- Assigned GTIN for Finished Good 1 8004030 35151 3 -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:0048000.000001</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#descriptionShort">RIO M.TONNO E.V.BIO MSC 65G  3+1X1X24</attribute> <!-- Case Contains 96 Cans @ 65g each -->
                                <attribute id="urn:epcglobal:cbv:mda#speciesForFisheriesStatisticsPurposesCode">YFT</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#speciesForFisheryStatisticsPurposesName">Thunnus albacares</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#preservationTechniqueCode">CANNING</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#grossWeight"><measurement measurementUnitCode="KGM">6.240</measurement></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#additionalTradeItemIdentification">35151</attribute>
                            </VocabularyElement>
                        </VocabularyElementList>
                    </Vocabulary>
                    <Vocabulary type="urn:epcglobal:epcis:vtype:Location">
                        <VocabularyElementList>
                            
                            <!-- Legal Party Identification Section, Used to Convey Chain of Custody -->
                            
                            <VocabularyElement id="urn:epc:id:pgln:8004030.00000"> <!-- Legal Party GLN for Bolton SpA -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">Bolton Food SpA</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">18/22 Via Luigi Einaudi</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">Cermenate</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state"></attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#postalCode">22072</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">IT</attribute> 
                                <attribute id="unr:epcglobal:cbv:mda#contact">Last Name, First Name</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#telephone">+39 031 779111</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#email">contact@riomare.it</attribute>
                            </VocabularyElement>
                            <VocabularyElement id="urn:epc:id:pgln:081184900.000"> <!-- Legal Party GLN for Tri-Marine Internation Inc. -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">Tri-Marine Fishing Management, LLC</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">10500 NE 8TH ST STE 1888</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">Bellevue</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state"></attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#postalCode">98004-8631</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">WA</attribute> 
                                <attribute id="unr:epcglobal:cbv:mda#contact">Last Name, First Name</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#telephone">+1.425.688.1288</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#email">info@trimarinegroup.com</attribute>
                            </VocabularyElement>

                            <VocabularyElement id="urn:uuid:1dc7ab35-99de-49c7-a57d-c2b5f2cc3e86"> <!-- Legal Party ID for National Fisheries Developments (AK Note:assigned a UUID since NFD is not registered with GLN) -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">National Fisheries Developments, Ltd.</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">P.O. Box 717</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">Honiara</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state"></attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#postalCode"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">SB</attribute> 
                                <attribute id="unr:epcglobal:cbv:mda#contact">Last Name, First Name</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#telephone">(677) 21606</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#email">info@trimarinegroup.com</attribute>
                            </VocabularyElement>
                            <VocabularyElement id="urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca"> <!-- Legal Party ID for Soltuna (AK Note:assigned a UUID since Soltuna is not registered with GLN) -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">Soltuna, Ltd.</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">1 Tuna Drive</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">Noro</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state">Western Province</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#postalCode"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">SB</attribute> 
                                <attribute id="unr:epcglobal:cbv:mda#contact">Last Name, First Name</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#telephone">+1.425.623.1202</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#email">info@trimarinegroup.com</attribute>
                            </VocabularyElement>
                            <VocabularyElement id="urn:epc:id:pgln:8026924.00000"> <!-- Legal Party GLN for Metro -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">Metro Italia Cash and Carry SpA</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">Via XXV Aprile 25</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">San Donato Milanese</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state"></attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#postalCode">20097</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">IT</attribute> 
                                <attribute id="unr:epcglobal:cbv:mda#contact">Last Name, First Name</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#telephone">+39 0251721</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#email"> servizio.clienti@metro.it</attribute>
                            </VocabularyElement>
                            
                            <!-- Physical Location Identification Section, Used to Physical Product Movement -->
                            
                            <VocabularyElement id="urn:epc:id:sgln:8004030.00001.0"> <!-- Physical Location GLN for Bolton Canning -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">Bolton Food Canning Facility</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">18/22 Via Luigi Einaudi</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">Cermenate</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state"></attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#postalCode">22072</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">IT</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#latitude">45.698080</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#longitude">9.099674</attribute> 
                                <attribute id="unr:epcglobal:cbv:mda#contact">Last Name, First Name</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#telephone">+39 031 779111</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#email">contact@riomare.it</attribute>
                            </VocabularyElement>
                            <VocabularyElement id="urn:epc:id:sgln:8004030.00002.0"> <!-- Physical Location GLN for Bolton Cold Storage -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">Bolton Food Cold Storage Facility</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne"></attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">Cermenate</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state"></attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#postalCode"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">IT</attribute> 
                                <attribute id="unr:epcglobal:cbv:mda#contact">Last Name, First Name</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#telephone">+39 031 779111</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#email">contact@riomare.it</attribute>
                            </VocabularyElement>
                            <VocabularyElement id="urn:epc:id:sgln:081184900.001.0"> <!-- Physical GLN for Tri-Marine Internation Inc. -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">Tri-Marine Fishing Management, LLC</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">10500 NE 8TH ST STE 1888</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">Bellevue</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state"></attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#postalCode">98004-8631</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">WA</attribute> 
                                <attribute id="unr:epcglobal:cbv:mda#contact">Last Name, First Name</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#telephone">+1.425.688.1288</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#email">info@trimarinegroup.com</attribute>
                            </VocabularyElement>
                            <VocabularyElement id="urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43"> <!-- Physical Location ID For Soltuna Plant -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">Soltuna Loin Processing Facility</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">1 Tuna Drive</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">Noro</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state">Western Province</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#postalCode"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">SB</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#latitude">-8.223227</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#longitude">157.199489</attribute> 
                                <attribute id="unr:epcglobal:cbv:mda#contact">Last Name, First Name</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#telephone">+1.425.623.1202</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#email">info@trimarinegroup.com</attribute>
                            </VocabularyElement>
                            <VocabularyElement id="urn:uuid:088aa418-7d53-4810-8a5f-2307457c87f4"> <!-- Physical Location ID For Port of Noro -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">Port of Noro</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#unloadingPort">"SB NOR"</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne"></attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">Noro</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state">Western Province</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#postalCode"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">SB</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#latitude">-8.2275465</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#longitude">157.2086</attribute> 
                                <attribute id="unr:epcglobal:cbv:mda#contact">Last Name, First Name</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#telephone">phone number</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#email">email address</attribute>
                            </VocabularyElement>
                            <VocabularyElement id="urn:uuid:da34000e-93e4-4f80-b4bf-a0962c6c511e"> <!-- Physical Location ID For Vessel Solomon Pearl -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">Solomon Pearl</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#vesselID">"IMO.9211171"</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#vesselName">"SOLOMON PEARL"</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#vesselOwnerName">"National Fisheries Developments, Ltd"</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#vesselOrganizationName">"Tri-Marine Fishing Management, LLC"</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#fishingGearTypeCode">"PS"</attribute> <!-- Tuna Purse Seiner -->
                            </VocabularyElement>
                            <VocabularyElement id="urn:epc:id:sgln:8026924.00001.0"> <!-- Physical Location GLN for Metro -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute> <!-- Data submitted by Bolton Foods -->
                                <attribute id="urn:epcglobal:cbv:mda#name">METRO ITALIA CASH  AND CARRY SPA</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressOne">Via Scornigiana 30</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#streetAddressTwo">Loc. Ospedaletto</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#city">Pavia</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#state">Lombardy</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#postalCode"></attribute>
                                <attribute id="urn:epcglobal:cbv:mda#countryCode">IT</attribute> 
                                <attribute id="unr:epcglobal:cbv:mda#contact">S. Christina E. Bissone</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#telephone">+39 0251721</attribute> 
                                <attribute id="urn:epcglobal:cbv:mda#email"> servizio.clienti@metro.it</attribute>
                            </VocabularyElement>

                            <VocabularyElement id="urn:uuid:fa8d506a-7460-409b-9ebf-cdb8dce8d3f6"> <!-- Fishing trip ID and Geofence (Optional - for demonstration only) -->
                                <attribute id="urn:epcglobal:cbv:mda#informationProvider">urn:epc:id:pgln:8004030.00000</attribute>
                                <attribute id="urn:epcglobal:cbv:mda#name">Fishing Trip 00001</attribute> <!-- (Optional) -->
                                <attribute id="urn:epcglobal:cbv:tr#geofencePolygon"> <!-- Shape file for fishing trip harvest location (optional) -->
                                  <polygonPoint seq="1">geo:8.0,135.0</polygonPoint>
                                  <polygonPoint seq="2">geo:2.0,135.0</polygonPoint>
                                  <polygonPoint seq="3">geo:8.0,159.0</polygonPoint>
                                  <polygonPoint seq="4">geo:2.0,159.0</polygonPoint>
                                </attribute>
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
                <eventTime>2018-06-30T08:09:23.582+11:00</eventTime> <!-- Reflects when the catch event is recorded, not actually when fish are caught -->
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <epcList>
                </epcList>
                <action>ADD</action> <!-- Action ADD indicates this is the creation point of the specific lot of fish -->
                <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep> <!-- Indicates first time this lot is created, to add more to the lot use "Creating_Class_Instance" -->
                <disposition>urn:epcglobal:cbv:disp:active</disposition> <!-- This indicates the lot is active. Typically this is more important for serialized entities -->
                <readPoint>
                    <id></id> <!-- Point where catch event was recorded, not necessarily where fish was caught-->
                </readPoint>
                <bizLocation>
                    <!-- This should be the GLN of the vessel.  No GLN assigned currently, so AK generated a UUID -->
                    <id>urn:uuid:da34000e-93e4-4f80-b4bf-a0962c6c511e</id> <!-- Attributes are tied to ID of Vessel in Master Data Above-->
                </bizLocation>
                <extension>              
                    <quantityList>
                        <quantityElement> <!--  REQUIRED FOR SIMP -->
                            <epcClass>urn:epc:class:lgtin:081184900.3003.A1802867</epcClass> <!-- Whole Yellowfin tuna GTIN 3 081184900 003 5 Lot A1802867-->
                            <quantity>0</quantity> <!-- #11 GDST KDE Weight/Commodity -->
                            <uom>KGM</uom>
                        </quantityElement>
                    </quantityList>
                    <ilmd>
                        <cbvmda:vesselCatchInformationList>
                            <!--  Attach GDST KDEs to unique Catch Event -->
                            <vesselCatchInformation>
                                <vesselOperator>National Fisheries Developments, Ltd.</vesselOperator> <!-- #24 GDST KDE Vessel Ownership -->
                                <vesselID>IMO.9211171</vesselID>
                                <vesselRegistration>941</vesselRegistration>
                                <vesselName>SOLOMON PEARL</vesselName>
                                <vesselFlagState>SB</vesselFlagState>
                                <catchArea>FAO.71</catchArea><!-- #7 GDST KDE FAO Catch Area -->
                                <fishingGearTypeCode>PS</fishingGearTypeCode> <!-- #5 GDST KDE Gear Type Code: PURSE SEINE -->
                            </vesselCatchInformation>
                        </cbvmda:vesselCatchInformationList>
                        <cbvmda:productionMethodCode>MARINE_FISHERY</cbvmda:productionMethodCode>
                        <cbvmda:harvestStartDate>2018-06-02</cbvmda:harvestStartDate> <!-- #8 & 9 GDST KDE Date of Capture YYYY-MM-DD -->
                        <cbvmda:harvestEndDate>2018-06-30</cbvmda:harvestEndDate>
                        <cbvmda:unloadingPort>SB NOR</cbvmda:unloadingPort>
                        <gdst:landingDateStart>2018-06-30</gdst:landingDateStart>
                        <gdst:landingDateEnd>2018-06-30</gdst:landingDateEnd>
                        <gdst:harvestCertification>Purse Seine Fishing License</gdst:harvestCertification>
                        <gdst:harvestCertificationCoC>SI-LV07/2019</gdst:harvestCertificationCoC>
                        <gdst:FIP>not available</gdst:FIP>
                        <gdst:ISSF>not available</gdst:ISSF>
                        <gdst:ratingsScore>not available</gdst:ratingsScore>
                        <gdst:ratingsScheme>not available</gdst:ratingsScheme>
                        <gdst:vesselTransponder>IMN.455 700 016</gdst:vesselTransponder> <!-- INMARSAT C NUMBER (IMN)	455 700 016 -->
                        <gdst:vesselRegistryLink>https://www.wcpfc.int/node/15774</gdst:vesselRegistryLink>
                        <cbvmda:certificationList>
                            <!-- CERTIFICATES -->
                            <certification>
                                <certificationStandard>MSC Chain of Custody</certificationStandard> <!-- Certification Standard -->
                                <certificationAgency>SCS Global Services</certificationAgency> <!-- Auditor -->
                                <certificationValue>12 July 2021</certificationValue> <!-- Certified through date -->
                                <certificationIdentification>MSC-F-30002</certificationIdentification> <!-- Certificate ID -->
                            </certification>
                        </cbvmda:certificationList>
                    </ilmd>
                </extension>
                <gdst:visibilityEvent>Fishing</gdst:visibilityEvent>
                <gdst:productOwner>urn:epc:id:pgln:081184900.000</gdst:productOwner> <!-- PGLN of company who owned products when event occurred. (Tri-Marine) -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of company who input the data. (Bolton) -->
            </ObjectEvent>
            
            <ObjectEvent> <!-- V2 Landing and offloading fish at port  First Sale to Soltuna from NFD -->
                <eventTime>2018-06-30T15:10:20.105+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <epcList>
                </epcList>
                <action>OBSERVE</action>
                <bizStep>urn:epcglobal:cbv:bizstep:unloading</bizStep> <!-- Unloading Fish at Port or Noro (Solomon Islands)-->
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:-8.2275465,157.2086</id> 
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:088aa418-7d53-4810-8a5f-2307457c87f4</id> <!-- ID of Port of Noro, Solomon Islands (SB NOR) -->
                </bizLocation>
                <extension>              
                    <quantityList>
                        <quantityElement>
                            <epcClass>urn:epc:class:lgtin:081184900.3003.A1802867</epcClass> <!-- Whole Yellowfin tuna GTIN 3 081184900 003 5 Lot A1802867-->
                            <quantity>0</quantity> <!-- Whole catch quantity was not available -->
                            <uom>KGM</uom>
                        </quantityElement>
                    </quantityList>
                </extension>
                <gdst:visibilityEvent>Offload</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:1dc7ab35-99de-49c7-a57d-c2b5f2cc3e86</gdst:productOwner> <!-- ID for NFD -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </ObjectEvent>
            
            <ObjectEvent> <!-- V3 Sell to Soltuna Loin Processor Facility -->
                <eventTime>2018-06-30T16:11:22.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <epcList></epcList>
                <action>OBSERVE</action>
                <bizStep>urn:epcglobal:cbv:bizstep:shipping</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_transit</disposition>
                <readPoint>
                    <id>geo:-8.2275465,157.2086</id> <!-- ID of Port of Noro, Solomon Islands (SB NOR) -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:088aa418-7d53-4810-8a5f-2307457c87f4</id> <!-- ID of Port of Noro, Solomon Islands (SB NOR) -->
                </bizLocation>
                <bizTransactionList> <!-- Transaction Reference for Taiwan Tuna Loin Processor -->
                    <bizTransaction type="urn:epcglobal:cbv:btt:po">not available</bizTransaction> <!-- Buyer PO number -->
                    <bizTransaction type="urn:epcglobal:cbv:btt:inv">not available</bizTransaction> <!-- Vessel Hail In Number -->
                </bizTransactionList>
                <extension>
                    <quantityList>
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.3003.A1802867</epcClass> <!-- Whole Yellowfin tuna GTIN 3 081184900 003 5 Lot A1802867-->
                            <quantity>0</quantity> <!-- Whole catch quantity was not available -->
                            <uom>KGM</uom>
                        </quantityElement>
                    </quantityList>
                    <sourceList> <!-- Transfer from Vessel Owner (NFD) to Loin Processor (Soltuna) (Link to MSC CoC, Record of First Sale) -->
                        <source type="urn:epcglobal:cbv:sdt:owning_party">urn:uuid:1dc7ab35-99de-49c7-a57d-c2b5f2cc3e86</source> <!-- NFD -->
                    </sourceList>
                    <destinationList>
                        <destination type="urn:epcglobal:cbv:sdt:owning_party">urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</destination> <!-- Soltuna -->
                    </destinationList>
                </extension>
                <gdst:visibilityEvent>Move</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:1dc7ab35-99de-49c7-a57d-c2b5f2cc3e86</gdst:productOwner> <!-- ID for NFD -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </ObjectEvent>
            
            <ObjectEvent> <!-- V4 Receipt at Soltuna Tuna Loin Processor -->
                <eventTime>2018-07-01T08:11:22.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <epcList></epcList>
                <action>OBSERVE</action>
                <bizStep>urn:epcglobal:cbv:bizstep:receiving</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_transit</disposition>
                <readPoint>
                    <id>geo:-8.223227,157.199489</id> <!-- Soltuna Processing Plant Geo Location -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <bizTransactionList> <!-- Transaction Reference -->
                    <bizTransaction type="urn:epcglobal:cbv:btt:po">not available</bizTransaction>
                    <bizTransaction type="urn:epcglobal:cbv:btt:inv">not available</bizTransaction>
                </bizTransactionList>
                <extension>
                    <quantityList>
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.3003.A1802867</epcClass> <!-- Whole Yellowfin tuna GTIN 3 081184900 003 5 Lot A1802867 -->
                            <quantity>0</quantity> <!-- Whole catch quantity was not available -->
                            <uom>KGM</uom>
                        </quantityElement>
                    </quantityList>
                </extension>
                <gdst:visibilityEvent>Received</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </ObjectEvent>
            
            <extension> <!-- V5 Process Into Loins -->
                <TransformationEvent>
                    <eventTime>2018-07-10T11:08:11.133+11:00</eventTime>
                    <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                    <inputQuantityList>
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.3003.A1802867</epcClass> <!-- Whole Yellowfin tuna 3 081184900 003 5 -->
                            <quantity>0</quantity> <!-- Whole catch quantity was not available -->
                            <uom>KGM</uom>
                        </quantityElement>
                    </inputQuantityList>
                    <outputQuantityList>
                        <quantityElement> <!-- GS1 GTIN + Lot: Yellowfin Tuna Loins -->
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> <!-- Frozen Cooked Yellowfin Tuna Loins Double Clean 2 081184900 002 1 -->
                            <quantity>15300</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </outputQuantityList> 
                    <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep>
                    <disposition>urn:epcglobal:cbv:disp:active</disposition>
                    <readPoint>
                        <id>geo:-8.223227,157.199489</id> <!-- Actual Location where event is captured -->
                    </readPoint>
                    <bizLocation>
                        <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                    </bizLocation>
                    <ilmd> <!-- Master Data Related to a specifc production lot -->
                        <cbvmda:lotNumber>MSC03.06.18</cbvmda:lotNumber>
                        <cbvmda:productionDate>10/07/2018</cbvmda:productionDate>
                    </ilmd>
                    <gdst:visibilityEvent>Transformation</gdst:visibilityEvent>
                    <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                    <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
                </TransformationEvent>
            </extension>
            
            <!-- Added aggregation events V6A - V6T -->
            
            <AggregationEvent> <!-- V6A Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:01:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011835</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802863</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6B Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:02:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011836</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802864</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6C Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:03:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011817</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802865</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6D Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:04:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011820</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802865</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6E Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:05:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011822</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802865</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6F Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:06:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011818</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802866</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6G Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:07:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011819</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802866</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6H Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:08:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011821</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802866</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6I Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:09:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011823</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6J Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:09:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011824</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6K Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:10:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011838</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6L Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:11:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011826</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6M Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:12:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011827</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6N Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:13:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011828</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6O Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:14:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011829</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6P Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:15:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011830</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6Q Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:16:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011831</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6R Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:16:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011832</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6S Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:17:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011833</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6T Packing Frozen Loins into Pallets -->
                <eventTime>2018-07-10T12:18:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1302011834</parentID> <!--  Pallet ID -->
                <childEPCs></childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> <!-- 170 Bags, 1,275 KG Net -->
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass> 
                            <quantity>1275</quantity>
                            <uom>KGM</uom>
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <AggregationEvent> <!-- V6 Packing Frozen Loins into Shipping Container -->
                <eventTime>2018-07-10T14:08:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <parentID>http://epcis.trimarinegroup.com/shippingVanNo/MNBU-053054-0</parentID> <!--  Container Reference Number -->
                <childEPCs> <!-- 3400 Bags, 25500 KG Net 26240 KG Gross -->
                    <epc>urn:epc:id:sscc:8004030.1302011835</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011836</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011817</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011820</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011822</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011818</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011819</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011821</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011823</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011824</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011838</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011826</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011827</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011828</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011829</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011830</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011831</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011832</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011833</epc>
                    <epc>urn:epc:id:sscc:8004030.1302011834</epc>
                </childEPCs> <!-- 3400 Bags, 25500 KG Net 26240 KG Gross -->
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:22.355092,120.163097</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <extension>
                    <childQuantityList> 
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</gdst:productOwner> <!-- ID for Soltuna -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <ObjectEvent> <!-- V7 Shipping From Soltuna to Cold Storage in Italy-->
                <eventTime>2018-07-25T03:08:14.133+11:00</eventTime>
                <eventTimeZoneOffset>+11:00</eventTimeZoneOffset>
                <epcList>
                    <epc>http://epcis.trimarinegroup.com/shippingVanNo/MNBU-053054-0</epc> <!-- Container Reference Number -->
                </epcList>
                <action>OBSERVE</action>
                <bizStep>urn:epcglobal:cbv:bizstep:shipping</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_transit</disposition>
                <readPoint>
                    <id></id><!-- Not available -->
                </readPoint>
                <bizLocation>
                    <id>urn:uuid:8e1bf2d5-69b9-4a36-b1fc-c88c41e62f43</id> <!-- Soltuna Processing Plant -->
                </bizLocation>
                <bizTransactionList>
                    <bizTransaction type="urn:epcglobal:cbv:btt:po">45006555667</bizTransaction>
                </bizTransactionList>
                <extension>
                    <sourceList> <!-- Sell from Soltuna to Tri-Marine -->
                        <source type="urn:epcglobal:cbv:sdt:owning_party">urn:uuid:ba0eab77-70aa-468e-8b54-39c7b36c1aca</source> <!-- Soltuna -->
                    </sourceList>
                    <destinationList>
                        <destination type="urn:epcglobal:cbv:sdt:owning_party">urn:epc:id:sgln:081184900.001.0</destination> <!-- Tri-Marine -->
                    </destinationList>
                </extension>
                <gdst:visibilityEvent>Aggregation</gdst:visibilityEvent>
                <gdst:productOwner>urn:epc:id:pgln:081184900.000</gdst:productOwner> <!-- ID for Tri-Marine -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </ObjectEvent>
            
            <ObjectEvent> <!-- V8 Receiving From Cold Storage to Bolton Canning Facility -->
                <eventTime>2018-11-12T02:12:14.133+02:00</eventTime>
                <eventTimeZoneOffset>+02:00</eventTimeZoneOffset>
                <epcList>
                    <epc>http://epcis.trimarinegroup.com/shippingVanNo/MNBU-053054-0</epc> <!--  Container Reference Number -->
                </epcList>
                <action>OBSERVE</action>
                <bizStep>urn:epcglobal:cbv:bizstep:receiving</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_transit</disposition>
                <readPoint>
                    <id></id> <!-- Not Available -->
                </readPoint>
                <bizLocation>
                    <id>urn:epc:id:sgln:8004030.00001.0</id> <!-- BOLTON CANNING FACILITY -->
                </bizLocation>
                <gdst:visibilityEvent>Move</gdst:visibilityEvent>
                <gdst:productOwner>urn:epc:id:pgln:8004030.00000</gdst:productOwner> <!-- ID for Bolton SpA -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </ObjectEvent>
            
            <AggregationEvent> <!-- V9 Unpacking Pallets from Shipping Container -->
                <eventTime>2019-03-11T05:10:14.133+02:00</eventTime>
                <eventTimeZoneOffset>+02:00</eventTimeZoneOffset>
                <parentID>http://epcis.trimarinegroup.com/shippingVanNo/MNBU-053054-0</parentID> <!--  Container Reference Number -->
                <childEPCs></childEPCs>
                <action>DELETE</action>
                <bizStep>urn:epcglobal:cbv:bizstep:unpacking</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:32.242059,-82.329938</id> <!-- Actual Location where event is captured -->
                </readPoint>
                <bizLocation>
                    <id>urn:epc:id:sgln:8004030.00001.0</id> <!-- BOLTON CANNING FACILITY -->
                </bizLocation>
                <extension>
                    <childQuantityList>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Deaggregate</gdst:visibilityEvent>
                <gdst:productOwner>urn:epc:id:pgln:8004030.00000</gdst:productOwner> <!-- ID for Bolton SpA -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <extension> <!-- V10 PROCESS INTO CANS -->
                <TransformationEvent>
                    <eventTime>2019-03-12T08:48:23.125+02:00</eventTime>
                    <eventTimeZoneOffset>+02:00</eventTimeZoneOffset>
                    <inputQuantityList>
                        <quantityElement> <!-- GS1 GTIN + Lot: Yellowfin Tuna Loins -->
                            <epcClass>urn:epc:class:lgtin:081184900.2002.A1802867</epcClass>
                            <quantity>727.5</quantity> <!-- #11 GDST KDE Weight/Quantity -->
                            <uom>KGM</uom>
                        </quantityElement>
                    </inputQuantityList>
                    <outputQuantityList>
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:8004030.204175.L19071</epcClass> <!-- RIO M.TONNO E.V.BIO MSC 65G  PZ -->
                            <quantity>18575</quantity> <!-- Fixed Unit of Measure, Cans of Tuna -->
                        </quantityElement>
                    </outputQuantityList> 
                    <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep>
                    <disposition>urn:epcglobal:cbv:disp:active</disposition>
                    <readPoint>
                        <id>geo:45.698080,9.099674</id> <!-- Bolton Canning Facility Geo Location -->
                    </readPoint>
                    <bizLocation>
                        <id>urn:epc:id:sgln:8004030.00001.0</id> <!-- BOLTON CANNING FACILITY -->
                    </bizLocation>
                    <gdst:visibilityEvent>Transformation</gdst:visibilityEvent>
                    <gdst:productOwner>urn:epc:id:pgln:8004030.00000</gdst:productOwner> <!-- ID for Bolton SpA -->
                    <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
                </TransformationEvent>
            </extension>
            
            <extension> <!-- V11 PROCESS INTO FINISHED PACKS -->
                <TransformationEvent>
                    <eventTime>2019-03-12T16:22:23.125+02:00</eventTime>
                    <eventTimeZoneOffset>+02:00</eventTimeZoneOffset>
                    <inputQuantityList>
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:8004030.204175.L19071</epcClass> <!-- RIO M.TONNO E.V.BIO MSC 65G  PZ -->
                            <quantity>18575</quantity> <!-- Fixed Unit of Measure, Cans of Tuna -->
                        </quantityElement>
                    </inputQuantityList>
                    <outputQuantityList>
                        <quantityElement> 
                            <epcClass>urn:epc:class:lgtin:8004030.135151.L19071</epcClass> <!-- RIO M.TONNO E.V.BIO MSC 65G  3+1X1X24 -->
                            <quantity>54</quantity> <!-- Fixed Unit of Measure, Cartons.  5184 cans -->
                        </quantityElement>
                    </outputQuantityList> 
                    <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep>
                    <disposition>urn:epcglobal:cbv:disp:active</disposition>
                    <readPoint>
                        <id>geo:45.698080,9.099674</id> <!-- Bolton Canning Facility Geo Location -->
                    </readPoint>
                    <bizLocation>
                        <id>urn:epc:id:sgln:8004030.00001.0</id> <!-- BOLTON CANNING FACILITY -->
                    </bizLocation>
                    <ilmd> 
                        <cbvmda:preservationTechniqueCode>CANNING</cbvmda:preservationTechniqueCode> 
                        <cbvmda:bestBeforeDate>2021-12-31</cbvmda:bestBeforeDate>
                        <cbvmda:certificationList>
                            <certification> 
                                <certificationStandard>MSC</certificationStandard>
                                <certificationAgency>Bureau Veritas</certificationAgency>
                                <certificationValue>16 June 2019</certificationValue>
                                <certificationIdentification>MSC-C-53440</certificationIdentification> 
                            </certification>
                            <certification> 
                                <certificationStandard>Organic</certificationStandard>
                                <certificationAgency>ICEA</certificationAgency>
                                <certificationValue>22 August 2020</certificationValue>
                                <certificationIdentification>IT BIO 006 C1029</certificationIdentification> 
                            </certification>
                        </cbvmda:certificationList>
                    </ilmd>
                    <gdst:visibilityEvent>Transformation</gdst:visibilityEvent>
                    <gdst:productOwner>urn:epc:id:pgln:8004030.00000</gdst:productOwner> <!-- ID for Bolton SpA -->
                    <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
                </TransformationEvent>
            </extension>
            
            <AggregationEvent> <!-- V12 Aggregate 54 Cartons to a Pallet  -->
                <eventTime>2019-03-12T18:36:23.582+02:00</eventTime>
                <eventTimeZoneOffset>+02:00</eventTimeZoneOffset>
                <parentID>urn:epc:id:sscc:8004030.1900417530</parentID> <!-- Pallet ID 1 800403090 0417530 9-->
                <childEPCs>
                </childEPCs>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:packing</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_progress</disposition>
                <readPoint>
                    <id>geo:32.242059,-82.329938</id> <!-- Bolton Canning Facility Geo Location -->
                </readPoint>
                <bizLocation>
                    <id>urn:epc:id:sgln:8004030.00001.0</id> <!-- BOLTON CANNING FACILITY -->
                </bizLocation>
                <extension>
                    <childQuantityList>
                        <quantityElement>
                            <epcClass>urn:epc:class:lgtin:8004030.135151.L19071</epcClass>
                            <quantity>54</quantity> <!-- UOM is Cartons -->
                        </quantityElement>
                    </childQuantityList>
                </extension>
                <gdst:visibilityEvent>Aggregate</gdst:visibilityEvent>
                <gdst:productOwner>urn:epc:id:pgln:8004030.00000</gdst:productOwner> <!-- ID for Bolton SpA -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </AggregationEvent>
            
            <ObjectEvent> <!-- V13 Ship Pallet to Metro -->
                <eventTime>2019-05-03T13:36:23.125+02:00</eventTime>
                <eventTimeZoneOffset>+02:00</eventTimeZoneOffset>
                <epcList>
                    <epc>urn:epc:id:sscc:8004030.1900417530</epc> <!-- Pallet ID 1 800403090 0417530 9-->
                </epcList>
                <action>OBSERVE</action>
                <bizStep>urn:epcglobal:cbv:bizstep:shipping</bizStep>
                <disposition>urn:epcglobal:cbv:disp:in_transit</disposition>
                <readPoint>
                    <id>geo:32.242059,-82.329938</id> <!-- Bolton Canning Facility Geo Location -->
                </readPoint>
                <bizLocation>
                    <id>urn:epc:id:sgln:8004030.00001.0</id> <!-- BOLTON CANNING FACILITY -->
                </bizLocation>
                <bizTransactionList> <!-- Customer PO, Shipper Invoice -->
                    <bizTransaction type="urn:epcglobal:cbv:btt:bol">0404885533</bizTransaction>
                </bizTransactionList>
                <extension>
                    <sourceList> <!-- Sell to Metro -->
                        <source type="urn:epcglobal:cbv:sdt:owning_party">urn:epc:id:sgln:8004030.00001.0</source> <!-- Bolton SpA -->
                        <source type="urn:epcglobal:cbv:sdt:location">urn:epc:id:sgln:8004030.00001.0</source> <!-- Bolton Canning Facility-->
                    </sourceList>
                    <destinationList>
                        <destination type="urn:epcglobal:cbv:sdt:owning_party">urn:epc:id:sgln:8026924.00001.0</destination> <!-- Metro Legal Entity-->
                        <destination type="urn:epcglobal:cbv:sdt:location">urn:epc:id:sgln:8026924.00001.0</destination> <!-- Metro Physical Location-->
                    </destinationList>
                </extension>
                <gdst:visibilityEvent>Ship</gdst:visibilityEvent>
                <gdst:productOwner>urn:epc:id:pgln:8004030.00000</gdst:productOwner> <!-- ID for Bolton SpA -->
                <cbvmda:informationProvider>urn:epc:id:pgln:8004030.00000</cbvmda:informationProvider> <!-- PGLN of Bolton SpA. -->
            </ObjectEvent>
        </EventList>
    </EPCISBody>
</epcis:EPCISDocument>
`
}