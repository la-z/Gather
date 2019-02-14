const express = require('express');

const PORT = process.env.PORT || 1128;
const { requestHandler } = require('./helpers/request-handler');

const app = express();

app.get('/', (req, res, next) => {
  requestHandler(req, res, next);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
