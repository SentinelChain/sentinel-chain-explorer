var express = require('express');
var router = express.Router();
var async = require('async');
var utils = require("ethereumjs-util");

router.get('/verify', function(req, res, next) {  
  res.render('verifySignature');
});

router.post('/verify', function(req, res, next) {
  var sentinelAddress = req.body.sentinelAddress.toLowerCase().replace("0x", "");
  var message = req.body.message;
  var signature = req.body.signature;
  
  if (!sentinelAddress) {
    res.render('verifySignature', { result: { error: "Invalid Sentinel Address"}, message: message, signature: signature, sentinelAddress: sentinelAddress });
    return;
  }
  if (!message) {
    res.render('verifySignature', { result: { error: "Invalid Message"}, message: message, signature: signature, sentinelAddress: sentinelAddress });
    return;
  }
  if (!signature) {
    res.render('verifySignature', { result: { error: "Invalid Signature"}, message: message, signature: signature, sentinelAddress: sentinelAddress });
    return;
  }
  
  try {
    var msgSha = utils.sha3(message);
    var sigDecoded = utils.fromRpcSig(signature);
    var recoveredPub = utils.ecrecover(msgSha, sigDecoded.v, sigDecoded.r, sigDecoded.s);
    var recoveredAddress = utils.pubToAddress(recoveredPub).toString("hex");

    if (sentinelAddress === recoveredAddress) {
      res.render('verifySignature', { result: { ok: "Signature is valid!"}, message: message, signature: signature, sentinelAddress: sentinelAddress });
      return;
    } else {
      res.render('verifySignature', { result: { error: "Signature is not valid!"}, message: message, signature: signature, sentinelAddress: sentinelAddress });
      return;
    }
  } catch (e) {
    res.render('verifySignature', { result: { error: "Error during signature verification: " + e}, message: message, signature: signature, sentinelAddress: sentinelAddress });
    return;
  }
});

module.exports = router;