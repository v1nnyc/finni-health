import CustomError from "./custom-error";

export default class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "bro u r NOT authorized, dont even think abotu it",
      },
    ];
  }
}
