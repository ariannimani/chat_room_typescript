import { ACTIONS, IActionWithPayload } from "../actions/actions";
import { IUserState } from "../initialstates/userInitialState";

export interface IActionsUsers {
  userName: string;
  userId: number;
}
const userReducer = (
  state: IUserState,
  action: IActionWithPayload<IActionsUsers>
): IUserState => {
  switch (action.type) {
    case ACTIONS.ADD_USER: {
      return {
        ...state,
        users: {
          ...state.users,
          usersData: [
            ...state.users.usersData,
            {
              userName: action.payload.userName,
              userId: action.payload.userId,
              //state.users.usersData.length > 0
              //  ? state.users.usersData[state.users.usersData.length - 1]
              //      .userId + 1
              //  : 1,
            },
          ],
        },
      };
    }
    case ACTIONS.LOGOUT_USER: {
      return {
        ...state,
        users: {
          ...state.users,
          usersData: [],
        },
      };
    }
    case ACTIONS.CHANGE_USER_NAME: {
      return {
        ...state,
        users: {
          ...state.users,
          usersData: [
            ...state.users.usersData.map((user) => {
              if (user.userId === action.payload.userId) {
                return { ...user, userName: action.payload.userName };
              }
              return user;
            }),
          ],
        },
      };
    }
    default:
      return state;
  }
};

export default userReducer;
