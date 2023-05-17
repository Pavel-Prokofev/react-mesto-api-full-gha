class EmailNotUnique extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmailNotUnique';
    this.statusCode = 409;
  }
}

module.exports = EmailNotUnique;
