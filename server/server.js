require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 1128;
const { requestHandler } = require('./helpers/request-handler');
const app = express();

app.use(express.static(path.join(__dirname, '../react-client/dist')));
app.get('/insertSomethingHere', (req, res, next) => {
  requestHandler(req, res, next);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = app;
