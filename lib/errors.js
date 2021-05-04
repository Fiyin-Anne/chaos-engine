class ArgumentTypeError extends Error {

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.stackTraceLimit = 3;
      Error.captureStackTrace(this, ArgumentTypeError)
    } else { 
      this.stack = (new Error(message)).stack; 
    }
  }
}

class InvalidMethodChain extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      if (Error.captureStackTrace) {
        Error.stackTraceLimit = 3;
        Error.captureStackTrace(this, InvalidMethodChain)
      } else { 
        this.stack = (new Error(message)).stack; 
      }
    }
}
  
  module.exports = { ArgumentTypeError, InvalidMethodChain };