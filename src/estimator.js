/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */

const impact = {};


const severeImpact = {};


// eslint-disable-next-line no-shadow
const covid19ImpactEstimator = (data) => {

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  
  impact.infectionsByRequestedTime = Math.round(impact.currentlyInfected * (2 ** (data.timeToElapse / 3)));
  severeImpact.infectionsByRequestedTime = Math.round(severeImpact.currentlyInfected * (2 ** (data.timeToElapse / 3)));

  impact.severeCasesByRequestedTime = Math.round(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.round(severeImpact.infectionsByRequestedTime * 0.15);

  impact.hospitalBedsByRequestedTime = Math.round(((0.35 * data.totalHospitalBeds) - impact.severeCasesByRequestedTime));
  severeImpact.hospitalBedsByRequestedTime = Math.round(((0.35 * data.totalHospitalBeds) - severeImpact.severeCasesByRequestedTime));

  impact.casesForICUByRequestedTime = Math.round(0.05 * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.round(0.05 * severeImpact.infectionsByRequestedTime);

  impact.casesForVentilatorsByRequestedTime = Math.round(0.02 * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.round(0.02 * severeImpact.infectionsByRequestedTime);
  
  impact.dollarsInFlight = Math.round((impact.infectionsByRequestedTime * 0.65) * 1.5 * data.timeToElapse);
  severeImpact.dollarsInFlight = Math.round((severeImpact.infectionsByRequestedTime * 0.65) * 1.5 * data.timeToElapse);
  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
