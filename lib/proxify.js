//const { err } = require('./destroy');
const { InvalidMethodChain } = require('./errors')

const proxifyChainMethod = (obj) => {

    let handler = {
        get: (target, method) => {
            //console.log(target, method)
            if(!(method in target)) {
                
                throw new InvalidMethodChain(`${method} is not a valid property.`)
            } else {
                return Reflect.get(target, method);
            }
        },
    }

    try {
        return new Proxy(obj, handler) 
    } catch(err) {
        return err.stack
    }
}

// const validator = {
//     set: (target, key, value) => {
//         const allowedProperties = ['name', 'age', 'position'];
//         if (!allowedProperties.includes(key)) {
//             throw new Error(`${key} is not a valid property`)
//         }
        
//         if (key === 'age') {
//         if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
//             throw new TypeError('Age must be a positive number')
//         }
//         }
//         if (key === 'name' || key === 'position') {
//         if (typeof value !== 'string' || value.length <= 0) {
//             throw new TypeError(`${key} must be a valid string`)
//         }
//         }
//         target[key] = value; // save the value
//         return true; // indicate success
// }
//const invalidChainMethod = new Proxy(target, handler)
module.exports = { proxifyChainMethod }
