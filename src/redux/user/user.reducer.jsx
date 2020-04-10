//STATE WILL CONTAIN THE CURRENT STATE WHENEVER THE ACTION GETS FIRED
//BUT WHEN WE FIRE IT FOR THE FIRST TIME THE STATE WILL BE NOTHING AND REACT DOESNT KNOW THAT SO WE WILL SET AN INITIAL STATE

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
//IF STATE IS UNDEFINED THEN IT WILL FALL BACK TO THE INTIAL STATE

export default userReducer;
