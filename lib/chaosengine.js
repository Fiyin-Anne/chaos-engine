const util = require('util');
const { payload, payload2 } = require('./payload');
const { generateArgs } = require('./generateMultipleParams');
const { proxifyDestroyMethod } = require('./proxify')

class ChaosEngine {

    constructor() {
        this.report = {};
        this.arr = [];
        this.arr2 = [];
        this.total = 0;
        return proxifyDestroyMethod(this)
    }

    destroy(fn, description={}, limit=null) {
        
        try {
            this.fn = fn;
            this.arr = this.arr.length > 0? this.arr : payload;
            this.arr2 = this.arr2.length > 0? this.arr2 : payload2;
            limit= !limit ? this.arr.length : limit;
            this.limit = this.arr.length;

            if(description) {
                this.description = description;
                this.report['description'] = description;
            }
            this.report['chaos_report'] = {
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
            this.report['chaos_report']['no_params'].push({payload: "no payload sent", response: response});
            this.total += 1;

            let args, args2;

            if(limit) {
                args = this.arr.splice(0, limit);
                args2 = this.arr2.splice(0, limit); 
            }

            args.forEach((arg) => {
                try {
                    response = fn(arg)
                } catch (err) {
                    response = err.message;
                }
                this.report['chaos_report']['single_params'].push({payload: arg, response: response});
                this.total += 1;
            })

            args2.forEach((arg) => {
                try {
                    response = fn(...arg);
                } catch (err) {
                    response = err.message;
                }
                this.report['chaos_report']['multiple_params'].push({payload: arg, response: response});
                this.total += 1;
            })

            this.report['total'] = this.total;
            
            return util.inspect(this.report, false, null, true /* enable colors */)
            
        } catch(err) {
            return err;
        }
    }
    
    supply(arr) {
        this.arr = arr;
        this.arr2 = generateArgs(arr, arr.length);
        return this
    }

}

let creatChaos = new ChaosEngine();
module.exports = { creatChaos }