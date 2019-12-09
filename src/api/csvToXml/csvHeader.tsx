export const csvAggregationEventHeader = [
  'action',
  'bizStep',
  'informationProvider',
  'productOwner',
  'parentID',
  'eventTime',
  'eventTimeZoneOffset',
  'visibilityEvent',
  'disposition',

  'childEPCs_epc',

  'readPoint_id',
  'bizLocation_id',

  'extension_childQuantityList_quantityElement_epcClass',
  'extension_childQuantityList_quantityElement_quantity',
  'extension_childQuantityList_quantityElement_uom'
]

export const csvTransformationEventHeader = [
  'bizStep',
  'informationProvider',
  'productOwner',
  'eventTime',
  'eventTimeZoneOffset',
  'visibilityEvent',
  'disposition',

  'readPoint_id',
  'bizLocation_id',

  'inputQuantityList_quantityElement_epcClass',
  'inputQuantityList_quantityElement_quantity',
  'inputQuantityList_quantityElement_uom',

  'outputQuantityList_quantityElement_epcClass',
  'outputQuantityList_quantityElement_quantity',
  'outputQuantityList_quantityElement_uom',

  'ilmd_lotNumber',
  'ilmd_productionDate',
  'ilmd_bestBeforeDate',
  'ilmd_preservationTechniqueCode',

  'ilmd_certificationList_certification_certificationAgency',
  'ilmd_certificationList_certification_certificationIdentification',
  'ilmd_certificationList_certification_certificationStandard',
  'ilmd_certificationList_certification_certificationValue'
]

export const csvObjectEventHeader = [
  'action',
  'bizStep',
  'informationProvider',
  'productOwner',
  'eventTime',
  'eventTimeZoneOffset',
  'visibilityEvent',
  'disposition',

  'epcList_epc',

  'readPoint_id',
  'bizLocation_id',

  'bizTransactionList_bizTransaction_type',
  'bizTransactionList_bizTransaction_value',

  'extension_sourceList_source_type',
  'extension_sourceList_source_value',

  'extension_destinationList_destination_type',
  'extension_destinationList_destination_value',

  'extension_ilmd_FIP',
  'extension_ilmd_harvestCertification',
  'extension_ilmd_harvestCertificationCoC',
  'extension_ilmd_harvestEndDate',
  'extension_ilmd_harvestStartDate',
  'extension_ilmd_ISSF',
  'extension_ilmd_landingDateEnd',
  'extension_ilmd_landingDateStart',
  'extension_ilmd_productionMethodCode',
  'extension_ilmd_ratingsScheme',
  'extension_ilmd_ratingsScore',
  'extension_ilmd_unloadingPort',
  'extension_ilmd_vesselRegistryLink',
  'extension_ilmd_vesselTransponder',

  'extension_ilmd_certificationList_certification_certificationAgency',
  'extension_ilmd_certificationList_certification_certificationIdentification',
  'extension_ilmd_certificationList_certification_certificationStandard',
  'extension_ilmd_certificationList_certification_certificationValue',

  'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_catchArea',
  'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_fishingGearTypeCode',
  'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselFlagState',
  'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselID',
  'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselName',
  'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselOperator',
  'extension_ilmd_vesselCatchInformationList_vesselCatchInformation_vesselRegistration',

  'extension_quantityList_quantityElement_epcClass',
  'extension_quantityList_quantityElement_quantity',
  'extension_quantityList_quantityElement_uom'
]

export const csvLocationHeader = [
  'informationProvider',
  'id',
  'name',
  'unloadingPort',
  'streetAddressOne',
  'streetAddressTwo',
  'city',
  'state',
  'postalCode',
  'countryCode',
  'latitude',
  'longitude',
  'contact',
  'telephone',
  'email',
  'vesselID',
  'vesselName',
  'vesselOwnerName',
  'vesselOrganizationName',
  'fishingGearTypeCode',
  'geofencePolygonPolygonPointSeq',
  'geofencePolygonPolygonPointValue'
]

