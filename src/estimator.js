/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */

// const data = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 4,
//     avgDailyIncomePopulation: 0.73
//   },
  
//   periodType: 'days',
//   timeToElapse: 38,
//   reportedCases: 2747,
//   population: 92931687,
//   totalHospitalBeds: 678874
// };

const impact = {};
const severeImpact = {};
let numberOfDays;

const convertToDays = () => {
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

// Converts weeks and months to days
// eslint-disable-next-line consistent-return
// const convertToDays = (data) => {

//   if (data.periodType === 'days') {
//     data.timeToElapse *= 1;
//   } 

//   if (data.periodType === 'weeks') {
//     data.timeToElapse *= 7;
//   } 

//   if (data.periodType === 'months') {
//     data.timeToElapse *= 30;
//   }

//   return data.timeToElapse;
// };


// eslint-disable-next-line no-shadow
const covid19ImpactEstimator = (data) => {

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  
  impact.infectionsByRequestedTime = Math.round(impact.currentlyInfected * (2 ** Math.floor((convertToDays() / 3))));
  severeImpact.infectionsByRequestedTime = Math.round(severeImpact.currentlyInfected * (2 ** Math.floor((convertToDays() / 3))));

  impact.severeCasesByRequestedTime = Math.round(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.round(severeImpact.infectionsByRequestedTime * 0.15);

  impact.hospitalBedsByRequestedTime = Math.round(((0.35 * data.totalHospitalBeds) - impact.severeCasesByRequestedTime));
  severeImpact.hospitalBedsByRequestedTime = Math.round(((0.35 * data.totalHospitalBeds) - severeImpact.severeCasesByRequestedTime));

  impact.casesForICUByRequestedTime = Math.round(0.05 * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.round(0.05 * severeImpact.infectionsByRequestedTime);

  impact.casesForVentilatorsByRequestedTime = Math.round(0.02 * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.round(0.02 * severeImpact.infectionsByRequestedTime);

  const impactDollar = (impact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation) * data.region.avgDailyIncomeInUSD * convertToDays(data);
  const severeDollar = (severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation) * data.region.avgDailyIncomeInUSD * convertToDays(data);

  impact.dollarsInFlight = Math.round(impactDollar * 10) / 10;
  severeImpact.dollarsInFlight = Math.round(severeDollar * 10) / 10;

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
