export class User {
  id: number;
  email: string;
  username: string;
  confirmed: boolean;
  constructor(userRecord: { id: number; email: string; username: string; confirmed: boolean }) {
    const { id, email, username, confirmed } = userRecord;
    this.id = id;
    this.email = email;
    this.username = username;
    this.confirmed = confirmed;
  }
}

const buildDummyUser = (id: number) => ({
  id: id,
  email: "",
  username: "",
  confirmed: false,
});

export const EMPTY_USER: Readonly<User> = new User(buildDummyUser(0));
