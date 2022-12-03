const data = artifacts.require("./dataCon.sol");

module.exports = function(deployer) {
  deployer.deploy(data);
};