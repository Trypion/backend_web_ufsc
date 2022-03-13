class DomainError extends Error {
  constructor(message, stack) {
    super(message);

    this.name = this.constructor.name;
    this.stack = stack;
  }
}

export default DomainError;
