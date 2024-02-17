const express = require('express')
const jobs = express.Router();

const { getAllApplications, getApplicationById, createApplication, updateApplication, deleteApplication, } = require('../queries/jobApplicationsQueries')

jobs.get('/', async(req,res) => {})
jobs.get('/:id', async(req,res) => {})
jobs.post('/', async(req,res) => {})
jobs.delete('/:id', async(req,res) => {})
jobs.put('/:id', async (req,res) => {})
