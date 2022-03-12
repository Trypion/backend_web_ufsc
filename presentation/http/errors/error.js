export default class extends Error {
  /**
   * @param  {String} message [description]
   * @param  {String} stack   [description]
   */
  constructor(message, stack) {
    super(message);

    this.name = this.constructor.name;
    this.stack = stack;
  }
}
