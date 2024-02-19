const methods = require('./utils/functions')
const { setIntervalAsync } = require("set-interval-async");

const dotenv = require("dotenv");
dotenv.config();

const timer = setIntervalAsync(async () => {
  await methods.withDrawProcess();
}, 300000);
