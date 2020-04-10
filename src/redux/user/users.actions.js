import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER, //SAME TYPE THAT IS IN THE USERREDUCER
  payload: user,
});
