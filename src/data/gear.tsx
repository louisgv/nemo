export const gearTree = {
  surroundingNet: {
    // 01.0.0
    withPurseLines: {
      // 01.1.0
      oneBoatOperated: null, // 01.1.1
      twoBoatsOperated: null // 01.1.2
    },
    withoutPurseLines: null // 01.2.0
  },
  seineNets: {
    // 02.0.0
    beachSeines: null, // 02.1.0
    vesselSeines: {
      // 02.2.0
      danishSeines: null, // 02.2.1
      scottishSeines: null,
      pairSeines: null
    },
    seineNetsNotSpecified: null // 02.9.90
  },
  trawls: {
    bottomTrawls: {
      beamTrawls: null,
      otterTrawls: null,
      pairTrawls: null,
      nephropsTrawls: null,
      shrimpTrawls: null,
      bottomTrawlsNotSpecified: null
    },
    midwaterTrawls: {
      otterTrawls: null,
      pairTrawls: null,
      shrimpTrawls: null,
      midwaterTrawlsNotSpecified: null
    },
    otterTwinTrawls: null,
    otterTrawlsNotSpecified: null,
    pairTrawlsNotSpecified: null,
    otherTrawlsNotSpecified: null
  },
  dredges: {
    boatDredges: null,
    handDredges: null
  },
  liftNets: {
    portableLiftNets: null,
    boatOperatedLiftNets: null,
    shoreOperatedStationaryLiftNets: null,
    liftNetsNotSpecified: null
  },
  fallingGear: {
    castNets: null,
    fallingGearNotSpecified: null
  },
  gillnetsAndEntanglingNets: {
    setGillnetsAnchored: null,
    driftnets: null,
    encirclingGillnets: null,
    fixedGillnetsOnStakes: null,
    trammelNets: null,
    combinedGillnetsTrammelNets: null,
    gillnetsAndEntanglingNetsNotSpecified: null,
    gillnetsNotSpecified: null
  },
  traps: {
    stationaryUncoveredPoundNets: null,
    pots: null,
    fykeNets: null,
    stowNets: null,
    barriersFencesWeirsEtc: null,
    aerialTraps: null,
    trapsNotSpecified: null
  },
  hooksAndLines: {
    handlinesAndPoleLinesHandOperated: null,
    handlinesAndPoleLinesMechanized: null,
    setLonglines: null,
    driftingLonglines: null,
    longlinesNotSpecified: null,
    trollingLines: null,
    hooksAndLinesNotSpecified: null
  },
  grapplingAndWounding: {
    harpoonsHAR: null
  },
  harvestingMachines: {
    pumps: null,
    mechanizedDredges: null,
    harvestingMachinesNotSpecified: null
  },
  miscellaneousGear: null,
  recreationalFishingGear: null,
  gearNotKnowOrNotSpecified: null
};

