/// <reference types="react-scripts" />

declare module "react-simple-chatbot";
declare module 'react-country-flag';
declare module 'react-autosuggest';
declare module 'react-styled-select';
declare module 'autoscroll-react';
declare module 'react-rewards';
declare module 'use-persisted-state';
declare module 'uuid/v4';

interface IDialogue extends LocalizedStringsMethods {
  initialAsk: string;
}

interface CaptainProfileReviewFormFields {
  firstName: string;
  middleName: string;
  lastName: string;

  vesselIdType: string;
  vesselIdString: string;
  vesselName: string;

  fishingGearType: string;

  productionMethod: string;
  vesselOwnerName: string;
  organizationName: string;

  vesselCertificationStandard: string;
  vesselCertificationAgency: string;
  vesselCertificationValue: string;
  vesselCertificationIdentification: string;

  unitOfMeasurement: string;
}

interface CsvPayloadFields {
  informationProviderID: string
  informationProviderContactName: string
  informationProviderEmail: string
  destinationID: string
  destinationContactName: string
  destinationEmail: string
  eventDateV1: string
  eventTimeZoneOffsetV1: string
  readPointV1: string
  bizLocationV1: string
  seafoodID: string
  speciesCode: string
  speciesScientificName: string
  tradeItemDescription: string
  tradeItemConditionCode: string
  seafoodQuantity: string
  seafoodUOM: string
  vesselOperator: string
  vesselID: string
  vesselRegistration: string
  vesselName: string
  vesselFlagState: string
  catchAreaFAO: string
  fishingGearTypeCode: string
  productionMethodCode: string
  harvestStartDate: string
  harvestEndDate: string
  unloadingPort: string
  mscCertification: string
  landingAuthority: string
  landingAuthorization: string
  landingDateStart: string
  landingDateEnd: string
  harvestCertification: string
  harvestCertificationCoC: string
  FIP: string
  ISSF: string
  ratingsScore: string
  ratingsScheme: string
  vesselTransponder: string
  vesselRegistryLink: string
  visibilityEvent: string
  productOwnerV1: string
  eventDateV2: string
  eventTimeZoneOffsetV2: string
  readPointV2: string
  bizLocationV2: string
  inputSeafoodID: string
  inputSeafoodQuantity: string
  inputSeafoodUOM: string
  outputProductID: string
  outputProductName: string
  outputQuantity: string
  outputUOM: string
  lotNumber: string
  productionDate: string
  bestBeforeDate: string
  storageStateCode: string
  firstFreezeDate: string
  countryOfOrigin: string
  processorOwnerName: string
  processorID: string
  processorAddress1: string
  processorAddress2: string
  processorCity: string
  processorState: string
  processorPostalCode: string
  processorCountryCode: string
  processorContactName: string
  processorContactEmail: string
  transformationVisibilityEvent: string
  productOwnerV3: string
}