/* eslint-disable import/newline-after-import */
/* eslint-disable spaced-comment */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable linebreak-style */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const XML2JSNOparser = require('xml2json');
const XMLParser = require('express-xml-bodyparser');
const estimator = require('../src/estimator');

// Middleware
app.use(cors());
app.use(bodyParser.json());





// Routes
app.get('/', (req, res, next) => {
  res.send('API succesfully Deployed');
});

app.post('/', (req, res, next) => {
  const data = {
    region: req.body.region,
    name: req.body.region.name,
    avgAge: req.body.region.avgAge,
    avgDailyIncomeInUSD: req.body.region.avgDailyIncomeInUSD,
    avgDailyIncomePopulation: req.body.region.avgDailyIncomePopulation,

    periodType: req.body.periodType,
    timeToElapse: req.body.timeToElapse,
    reportedCases: req.body.reportedCases,
    population: req.body.population,
    totalHospitalBeds: req.body.totalHospitalBeds
  };
  res.send(estimator(data));
});

app.post('/api/v1/on-covid-19', (req, res, next) => {
  const data = {
    region: req.body.region,
    name: req.body.region.name,
    avgAge: req.body.region.avgAge,
    avgDailyIncomeInUSD: req.body.region.avgDailyIncomeInUSD,
    avgDailyIncomePopulation: req.body.region.avgDailyIncomePopulation,

    periodType: req.body.periodType,
    timeToElapse: req.body.timeToElapse,
    reportedCases: req.body.reportedCases,
    population: req.body.population,
    totalHospitalBeds: req.body.totalHospitalBeds
  };
  res.send(estimator(data));
});

app.post('//json', (req, res, next) => {
  const data = {
    region: req.body.region,
    name: req.body.region.name,
    avgAge: req.body.region.avgAge,
    avgDailyIncomeInUSD: req.body.region.avgDailyIncomeInUSD,
    avgDailyIncomePopulation: req.body.region.avgDailyIncomePopulation,

    periodType: req.body.periodType,
    timeToElapse: req.body.timeToElapse,
    reportedCases: req.body.reportedCases,
    population: req.body.population,
    totalHospitalBeds: req.body.totalHospitalBeds
  };
  res.send(estimator(data));
});

//XML to JSON
// app.post('//xml', XMLParser({ trim: false, explicitArray: false }), (req, res, next) => {
//   const data = {
//     region: req.body.root.region,
//     name: req.body.root.region.name,
//     avgAge: req.body.root.region.avgage,
//     avgDailyIncomeInUSD: parseFloat(req.body.root.region.avgdailyincomeinusd),
//     avgDailyIncomePopulation: parseFloat(req.body.root.region.avgdailyincomepopulation),

//     periodType: req.body.root.periodtype,
//     timeToElapse: req.body.root.timetoelapse,
//     reportedCases: req.body.root.reportedcases,
//     population: req.body.root.population,
//     totalHospitalBeds: req.body.root.totalhospitalbeds
//   };
//   res.set('Content-Type', 'application/xml');
//   res.send(XML2JSNOparser.toXml(estimator(data)));
// });

app.post('//xml', (req, res, next) => {
  const data = {
    region: req.body.region,
    name: req.body.region.name,
    avgAge: req.body.region.avgAge,
    avgDailyIncomeInUSD: req.body.region.avgDailyIncomeInUSD,
    avgDailyIncomePopulation: req.body.region.avgDailyIncomePopulation,

    periodType: req.body.periodType,
    timeToElapse: req.body.timeToElapse,
    reportedCases: req.body.reportedCases,
    population: req.body.population,
    totalHospitalBeds: req.body.totalHospitalBeds
  };
  res.set('Content-Type', 'application/xml');
  res.send(XML2JSNOparser.toXml(estimator(data)));
});



app.get('/', (req, res, next) => {
  res.send('API succesfully Deployed');  
});

app.get('//logs', (req, res, next) => {
  res.send('Log Files');
});
   

//Config
const port = process.env.PORT || 3000;
app.listen(port);

//Connect to DB
// mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('DB Connected!'))
//   .catch((err) => { console.log(Error, err.message); });
  


