var web3 = require('web3');
var net = require('net');

var config = function () {

  this.logFormat = "combined";
  this.ipcPath = "$IPC_PATH";
  this.provider = new web3.providers.IpcProvider(this.ipcPath, net);

  this.bootstrapUrl = "$BOOTSTRAP_URL";

  this.names = {}
}

module.exports = config;