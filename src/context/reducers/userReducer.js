import { ADD_USER, CHANGE_USER_NAME, LOGOUT_USER } from "../actions/actions";

const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        users: {
          ...state.users,
          usersData: [
            ...state.users.usersData,
            {
              userName: action.playload.userName,
              userId: action.playload.userId,
              //state.users.usersData.length > 0
              //  ? state.users.usersData[state.users.usersData.length - 1]
              //      .userId + 1
              //  : 1,
            },
          ],
        },
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        users: {
          ...state.users,
          usersData: [],
        },
      };
    }
    case CHANGE_USER_NAME: {
      return {
        ...state,
        users: {
          ...state.users,
          usersData: [
            ...state.users.usersData.map((user) => {
              if (user.userId === action.playload.userId) {
                return { ...user, userName: action.playload.userName };
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
