class InvalidAuthorization extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidAuthorization';
    this.statusCode = 401;
  }
}

module.exports = InvalidAuthorization;
