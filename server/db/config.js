const pg = require('pg');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('hobbyist', process.env.DB_USER, process.env.DP_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});