export const gearISSCFGMap = {
  surroundingNet: "01.0.0",
  surroundingNet_withPurseLines: "01.1.0",
  surroundingNet_withPurseLines_oneBoatOperated: "01.1.1",
  surroundingNet_withPurseLines_twoBoatsOperated: "01.1.2",
  surroundingNet_withoutPurseLines: "01.2.0",
  seineNets: "02.0.0",
  seineNets_beachSeines: "02.1.0",
  seineNets_vesselSeines: "02.2.0",
  seineNets_vesselSeines_danishSeines: "02.2.1",
  seineNets_vesselSeines_scottishSeines: "02.2.2",
  seineNets_vesselSeines_pairSeines: "02.2.3",
  seineNets_seineNetsNotSpecified: "02.9.0",
  trawls: "03.0.0",
  trawls_bottomTrawls: "03.1.0",
  trawls_bottomTrawls_beamTrawls: "03.1.1",
  trawls_bottomTrawls_otterTrawls: "03.1.2",
  trawls_bottomTrawls_pairTrawls: "03.1.3",
  trawls_bottomTrawls_nephropsTrawls: "03.1.4",
  trawls_bottomTrawls_shrimpTrawls: "03.1.5",
  trawls_bottomTrawls_bottomTrawlsNotSpecified: "03.1.9",
  trawls_midwaterTrawls: "03.2.0",
  trawls_midwaterTrawls_otterTrawls: "03.2.1",
  trawls_midwaterTrawls_pairTrawls: "03.2.2",
  trawls_midwaterTrawls_shrimpTrawls: "03.2.3",
  trawls_midwaterTrawls_midwaterTrawlsNotSpecified: "03.2.9",
  trawls_otterTwinTrawls: "03.3.0",
  trawls_otterTrawlsNotSpecified: "03.4.9",
  trawls_pairTrawlsNotSpecified: "03.5.9",
  trawls_otherTrawlsNotSpecified: "03.9.0",
  dredges: "04.0.0",
  dredges_boatDredges: "04.1.0",
  dredges_handDredges: "04.2.0",
  liftNets: "05.0.0",
  liftNets_portableLiftNets: "05.1.0",
  liftNets_boatOperatedLiftNets: "05.2.0",
  liftNets_shoreOperatedStationaryLiftNets: "05.3.0",
  liftNets_liftNetsNotSpecified: "05.9.0",
  fallingGear: "06.0.0",
  fallingGear_castNets: "06.1.0",
  fallingGear_fallingGearNotSpecified: "06.9.0",
  gillnetsAndEntanglingNets: "07.0.0",
  gillnetsAndEntanglingNets_setGillnetsAnchored: "07.1.0",
  gillnetsAndEntanglingNets_driftnets: "07.2.0",
  gillnetsAndEntanglingNets_encirclingGillnets: "07.3.0",
  gillnetsAndEntanglingNets_fixedGillnetsOnStakes: "07.4.0",
  gillnetsAndEntanglingNets_trammelNets: "07.5.0",
  gillnetsAndEntanglingNets_combinedGillnetsTrammelNets: "07.6.0",
  gillnetsAndEntanglingNets_gillnetsAndEntanglingNetsNotSpecified: "07.9.0",
  gillnetsAndEntanglingNets_gillnetsNotSpecified: "07.9.1",
  traps: "08.0.0",
  traps_stationaryUncoveredPoundNets: "08.1.0",
  traps_pots: "08.2.0",
  traps_fykeNets: "08.3.0",
  traps_stowNets: "08.4.0",
  traps_barriersFencesWeirsEtc: "08.5.0",
  traps_aerialTraps: "08.6.0",
  traps_trapsNotSpecified: "08.9.0",
  hooksAndLines: "09.0.0",
  hooksAndLines_handlinesAndPoleLinesHandOperated: "09.1.0",
  hooksAndLines_handlinesAndPoleLinesMechanized: "09.2.0",
  hooksAndLines_setLonglines: "09.3.0",
  hooksAndLines_driftingLonglines: "09.4.0",
  hooksAndLines_longlinesNotSpecified: "09.5.0",
  hooksAndLines_trollingLines: "09.6.0",
  hooksAndLines_hooksAndLinesNotSpecified: "09.9.0",
  grapplingAndWounding: "10.0.0",
  grapplingAndWounding_harpoons: "10.1.0",
  harvestingMachines: "11.0.0",
  harvestingMachines_pumps: "11.1.0",
  harvestingMachines_mechanizedDredges: "11.2.0",
  harvestingMachines_harvestingMachinesNotSpecified: "11.9.0",
  miscellaneousGear: "20.0.0",
  recreationalFishingGear: "25.0.0",
  gearNotKnowOrNotSpecified: "99.0.0"
};

