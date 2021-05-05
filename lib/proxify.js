const { InvalidMethod, ArgumentError } = require('./errors')

const proxifyDestroyMethod = (obj) => {
    try {
    let handler = {
        get: (target, method) => {
            //console.log(target, method)
            if(!(method in target)) {
                
                throw new InvalidMethod(`${method} is not a valid property.`)
            } else {
                return Reflect.get(target, method);
            }
        },

        set: (target, key, value) => {
            const allowedProperties = [ 'description', 'limit', 'arr', 'arr2', 'fn', 'report', 'total'];
            if (!allowedProperties.includes(key)) {
                throw new Error(`${key} is not a valid property`)
            }
            
            if (key === 'fn') {
                if (typeof value !== 'function') {
                    throw new TypeError(`${key} must be a function`)
                }
            }

            if (key === 'description') {
                if ((typeof value !== 'object' && typeof value !== 'string') || Array.isArray(value)) {
                    throw new TypeError(`${key} must be an object or a string.`)
                }
            }

            if (key === 'arr') {
                if (!Array.isArray(value)) {
                    throw new TypeError(`Array must be a valid array`)
                }

                if (value.length === 0 || value.length < 10 || value.length > 100000) {
                    throw new ArgumentError('Array must contain between 10 to 100,000 values.')
                }

            }

            if (key === 'limit') {
                if (!Number.isInteger(value)) {
                    throw new TypeError(`${key} must be an integer value`)
                }

                if (value.length === 0 || value < 10 || value > 100000) {
                    throw new ArgumentError(`${key} must be between 10 to 100,000.`)
                }

                if (value > obj.arr.length) {
                    throw new ArgumentError(`${key} cannot be greater than length of array.`)
                }
            }

            target[key] = value; // save the value
            return true; // indicate success
        }
    }
        return new Proxy(obj, handler) 
    } catch(err) {
        return err.stack
    }
}

const proxifyDetailMethod = (obj) => {
    try {
    let handler = {
        get: (target, method) => {
            //console.log(target, method)
            if(!(method in target)) {
                
                throw new InvalidMethod(`${method} is not a valid property.`)
            } else {
                return Reflect.get(target, method);
            }
        },

        set: (target, key, value) => {
            const allowedProperties = [ 'title', 'params', 'types', 'return_value'];
            if (!allowedProperties.includes(key)) {
                throw new Error(`${key} is not a valid property`)
            }

            if(key === 'title') {
                if (typeof value !== 'string') {
                    throw new TypeError(`${key} must be a string.`)
                }

                if (value.length > 25 || value.length < 4) {
                    throw new TypeError(`${key} must be between 4 to 25 characters.`)
                }
            }

            if(key === 'params') {
                if (!Number.isInteger(value)) {
                    throw new TypeError(`${key} must be an integer.`)
                }

                if (value > 20) {
                    throw new TypeError(`${key} must not be more than 20.`)
                }
            }

            if(key === 'types') {
                if (!Array.isArray(value)) {
                    throw new TypeError(`${key} must be an array.`)
                }
                
                const datatypes = ['string', 'number', 'undefined', 'null', 'boolean', 'symbol', 'bigint'];
                let check = [];
                check = value.map(x => datatypes.includes(x));
                if(check.every(val => val === false)) {
                    throw new ArgumentError(`value(s) in ${key} must be 'string', 'number', 'undefined', 'null', 'boolean', 'symbol', or 'bigint'.`)
                }

                if(obj.description.params < 1 && value.length > 1 && value.toString().toLowerCase() !== 'any') {
                    throw new Error('Cannot set type for empty params value.')
                }

                if(value.length < obj.description.params) {
                    throw new Error(`Length of ${key} does not match number of params.`)
                }
            }


            target[key] = value; // save the value
            return true; // indicate success
        }
    }
        return new Proxy(obj, handler) 
    } catch(err) {
        return err.stack
    }
}


module.exports = { proxifyDestroyMethod, proxifyDetailMethod }
