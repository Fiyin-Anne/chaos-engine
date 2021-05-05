const { createChaos }   = require('./lib/chaosengine');
var { details }    = require('./lib/describe');

var chaosEngine = {};

chaosEngine.createChaos = createChaos;
chaosEngine.describe = details;

module.exports = chaosEngine;

console.log(chaosEngine)