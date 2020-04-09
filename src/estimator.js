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
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
}

//Best case estimation
let impact = {
    currentlyInfected: '',
};
  

//Severe Case Estimation
let severeImpact = {
    currentlyInfected: '',
};


//Impact Estimator Function
const covid19ImpactEstimator = (data) => {

 impact.currentlyInfected = data.reportedCases * 10;
 severeImpact.currentlyInfected = data.reportedCases * 50;


 
 return { data, impact, severeImpact};
};







console.log(covid19ImpactEstimator(data));


//export default covid19ImpactEstimator;
