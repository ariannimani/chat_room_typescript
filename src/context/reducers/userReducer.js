import { ADD_USER } from "../actions/actions";

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
              userName: action.playload,
              userId:
                state.users.usersData.length > 0
                  ? state.users.usersData[state.users.usersData.length - 1]
                      .userId + 1
                  : 1,
            },
          ],
        },
      };
    }
    default:
      return state;
  }
};

export default userReducer;
