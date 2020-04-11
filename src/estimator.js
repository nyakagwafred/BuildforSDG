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
      numberOfDays = data.timeToElapse;
      return numberOfDays;
    case 'weeks':
      numberOfDays = data.timeToElapse * 7;
      return numberOfDays;
    case 'months':
      numberOfDays = data.timeToElapse * 30;
      return numberOfDays;
    default:
      numberOfDays = data.timeToElapse;
      return numberOfDays;
  }
};

// eslint-disable-next-line no-shadow
const covid19ImpactEstimator = (data) => {

  // Challenge 1

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  
  impact.infectionsByRequestedTime = (impact.currentlyInfected * (2 ** Math.trunc((convertToDays(data) / 3))));
  severeImpact.infectionsByRequestedTime = (severeImpact.currentlyInfected * (2 ** Math.trunc((convertToDays(data) / 3))));

  // Challenge 2

  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.15);

  impact.hospitalBedsByRequestedTime = Math.trunc(((0.35 * data.totalHospitalBeds) - impact.severeCasesByRequestedTime));
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(((0.35 * data.totalHospitalBeds) - severeImpact.severeCasesByRequestedTime));

  // Challenge 3

  impact.casesForICUByRequestedTime = Math.trunc(0.05 * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.trunc(0.05 * severeImpact.infectionsByRequestedTime);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * severeImpact.infectionsByRequestedTime);

  impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / convertToDays(data));
  severeImpact.dollarsInFligh = Math.trunc((severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / convertToDays(data));

  impact.dollarsInFlight += 1;
  severeImpact.dollarsInFlight += 1;

  return { data, impact, severeImpact };
};

module.exports = covid19ImpactEstimator;
