export class DomainError {
  public readonly statusCode: number;
  public readonly message: string[] = [];

  constructor(message: string, statusCode: number) {
    this.message.push(message);
    this.statusCode = statusCode;
  }
}
