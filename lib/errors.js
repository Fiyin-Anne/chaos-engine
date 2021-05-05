class ArgumentError extends Error {

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.stackTraceLimit = 3;
      Error.captureStackTrace(this, ArgumentError)
    } else { 
      this.stack = (new Error(message)).stack; 
    }
  }
}

class InvalidMethod extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      if (Error.captureStackTrace) {
        Error.stackTraceLimit = 3;
        Error.captureStackTrace(this, InvalidMethod)
      } else { 
        this.stack = (new Error(message)).stack; 
      }
    }
}
  
  module.exports = { ArgumentError, InvalidMethod };