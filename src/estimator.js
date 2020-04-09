
const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 6,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};


const impact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0,
  severeCasesByRequestedTime: 0,
  hospitalBedsByRequestedTime: 0,
  casesForICUByRequestedTime: 0,
  casesForVentilatorsByRequestedTime: 0,
  dollarsInFlight: ''
};


const severeImpact = {
  currentlyInfected: 0,
  infectionsByRequestedTime: 0,
  severeCasesByRequestedTime: 0,
  hospitalBedsByRequestedTime: 0,
  casesForICUByRequestedTime: 0,
  casesForVentilatorsByRequestedTime: 0,
  dollarsInFlight: ''
};


// eslint-disable-next-line no-shadow
const covid19ImpactEstimator = (data) => {
  const input = data;

  impact.currentlyInfected = input.reportedCases * 10;
  severeImpact.currentlyInfected = input.reportedCases * 50;
  impact.infectionsByRequestedTime = Math.round(impact.currentlyInfected * (2 ** (input.timeToElapse / 3)));
  severeImpact.infectionsByRequestedTime = Math.round(severeImpact.currentlyInfected * (2 ** (input.timeToElapse / 3)));
  impact.severeCasesByRequestedTime = Math.round(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.round(severeImpact.infectionsByRequestedTime * 0.15);
  impact.hospitalBedsByRequestedTime = Math.round(((0.35 * input.totalHospitalBeds) - impact.severeCasesByRequestedTime));
  severeImpact.hospitalBedsByRequestedTime = Math.round(((0.35 * input.totalHospitalBeds) - severeImpact.severeCasesByRequestedTime));
  impact.casesForICUByRequestedTime = Math.round(0.05 * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.round(0.05 * severeImpact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = Math.round(0.02 * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.round(0.02 * severeImpact.infectionsByRequestedTime);
  impact.dollarsInFlight = Math.round((impact.infectionsByRequestedTime * 0.65) * 1.5 * input.timeToElapse);
  severeImpact.dollarsInFlight = Math.round((severeImpact.infectionsByRequestedTime * 0.65) * 1.5 * input.timeToElapse);
  return { input, impact, severeImpact };
};
export default covid19ImpactEstimator;
