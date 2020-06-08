import dealers from "../data/dealers";
const initialState = {
  markersInfo: dealers,
};

const rootReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_MARKERS_INFO":
      newState.markersInfo = action.val;
      return newState;
    default:
      return newState;
  }
};

export default rootReducer;
