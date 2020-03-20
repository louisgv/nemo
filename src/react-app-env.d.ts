/// <reference types="react-scripts" />

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

interface Window {
  Ipfs: ?any
}