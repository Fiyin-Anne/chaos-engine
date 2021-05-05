const { proxifyDetailMethod } = require('./proxify');

class Details {

  constructor() {
    this.description = {}
    this.descriptionAsString = {}
    
    return proxifyDetailMethod(this);
  }

  title(name='') {
    this.title = name;
    this.description.title = name;
    return this;
  }

  accepts(args=0) {
    this.params = args;
    this.description.params = args;
    return this;
  }

  types(...types) {
    
    if(types.length === 1 && this.description.params > 1) {
      types = Array.from({length:this.description.params }).map(x => types.toString());
    }
    this.types = types;
    this.description.types = types;
    return this;
  }

  returns(type) {
    this.return_value = type;
    this.description.return_value = type;
      return this;
  }

  getDescription() {
      return this.description;
  }

  getDescriptionString() {
    let type_array = this.description.types;
      return this.descriptionAsString.description = `This function ${this.description.title}, accepts ${this.description.params} argument(s) (${type_array.join(', ')}), and returns a/an ${this.description.return_value}.`;
  }
}

const details = new Details();

module.exports = { details }