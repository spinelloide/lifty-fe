export type RegisteredUser = {
  token: string;
  user: {
    id: number;
    username: string;
    password: string;
  };
};
