import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import styled from "styled-components";

import dealers from "../../data/dealers";
import states from "../../data/states";

const StyledAutocomplete = styled(Autocomplete)`
  margin: 0 0.5% 0 2%;
  min-width: 100px;
`;

const CountrySelect = (props) => {
  const [countryInput, setCountryInput] = useState("");
  const selectedCountry = useSelector((state) => state.selectedCountry);

  const dispatch = useDispatch();

  const disableTypeFilter = () => {
    dispatch({
      type: "SET_SHOW_ONLY_DEALERS",
      val: false,
    });
    dispatch({
      type: "SET_SHOW_ONLY_DISTRIBUTORS",
      val: false,
    });
  };

  const handleChange = (event, newValue) => {
    dispatch({
      type: "SET_SELECTED_COUNTRY",
      val: newValue,
    });

    if (newValue !== null) {
      let newMarkersInfo = dealers.filter(
        (dealer) => dealer.content.state === newValue
      );
      //disable dealer/distri filters
      disableTypeFilter();
      //SETTING NEW MARKERS TO BE SHOWN ON MAP
      dispatch({
        type: "SET_MARKERS_INFO",
        val: newMarkersInfo,
      });
      //DISPLAYING EXPANSION PANEL IN FOOTER
      dispatch({
        type: "SET_DISPLAY_EXPANSION_PANEL",
        val: true,
      });
    } else {
      //disable dealer/distri filters
      disableTypeFilter();
      //RESETING MARKERS TO INITIAL DATABASE
      dispatch({
        type: "SET_MARKERS_INFO",
        val: dealers,
      });
      //REMOVING EXPANSION PANEL IN FOOTER
      dispatch({
        type: "SET_DISPLAY_EXPANSION_PANEL",
        val: false,
      });
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setCountryInput(newInputValue);
  };

  const filterOptions = createFilterOptions({
    limit: 80,
  });

  return (
    <StyledAutocomplete
      id="state box"
      filterOptions={filterOptions}
      selectOnFocus
      value={selectedCountry}
      onChange={(event, newValue) => handleChange(event, newValue)}
      inputValue={countryInput}
      onInputChange={(event, newInputValue) =>
        handleInputChange(event, newInputValue)
      }
      options={states}
      getOptionLabel={(option) => option}
      style={{ width: "15%" }}
      renderInput={(params) => (
        <TextField {...params} label="Country" variant="filled" />
      )}
    />
  );
};
export default CountrySelect;
