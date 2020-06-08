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
`;

const CountrySelect = (props) => {
  const [countryInput, setCountryInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setSelectedCountry(newValue);

    if (newValue !== null) {
      console.log(newValue);
      let newMarkersInfo = dealers.filter(
        (dealer) => dealer.content.state === newValue
      );
      dispatch({
        type: "SET_MARKERS_INFO",
        val: newMarkersInfo,
      });
    } else {
      console.log(newValue);
      dispatch({
        type: "SET_MARKERS_INFO",
        val: dealers,
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
