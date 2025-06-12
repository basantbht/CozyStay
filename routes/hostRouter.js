// Core Module
const path = require('path');

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require('../utils/pathUtil');
const { title } = require('process');

hostRouter.get("/add-home", (req, res, next) => {
     res.render('addHome', {pageTitle: 'Add to home', currentPage: 'addHome'});
});

const registeredHome = [];

hostRouter.post("/add-home", (req, res, next) => {
     console.log('Home registration successful for:', req.body, req.body.houseName);
     registeredHome.push(req.body);
     res.render('homeAdded', {pageTitle: 'Home added', currentPage: 'homeAdded'});
});

exports.hostRouter = hostRouter;
exports.registeredHome = registeredHome;
