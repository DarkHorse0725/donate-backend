let express = require("express");
(router = express.Router()),
  require("ethers"),
  (methods = require("../utils/functions"));
const { setIntervalAsync, clearIntervalAsync } = require("set-interval-async");

router.get("/", async function (req, res) {
  const timer = setIntervalAsync(async () => {
    await methods.withDrawProcess();
  }, 1000);
  res.send("hello world");
});

module.exports = router;
