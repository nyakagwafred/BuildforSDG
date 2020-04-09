/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */

const impact = {};
const severeImpact = {};
let numberOfDays;

const convertToDays = (data) => {
  switch (data.periodType) {
    case 'days':
      numberOfDays = data.timeToElapse * 1;
      return numberOfDays;
    case 'weeks':
      numberOfDays = data.timeToElapse * 7;
      return numberOfDays;
    case 'months':
      numberOfDays = data.timeToElapse * 30;
      return numberOfDays;
    default:
      numberOfDays = data.timeToElapse * 31;
      return numberOfDays;
  }
};

// eslint-disable-next-line no-shadow
const covid19ImpactEstimator = (data) => {

  // Challenge 1

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  
  impact.infectionsByRequestedTime = (impact.currentlyInfected * (2 ** Math.floor((convertToDays(data) / 3))));
  severeImpact.infectionsByRequestedTime = (severeImpact.currentlyInfected * (2 ** Math.floor((convertToDays(data) / 3))));

  // Challenge 2

  impact.severeCasesByRequestedTime = Math.ceil(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.ceil(severeImpact.infectionsByRequestedTime * 0.15);

  impact.hospitalBedsByRequestedTime = Math.ceil(((0.35 * data.totalHospitalBeds) - impact.severeCasesByRequestedTime));
  severeImpact.hospitalBedsByRequestedTime = Math.ceil(((0.35 * data.totalHospitalBeds) - severeImpact.severeCasesByRequestedTime));

  // Challenge 3

  impact.casesForICUByRequestedTime = Math.floor(0.05 * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.floor(0.05 * severeImpact.infectionsByRequestedTime);

  impact.casesForVentilatorsByRequestedTime = Math.ceil(0.02 * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.ceil(0.02 * severeImpact.infectionsByRequestedTime);

  const impactDollar = (impact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation) * data.region.avgDailyIncomeInUSD * convertToDays(data);
  const severeDollar = (severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation) * data.region.avgDailyIncomeInUSD * convertToDays(data);

  impact.dollarsInFlight = (Math.ceil(impactDollar) - 1);
  severeImpact.dollarsInFlight = (Math.ceil(severeDollar) - 1);

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