export const csvEpcClassHeader = [
  'informationProvider',
  'id',
  'descriptionShort',
  'speciesForFisheryStatisticsPurposesName',
  'speciesForFisheryStatisticsPurposesCode',
  'tradeItemConditionCode',
  'additionalTradeItemIdentification',
  'preservationTechniqueCode',
  'grossWeightMeasurementValue',
  'grossWeightMeasurementUnitCode'
]

export const csvBusinessDocumentHeader = [
  'senderId',
  'senderName',
  'senderEmail',
  'receiverId',
  'receiverName',
  'receiverEmail'
]

export const csvMasterDataHeader = [
  'informationProviderID',
  'informationProviderContact',
  'informationProviderEmail',
  'informationReceiverID',
  'informationReceiverContact',
  'informationReceiverEmail',
  'childEPC',
  'informationProviderChild',
  'speciesCodeChild',
  'speciesNameChild',
  'descriptionShortChild',
  'itemConditionCodeChild',
  'parentEPC',
  'informationProviderParent',
  'descriptonShortParent',
  'speciesCodeParent',
  'speciesNameParent',
  'preservationTechniqueCode',
  'unitOfMeasure',
  'grossWeight',
  'itemConditionCodeParent',
  'additionalTradeItemIdentificationParent'
]

export const csvLocationDataHeaderV0 = [
  'location',
  'name',
  'partyIDTypeCode',
  'additionalPartyID',
  'streetAddressOne',
  'streetAddressTwo',
  'city',
  'state',
  'postalCode',
  'countryCode',
  'latitude',
  'longitude',
  'contact',
  'telephone',
  'email'
]

export const csvEventLevelDataHeader = [
  'action',
  'eventTime',
  'eventTimeZoneOffset',
  'readPoint',
  'bizLocation',
  'purchaseOrderNumber',
  'quantity',
  'productOwner',
  'informationProvider'
]

export const csvAggregationDisaggregationHeader = [
  ...csvMasterDataHeader,
  ...csvLocationDataHeaderV0,
  ...csvEventLevelDataHeader
]

export const csvShipReceiveHeader = [
  ...csvMasterDataHeader,
  ...csvLocationDataHeaderV0,
  ...csvEventLevelDataHeader
]

export const csvAggregatedCatchProcessHeader = [
  'informationProviderID',
  'informationProviderContactName',
  'informationProviderEmail',
  'destinationID',
  'destinationContactName',
  'destinationEmail',
  'eventDateV1',
  'eventTimeZoneOffsetV1',
  'readPointV1',
  'bizLocationV1',
  'seafoodID',
  'speciesCode',
  'speciesScientificName',
  'tradeItemDescription',
  'tradeItemConditionCode',
  'seafoodQuantity',
  'seafoodUOM',
  'vesselOperator',
  'vesselID',
  'vesselRegistration',
  'vesselName',
  'vesselFlagState',
  'catchAreaFAO',
  'fishingGearTypeCode',
  'productionMethodCode',
  'harvestStartDate',
  'harvestEndDate',
  'unloadingPort',
  'mscCertification',
  'landingAuthority',
  'landingAuthorization',
  'landingDateStart',
  'landingDateEnd',
  'harvestCertification',
  'harvestCertificationCoC',
  'FIP',
  'ISSF',
  'ratingsScore',
  'ratingsScheme',
  'vesselTransponder',
  'vesselRegistryLink',
  'visibilityEvent',
  'productOwnerV1',
  'eventDateV2',
  'eventTimeZoneOffsetV2',
  'readPointV2',
  'bizLocationV2',
  'inputSeafoodID',
  'inputSeafoodQuantity',
  'inputSeafoodUOM',
  'outputProductID',
  'outputProductName',
  'outputQuantity',
  'outputUOM',
  'lotNumber',
  'productionDate',
  'bestBeforeDate',
  'storageStateCode',
  'firstFreezeDate',
  'countryOfOrigin',
  'processorOwnerName',
  'processorID',
  'processorAddress1',
  'processorAddress2',
  'processorCity',
  'processorState',
  'processorPostalCode',
  'processorCountryCode',
  'processorContactName',
  'processorContactEmail',
  'transformationVisibilityEvent',
  'productOwnerV3'
]
