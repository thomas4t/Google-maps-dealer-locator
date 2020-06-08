import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
    setSelectedSearchOption(newValue);
    //if term is singular
    // const content = renderToString(<InfoWindowComp dealerInfo={dealer} />);
    //   infowindow.setContent(content);
    //   infowindow.open(map, marker);
    //   map.panTo(marker.getPosition());

    if (newValue !== null) {
      console.log(newValue);
      //   dispatch({
      //     type: "SET_SELECTED_DEALER",
      //     val: newValue.dealer,
      //   });
    } else {
      console.log(newValue);
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
      options={searchResults} // CHANGE
      getOptionLabel={(option) => option.foundExpression}
      style={{ width: "35%" }}
      renderInput={(params) => (
        <TextField {...params} label="Find dealer" variant="filled" />
      )}
    />
  );
};
export default PlaceSearch;
