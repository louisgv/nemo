import { DateTime } from "luxon";
import { createSender, createReceiver, createFishVocab, createOutputProductVocab, createLocationVocab, createFishCatchEvent, createProcessEvent } from "./csv";
export const createSingleCatchAndProcessXml = async (data: CsvAggregatedPayloadFields) => {
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
`;
};
