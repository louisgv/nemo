import { DateTime } from "luxon";
import { upper } from "case";
import { productionMethodCodeMap } from "../_data";

const getCoordinate = () =>
  new Promise(resolve => {
    const fallback = {
      latitude: 0.886256,
      longitude: 148.445297
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        () => resolve(fallback)
      );
    } else {
      resolve(fallback);
    }
  });

const generateQuantityElementList = (fishCode = "", quantityList = []) =>
  quantityList
    .map(
      ({ epcClass, quantity, uom }: any) => `
    <quantityElement>
      <epcClass>http://epcis.nemo.com/user/vocab/obj/${fishCode}.${epcClass}</epcClass>
      <quantity>${quantity}</quantity>
      <uom>${uom}</uom>
    </quantityElement>`
    )
    .join("\n");

const generateNonEmptyElement = (element: string, value: string) =>
  value ? `<${element}>${value}</${element}>` : "";

export const createCatchPayload = async ({
  catchArea,
  fishCode,
  harvestEndDate,
  harvestStartDate,
  quantityList,

  firstName,
  lastName,

  fishingGearType,
  organizationName,
  productionMethod,

  language,

  vesselIdType,
  vesselIdString,
  vesselName,
  vesselOwnerName,

  vesselCertificationAgency,
  vesselCertificationIdentification,
  vesselCertificationStandard,
  vesselCertificationValue
}: any) => {
  const dt = DateTime.local();

  const creationDate = dt.toISO();
  const eventTimeZoneOffset = dt.toFormat("ZZ");

  const { latitude, longitude } = (await getCoordinate()) as any;

  const quantityElementList = generateQuantityElementList(
    fishCode,
    quantityList
  );

  const vesselCaptainName = upper(`${lastName}_${firstName}`, ",");

  const productionMethodCode = productionMethodCodeMap[productionMethod];

  const vesselID = upper(vesselIdType) + "." + vesselIdString;

  const vesselFlagState = upper(language);

  return `
  <epcis:EPCISDocument xmlns:epcis="urn:epcglobal:epcis:xsd:1" 
    schemaVersion="1.1" 
    creationDate="2001-12-17T09:30:47Z" 
    xmlns:eecc="http://ns.eecc.info/epcis"
    xmlns:sbdh="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="urn:epcglobal:epcis:xsd:1 http://www.gs1si.org/BMS/epcis/1_2/EPCglobal-epcis-1_2.xsd" 
    xmlns:cbvmda="urn:epcglobal:cbv:mda">
      <EPCISBody>
        <EventList>
            <ObjectEvent> <!-- V1 CREATE THE CATCH EVENT ID WITH GDST KDEs-->
                <eventTime>${creationDate}</eventTime>
                <eventTimeZoneOffset>${eventTimeZoneOffset}</eventTimeZoneOffset>
                <epcList>
                </epcList>
                <action>ADD</action>
                <bizStep>urn:epcglobal:cbv:bizstep:commissioning</bizStep>
                <disposition>urn:epcglobal:cbv:disp:active</disposition>
                <readPoint>
                    <id>geo:${latitude},${longitude}</id> <!-- Point where catch was recorded -->
                </readPoint>
                <extension>
                    <quantityList>
                      ${quantityElementList}
                    </quantityList>
                    <ilmd>
                        <cbvmda:vesselCatchInformationList> <!--  Attach GDST KDEs to unique Catch Event -->
                            <vesselCatchInformation>
                                <vesselID>${vesselID}</vesselID> <!-- #2 & 3 GDST KDE Vessel ID -->
                                <vesselName>${vesselName}</vesselName> <!-- #1 GDST KDE Vessel Name  -->

                                <!-- A1 GDST KDE Vessel Ownership -->
                                ${generateNonEmptyElement('vesselOwnerName',vesselOwnerName)}
                                ${generateNonEmptyElement('organizationName',organizationName)}

                                <vesselCaptainName>${vesselCaptainName}</vesselCaptainName>
                                <vesselFlagState>${vesselFlagState}</vesselFlagState> <!-- #4 Vessel Flag State -->
                                <catchArea>FAO.${catchArea}</catchArea> <!-- #7 GDST KDE Catch Area -->
                                <fishingGearTypeCode>${fishingGearType}</fishingGearTypeCode> <!-- #5 Gear Type -->
                            </vesselCatchInformation>
                        </cbvmda:vesselCatchInformationList>
                        <cbvmda:productionMethodCode>${productionMethodCode}</cbvmda:productionMethodCode> <!-- #19 GDST KDE Production Method -->
                        <cbvmda:harvestStartDate>${harvestStartDate}</cbvmda:harvestStartDate> <!-- #8 & 9 GDST KDE Date of Capture -->
                        <cbvmda:harvestEndDate>${harvestEndDate}</cbvmda:harvestEndDate> <!-- #8 & 9 GDST KDE Date of Capture -->
                        ${
                          vesselCertificationStandard ? 
                          `
                            <cbvmda:certificationList> <!-- #6 GDST KDE Fishing Authorization / Organization License, Certs (Aqua) -->
                              <certification>
                                  <certificationStandard>${vesselCertificationStandard}</certificationStandard>
                                  <certificationAgency>${vesselCertificationAgency}</certificationAgency>
                                  <certificationValue>${vesselCertificationValue}</certificationValue>
                                  <certificationIdentification>${vesselCertificationIdentification}</certificationIdentification>
                              </certification>
                          </cbvmda:certificationList>
                          `: ''
                        }
                    </ilmd>
                </extension>
            </ObjectEvent>    
        </EventList>
    </EPCISBody>
  </epcis:EPCISDocument>
`;
};
