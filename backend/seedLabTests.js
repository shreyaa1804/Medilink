const mongoose = require('mongoose');
require('dotenv').config();
const Labtest = require('./Models/LabtestModel');

const labTests = [
  {
    name: "Full Body Health Checkup",
    description: "A comprehensive screening of your health including liver, kidney, thyroid, blood sugar, and complete blood count.",
    price: 1999,
    reportTime: "24-48 Hours",
    healthConcerns: ["Full Body Checkup", "Heart", "Kidney", "Liver", "Thyroid"],
    testsIncluded: "CBC, KFT, LFT, Lipid Profile, Thyroid Profile (T3, T4, TSH), Blood Sugar Fasting"
  },
  {
    name: "Diabetes Screening Package",
    description: "Monitor your blood sugar levels and understand your diabetic status with HbA1c and fasting blood sugar tests.",
    price: 699,
    reportTime: "24 Hours",
    healthConcerns: ["Diabetes"],
    testsIncluded: "HbA1c, Blood Sugar Fasting, Blood Sugar Post-Prandial"
  },
  {
    name: "Vitamin Profile",
    description: "Check your Vitamin D and B12 levels to ensure your body is getting essential nutrients for bone and nerve health.",
    price: 1299,
    reportTime: "48 Hours",
    healthConcerns: ["Vitamins", "Full Body Checkup"],
    testsIncluded: "Vitamin D (25-OH), Vitamin B12"
  },
  {
    name: "Thyroid Profile (Total T3, T4, TSH)",
    description: "Assess the function of your thyroid gland with this basic screening package.",
    price: 499,
    reportTime: "24 Hours",
    healthConcerns: ["Thyroid"],
    testsIncluded: "Total T3, Total T4, TSH"
  },
  {
    name: "Lipid Profile (Cholesterol)",
    description: "Measures the levels of specific lipids in the blood to assess the risk of cardiovascular diseases.",
    price: 599,
    reportTime: "24 Hours",
    healthConcerns: ["Heart"],
    testsIncluded: "Total Cholesterol, Triglycerides, HDL, LDL, VLDL"
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/medilink')
  .then(async () => {
    console.log('Connected to MongoDB');
    await Labtest.deleteMany({});
    console.log('Cleared existing lab tests');
    await Labtest.insertMany(labTests);
    console.log('Sample lab tests added successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
