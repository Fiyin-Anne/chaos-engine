const { proxifyChainMethod } = require('./proxify');
const { ArgumentTypeError } = require('./errors')

class Details {

  constructor() {
    this.description = {}
    this.descriptionAsString = {}
    
    try {
      return proxifyChainMethod(this)
    } catch(err) {
      console.log(err.message)
      return err.stack
  }
  }

  title(name) {
    if((typeof name) !== 'string') {
      throw new ArgumentTypeError('a string.')
    }
    
    this.description.title = name;
    return this;
  }

  accepts(num) {
    if((typeof num) !== 'number') {
      throw new Error('argument must be a number.')
    }
    this.description.params = num;
    return this;
  }

  types(...paramtypes) {

    if(this.description.params < 1) {
      throw new Error('Cannot set type for empty params value.')
    }
    
    if(paramtypes.length === 1 && this.description.params > 1) {
      paramtypes = Array.from({ length: this.description.params }, () => paramtypes).flat();
    } else if(paramtypes.length < this.description.params) {
      throw new Error('Length of types array does not match number of params.')
    }
    this.description.types = paramtypes;
    return this;
  }

  returns(type) {
    this.description.return_value = type;
      return this;
  }

  getDescription() {
      return this.description;
  }

  getDescriptionString() {
      return this.descriptionAsString.description = `This function accepts ${this.params} argument(s) , `;
  }
}

const details = new Details();

module.exports = { details }