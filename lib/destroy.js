const util = require('util');

const { payload, payload2 } = require('./payload');

const destroy = (desc, func) => {

    let report = {};
    Object.keys(desc).map(key => {
        report[key] = desc[key];
    });

    let chaos_report = {
        'no_params': [],
        'single_params': [],
        'multiple_params': []
    }

    let response;

    try {
        response = func();
    } catch (err) {
        response = err.message;
    }
    chaos_report['no_params'].push({payload: "no payload sent", response: response});

    for(let i = 0; i < payload.length; i++) {
        try {
            response = func(payload[i])
        } catch (err) {
            response = err.message;
        }
        chaos_report['single_params'].push({payload: payload[i], response: response})
    }

    for(let i = 0; i < payload2.length; i++) {
        try {
            response = func(...payload2[i])
        } catch (err) {
            response = err.message;
        }
        chaos_report['multiple_params'].push({payload: payload2[i], response: response})
    }

    report["chaos_report"] = chaos_report;
    return util.inspect(report, false, null, true /* enable colors */)
     
}

module.exports = { destroy }


