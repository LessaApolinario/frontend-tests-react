export class EmailOrPasswordInvalidError extends Error {
  constructor() {
    super("Email ou senha inválidos");
  }
}
