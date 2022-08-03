export interface IUserState {
  users: IUsers;
}
export interface IUsers {
  usersData: IUsersData[];
}
export interface IUsersData {
  userName: string | undefined;
  userId: number | undefined;
}
const userIntitialState: IUserState = {
  users: {
    usersData: [],
  },
};

export default userIntitialState;
