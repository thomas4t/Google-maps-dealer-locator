import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setInitialSearchDatabase,
  getSearchResults,
} from "./functions/searchFunctions";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

import dealers from "../../data/dealers";

const PlaceSearch = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedSearchOption, setSelectedSearchOption] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setInitialSearchDatabase(dealers);
  }, []);

  const handleOnChange = (event, newValue) => {
    //setting search box value
    // can be either an array ["FOUND TERM", [dealers]] or null
    setSelectedSearchOption(newValue);

    // LOGIC BASED ON
    // newValue
    if (newValue !== null) {
      //disable dealer/distri filters
      dispatch({
        type: "SET_SHOW_ONLY_DEALERS",
        val: false,
      });
      dispatch({
        type: "SET_SHOW_ONLY_DISTRIBUTORS",
        val: false,
      });
      //reseting country filter
      dispatch({
        type: "SET_SELECTED_COUNTRY",
        val: null,
      });
      //setting chosen dealers
      dispatch({
        type: "SET_MARKERS_INFO",
        val: newValue[1],
      });
      //DEALERS DETAILS WILL BE RENDERED IN THE FOOTER
      dispatch({
        type: "SET_DISPLAY_EXPANSION_PANEL",
        val: true,
      });
      //setting searchBasedResults in Redux
      dispatch({
        type: "SET_SEARCH_BASED_RESULTS",
        val: newValue[1],
      });
    } else {
      // If newValue is null
      //reset dealers
      dispatch({
        type: "SET_MARKERS_INFO",
        val: dealers,
      });
      //REMOVING DEALERS DETAILS FOOTER
      dispatch({
        type: "SET_DISPLAY_EXPANSION_PANEL",
        val: false,
      });
      //setting searchBasedResults in Redux
      dispatch({
        type: "SET_SEARCH_BASED_RESULTS",
        val: [],
      });
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setSearchInput(newInputValue);
    let searchResults = getSearchResults(newInputValue);
    setSearchResults(searchResults);
  };

  const placeFilterOptions = createFilterOptions({
    limit: 30,
  });

  return (
    <Autocomplete
      id="search box"
      value={selectedSearchOption}
      filterOptions={placeFilterOptions}
      freeSolo={true}
      selectOnFocus
      //groupBy={(option) => option.firstLetter}   TODO GROUPING
      onChange={(event, newValue) => handleOnChange(event, newValue)}
      inputValue={searchInput}
      onInputChange={(event, newInputValue) =>
        handleInputChange(event, newInputValue)
      }
      options={searchResults}
      getOptionLabel={(option) => option[0]}
      style={{ width: "35%", minWidth: "175px" }}
      renderInput={(params) => (
        <TextField {...params} label="Find dealer worldwide" variant="filled" />
      )}
    />
  );
};
export default PlaceSearch;
