const { creatChaos }   = require('./lib/chaosengine');
var { details }    = require('./lib/describe');

const { destroy, supply  } = creatChaos;
var chaosEngine = {};

chaosEngine.destroy = destroy;
chaosEngine.supply = supply;
chaosEngine.describe = details;

module.exports = chaosEngine;