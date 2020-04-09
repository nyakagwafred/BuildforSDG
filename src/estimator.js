/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
//Input Data
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
}

//Best Case Estimation
let impact = {
  currentlyInfected: '',
  infectionsByRequestedTime: '',
  severeCasesByRequestedTime: '',
  hospitalBedsByRequestedTime: 0,
  casesForICUByRequestedTime: 0,
  casesForVentilatorsByRequestedTime: 0,
  dollarsInFlight: ''
};
  

//Severe Case Estimation
let severeImpact = {
  currentlyInfected: '',
  infectionsByRequestedTime:'',
  severeCasesByRequestedTime: '',
  hospitalBedsByRequestedTime: 0,
  casesForICUByRequestedTime: 0,
  casesForVentilatorsByRequestedTime: 0,
  dollarsInFlight: ''
};


//Impact Estimator Function
const covid19ImpactEstimator = (data) => {

//Challenge 1

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  impact.infectionsByRequestedTime = Math.round(impact.currentlyInfected * (2 ** (data.timeToElapse / 3)));
  severeImpact.infectionsByRequestedTime = Math.round(severeImpact.currentlyInfected * (2 ** (data.timeToElapse / 3)));

//Challenge 2

  impact.severeCasesByRequestedTime = Math.round(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.round(severeImpact.infectionsByRequestedTime * 0.15);

  impact.hospitalBedsByRequestedTime = Math.round(((0.35 * data.totalHospitalBeds) - impact.severeCasesByRequestedTime));
  severeImpact.hospitalBedsByRequestedTime = Math.round(((0.35 * data.totalHospitalBeds) - severeImpact.severeCasesByRequestedTime));

//Challenge 3

  impact.casesForICUByRequestedTime = Math.round(0.05 * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.round(0.05 * severeImpact.infectionsByRequestedTime);

  impact.casesForVentilatorsByRequestedTime = Math.round(0.02 * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.round(0.02 * severeImpact.infectionsByRequestedTime);

  impact.dollarsInFlight = Math.round((impact.infectionsByRequestedTime * 0.65) * 1.5 * data.timeToElapse);
  severeImpact.dollarsInFlight = Math.round((severeImpact.infectionsByRequestedTime * 0.65) * 1.5 * data.timeToElapse);


 
  return { data, impact, severeImpact};
};


export default covid19ImpactEstimator;
