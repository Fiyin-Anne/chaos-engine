const util = require('util');
const { ArgumentTypeError, InvalidMethodChain } = require('./errors')
const { payload, payload2 } = require('./payload');
const { generateArgs } = require('./generateMultipleParams');
const { proxifyChainMethod } = require('./proxify')

class ChaosEngine {

    constructor() {
        this.report = {};
        this.err = {}

        return proxifyChainMethod(this)
    }
    
    destroy(fn, description) {
        //fn must be a function
        //description must be an object
        try {

            if(description) {
                this.report.description = description;
            }
            this.report.chaos_report = {
                'no_params': [],
                'single_params': [],
                'multiple_params': [],
            }

            let response;
    
            try {
                response = fn();
            } catch (err) {
                response = err.message;
            }
            this.report.chaos_report['no_params'].push({payload: "no payload sent", response: response});
    
            let payloadtest = this.arr ? this.arr : payload;
            let payloadtest2;

            payloadtest.forEach((arg) => {
                try {
                    response = fn(arg)
                } catch (err) {
                    response = err.message;
                }
                this.report.chaos_report['single_params'].push({payload: arg, response: response})
            })

            if (!this.arr || this.multiple_params) {
                //if no arr supplied or arr supplied and multiple params requested
                payloadtest2 = this.arr2 ? this.arr2 : payload2;
            
                payloadtest2.forEach((arg) => {
                    try {
                        response = fn(arg)
                    } catch (err) {
                        response = err.message;
                    }
                    this.report.chaos_report['multiple_params'].push({payload: arg, response: response})
                })
            }

            return util.inspect(this.report, false, null, true /* enable colors */)
        } catch(err) {
            this.err.status = 'Error';
            this.err.message = err.message;

            return this.err;
        }
    }
    
    supply(arr=[], multiple_params=false, repeat=0) {
        if(arguments.length < 3) {
            throw new ArgumentTypeError('Chaos method must contain 3 arguments. Must follow the order: array(array), multiple_params(boolean) and repeat(number).', );
        }
        if (!arr || arr.length === 0 || arr.length < 10 || !Array.isArray(arr)) {
            throw new ArgumentTypeError('argument must be an array and must contain at least 10 values.')
        } 
        if (!multiple_params && repeat>0) {
            throw new ArgumentTypeError('multiple params is set to false but repeat is greater than 1.')
        }
        if (multiple_params && repeat < 5) {
            throw new ArgumentTypeError('multiple parameters cannot be created if repeat is less than 5.')
        } 

        
        this.arr = arr;
        this.arr2 = generateArgs(arr, repeat);
        this.multiple_params = multiple_params;
        return this;
    
    }
}


module.exports = new ChaosEngine();