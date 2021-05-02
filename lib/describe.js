class Describe {

    title(string) {
      if((typeof string) !== 'string') {
        throw new Error('argument must be a string.')
      }
      this.title = string;
      return this;
    }

    accepts(num) {
      if((typeof num) !== 'number') {
        throw new Error('argument must be a number.')
      }
      this.params = num;
      return this;
    }

    oftype(type) {
      if(this.types) {
        throw new Error('types already declared')
      }
      this.type = type;
      return this;
    }
    
    oftypes(...types) {
  
        if(this.type) {
          throw new Error('type already declared')
        }
        if(this.params <= 1) {
          throw new Error('params value is not greater than 1')
        }
        if(types.length === 1 && this.params > 1) {
          types = Array.from({ length: this.params }, () => types).flat();
        }
        
        this.types = types;
        return this;
    }

    returns(type) {
        this.return_value = type;
        return this;
    }
}

const describe = new Describe();

module.exports = { describe }