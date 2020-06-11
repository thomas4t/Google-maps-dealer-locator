import dealers from "../data/dealers";
const initialState = {
  markersInfo: dealers,
  markerObjects: [],
  searchBasedResults: [],
  displayExpansionPanel: false,
  selectedCountry: null,
  showOnlyDealers: false,
  showOnlyDistributors: false,
};

const rootReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_MARKERS_INFO":
      newState.markersInfo = action.val;
      return newState;
    case "SET_MARKER_OBJECTS":
      newState.markerObjects = action.val;
      return newState;
    case "SET_SEARCH_BASED_RESULTS":
      newState.searchBasedResults = action.val;
      return newState;
    case "SET_DISPLAY_EXPANSION_PANEL":
      newState.displayDealersDetails = action.val;
      return newState;
    case "SET_SELECTED_COUNTRY":
      newState.selectedCountry = action.val;
      return newState;
    case "SET_SHOW_ONLY_DEALERS":
      newState.showOnlyDealers = action.val;
      return newState;
    case "SET_SHOW_ONLY_DISTRIBUTORS":
      newState.showOnlyDistributors = action.val;
      return newState;
    default:
      return newState;
  }
};

export default rootReducer;
