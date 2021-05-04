const Chaos   = require('./lib/chaosengine');
var { describe }    = require('./lib/describe');

const { destroy, supply  } = Chaos;
var chaosEngine = {};

chaosEngine.destroy = destroy;
chaosEngine.supply = supply;
chaosEngine.describe = describe;

module.exports = chaosEngine;