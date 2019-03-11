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