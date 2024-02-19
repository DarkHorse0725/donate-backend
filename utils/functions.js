// import ethers.js
const ethers = require("ethers");
// import web3
const web3 = require("web3");
// import axios
var axios = require("axios");
// import contant file
var constants = require("./constant");
//connect to provider i.e ganache
let provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545"
);

// Load deployed contract

exports.withDrawProcess = async (key) => {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    constants.CONTRACT_ADDRESS,
    constants.donateABI,
    wallet
  );
  const challengeList = await contract.getList();

  for (let i = 0; i < challengeList.length; i++) {
    contract.expiredDate(challengeList[i]).then(async (res) => {
      const currentTime = new Date();
      Math.floor(currentTime.getTime() / 1000);
      if (res <= Math.floor(currentTime.getTime() / 1000)) {
        const withDrawedToOrgan = await contract.withdrawedToOrgan(
          challengeList[i]
        );

        const withDrawedToAdmin = await contract.withdrawedToAdmin(
          challengeList[i]
        );
        if (withDrawedToOrgan == false) {
          await contract.withDrawToOrganization(challengeList[i]);
        }
        if (withDrawedToAdmin == false) {
          await contract.withDrawToAdminAddress(challengeList[i]);
        }
      }
    });
  }
};
