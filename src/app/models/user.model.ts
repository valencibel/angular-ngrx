export class User {
  public id: number;
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
      this.id = Math.random();
  }
}