const gearAbbreviationMap = {
  surroundingNet_withPurseLines: "PS",
  surroundingNet_withPurseLines_oneBoatOperated: "PS1",
  surroundingNet_withPurseLines_twoBoatsOperated: "PS2",
  surroundingNet_withoutPurseLines: "LA",

  seineNets_beachSeines: "SB",
  seineNets_vesselSeines: "SV",
  seineNets_vesselSeines_danishSeines: "SDN",
  seineNets_vesselSeines_scottishSeines: "SSC",
  seineNets_vesselSeines_pairSeines: "SPR",
  seineNets_seineNetsNotSpecified: "SX",

  trawls_bottomTrawls_beamTrawls: "TTB",
  trawls_bottomTrawls_otterTrawls: "OTB",
  trawls_bottomTrawls_pairTrawls: "PTB",
  trawls_bottomTrawls_nephropsTrawls: "TBN",
  trawls_bottomTrawls_shrimpTrawls: "TBS",
  trawls_bottomTrawls_bottomTrawlsNotSpecified: "TB",

  trawls_midwaterTrawls_otterTrawls: "OTM",
  trawls_midwaterTrawls_pairTrawls: "PTM",
  trawls_midwaterTrawls_shrimpTrawls: "TMS",
  trawls_midwaterTrawls_midwaterTrawlsNotSpecified: "TM",
  trawls_otterTwinTrawls: "OTT",
  trawls_otterTrawlsNotSpecified: "OT",
  trawls_pairTrawlsNotSpecified: "PT",
  trawls_otherTrawlsNotSpecified: "TX",

  dredges_boatDredges: "DRB",
  dredges_handDredges: "DRH",

  liftNets_portableLiftNets: "LNP",
  liftNets_boatOperatedLiftNets: "LNB",
  liftNets_shoreOperatedStationaryLiftNets: "LNS",
  liftNets_liftNetsNotSpecified: "LN",

  fallingGear_castNets: "FCN",
  fallingGear_fallingGearNotSpecified: "FG",

  gillnetsAndEntanglingNets_setGillnetsAnchored: "GNS",
  gillnetsAndEntanglingNets_driftnets: "GND",
  gillnetsAndEntanglingNets_encirclingGillnets: "GNC",
  gillnetsAndEntanglingNets_fixedGillnetsOnStakes: "GNF",
  gillnetsAndEntanglingNets_trammelNets: "GTR",
  gillnetsAndEntanglingNets_combinedGillnetsTrammelNets: "GTN",
  gillnetsAndEntanglingNets_gillnetsAndEntanglingNetsNotSpecified: "GEN",
  gillnetsAndEntanglingNets_gillnetsNotSpecified: "GN",

  traps_stationaryUncoveredPoundNets: "FPN",
  traps_pots: "FPO",
  traps_fykeNets: "FYK",
  traps_stowNets: "FSN",
  traps_barriersFencesWeirsEtc: "FWR",
  traps_aerialTraps: "FAR",
  traps_trapsNotSpecified: "FIX",

  hooksAndLines_handlinesAndPoleLinesHandOperated: "LHP",
  hooksAndLines_handlinesAndPoleLinesMechanized: "LHM",
  hooksAndLines_setLonglines: "LLS",
  hooksAndLines_driftingLonglines: "LLD",
  hooksAndLines_longlinesNotSpecified: "LL",
  hooksAndLines_trollingLines: "LTL",
  hooksAndLines_hooksAndLinesNotSpecified: "LX",

  grapplingAndWounding_harpoons: "HAR",

  harvestingMachines_pumps: "HMP",
  harvestingMachines_mechanizedDredges: "HMD",
  harvestingMachines_harvestingMachinesNotSpecified: "HMX",

  miscellaneousGear: "MIS",
  recreationalFishingGear: "RG",
  gearNotKnowOrNotSpecified: "NK"
};

/**
 * data extraction code:

import {camel} from "case"

const data = `

`.split('\n')

const output = {}

data.map(d=>camel(d.trim())).forEach(d=>output[d] = null)

console.log(JSON.stringify(output, "\t", 2))

 */

/**
  * 
  * convert to ISSCFG Code, not accomodating special case.
  * 
import {camel} from "case"

const gearTree = {
  surroundingNet: {
    // 01.0.0
    withPurseLines: {
      // 01.1.0
      oneBoatOperated: null, // 01.1.1
      twoBoatsOperated: null // 01.1.2
    },
    withoutPurseLines: null // 01.2.0
  },
  seineNets: {
    // 02.0.0
    beachSeines: null, // 02.1.0
    vesselSeines: {
      // 02.2.0
      danishSeines: null, // 02.2.1
      scottishSeines: null,
      pairSeines: null
    },
    seineNetsNotSpecified: null // 02.9.90
  }
};

const output = {}

function extractTree (c, prevKey, prevIndex, level) {
  if( c === null) {
    
    return;
  };

  Object.keys(c).forEach((k, i)=>{
    const key = level === 1 ? k : `${prevKey}_${k}`

    const nValue = key.search(/notSpecified/i) === -1 
      ? i+1
      : 9;

    const baseValue = (level === 1 
      ? (`0${nValue}`).slice(-2)
      : `${prevIndex}.${nValue}`)

    output[key] = baseValue + ('.0').repeat(3-level)
    extractTree(c[k], key, baseValue, level + 1)
  })
}

extractTree(gearTree,'', 0, 1)

console.log(JSON.stringify(output, '\t', 2))

  * 
  */
