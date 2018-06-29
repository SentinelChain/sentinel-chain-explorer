var express = require('express');
var router = express.Router();
var request = require('request');

var async = require('async');

router.get('/:bridgeInfo?', (req, res) => {
  async.waterfall([
    function (callback) {
      var url = 'http://monitor.thesentinelchain.com/';
      request.get(url, {json: true}, (err, res, bridgeInfo) => {
        if (err) {
          callback(new Error("ERROR: Cannot retrieve bridge data!!!"));
        } else {
          if (res.statusCode === 200) {
            callback(null, bridgeInfo);
          } else {
            callback(new Error(`ERROR: ${res.statusCode}`));
          }
        }
      });
    },
    function (bridgeInfo) {
      res.render('bridgeInfo', {bridgeInfo: bridgeInfo});
    }
  ]);
});

module.exports = router;
