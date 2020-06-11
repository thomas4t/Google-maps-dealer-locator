import React, { useState } from "react";
import styled from "styled-components";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { useSelector, useDispatch } from "react-redux";

import dealers from "../../data/dealers";

const StyledDiv = styled.div`
  margin: 0 2% 0 1.5%;
`;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TypeFilter = () => {
  //states
  const showOnlyDealers = useSelector((state) => state.showOnlyDealers);
  const showOnlyDistributors = useSelector(
    (state) => state.showOnlyDistributors
  );
  const markersInfo = useSelector((state) => state.markersInfo);
  const selectedCountry = useSelector((state) => state.selectedCountry);
  const searchBasedResults = useSelector((state) => state.searchBasedResults);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleDealersChange = (event) => {
    if (showOnlyDistributors) {
      // if ONLY DISTRIB. is checked, disable its filter
      dispatch({
        type: "SET_SHOW_ONLY_DISTRIBUTORS",
        val: false,
      });
    }
    let newSwitchValue = event.target.checked;
    //SWITCH value ... true/false
    dispatch({
      type: "SET_SHOW_ONLY_DEALERS",
      val: newSwitchValue,
    });
    determineDealersFilters(newSwitchValue);
  };

  const handleDistributorsChange = (event) => {
    if (showOnlyDealers) {
      // if ONLY DEALERS is checked, disable its filter
      dispatch({
        type: "SET_SHOW_ONLY_DEALERS",
        val: false,
      });
    }
    let newSwitchValue = event.target.checked;
    //SWITCH value ... true/false
    dispatch({
      type: "SET_SHOW_ONLY_DISTRIBUTORS",
      val: newSwitchValue,
    });
    //Handles what markers should be displayed
    determineDistriFilters(newSwitchValue);
  };

  const determineDealersFilters = (newSwitchValue) => {
    //If new value is true = DISPLAY ONLY DEALERS
    if (newSwitchValue) {
      let filteredDealers = markersInfo.filter((dealer) =>
        dealer.content.type.includes("dealer")
      );
      if (filteredDealers.length !== 0) {
        // If there are dealers in the current data, display them
        dispatch({
          type: "SET_MARKERS_INFO",
          val: filteredDealers,
        });
      } else {
        //If there aren't any, don't allow the SWITCH to change value
        //Add some popup that says cant change, cause there arent any
        dispatch({
          type: "SET_SHOW_ONLY_DEALERS",
          val: !newSwitchValue,
        });
        console.log("NO DEALERS FOUND");
        setOpenSnackbar(true);
      }
    } else {
      //IF new value is false
      //DISABLING only dealer filter
      if (selectedCountry !== null) {
        // if country filter is selected => Setting markers BACK to be country filtered
        let filteredDealers = dealers.filter(
          (dealer) => dealer.content.state === selectedCountry
        );
        dispatch({
          type: "SET_MARKERS_INFO",
          val: filteredDealers,
        });
      } else if (searchBasedResults.length !== 0) {
        // searchBasedResults can be an array of chosen dealers or null
        // if a search option is selected => Setting markers TO BE search filtered again
        dispatch({
          type: "SET_MARKERS_INFO",
          val: searchBasedResults,
        });
      } else {
        // if no filter is selected
        //set markers to their initial state
        dispatch({
          type: "SET_MARKERS_INFO",
          val: dealers,
        });
      }
    }
  };

  const determineDistriFilters = (newSwitchValue) => {
    //If new value is true = DISPLAY ONLY DISTRIBUTORS
    if (newSwitchValue) {
      let filteredDealers = markersInfo.filter((dealer) =>
        dealer.content.type.includes("distributor")
      );
      if (filteredDealers.length !== 0) {
        // If there are distributors of the current markers
        // Display them
        dispatch({
          type: "SET_MARKERS_INFO",
          val: filteredDealers,
        });
      } else {
        //If there aren't any, don't allow the SWITCH to change value
        //Add some popup that says cant change, cause there arent any
        dispatch({
          type: "SET_SHOW_ONLY_DISTRIBUTORS",
          val: !newSwitchValue,
        });
        console.log("NO DISTRIBUTORS FOUND");
        setOpenSnackbar(true);
      }
    } else {
      //IF new value is false
      //DISABLING only distributors filter
      if (selectedCountry !== null) {
        // if selected country is selected => SETTING MARKERS TO BE country filtered
        let filteredDealers = dealers.filter(
          (dealer) => dealer.content.state === selectedCountry
        );
        dispatch({
          type: "SET_MARKERS_INFO",
          val: filteredDealers,
        });
      } else if (searchBasedResults.length !== 0) {
        // searchBasedResults can be an array of chosen dealers or null

        // if a search option is selected => SET MARKERS TO BE search filtered
        console.log(searchBasedResults);
        dispatch({
          type: "SET_MARKERS_INFO",
          val: searchBasedResults,
        });
      } else {
        //set markers to their initial state
        dispatch({
          type: "SET_MARKERS_INFO",
          val: dealers,
        });
      }
      console.log("DISABLE ONLY DISTRI FILTER");
    }
  };

  return (
    <StyledDiv>
      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showOnlyDealers}
                onChange={handleDealersChange}
                color="primary"
                name="dealers"
              />
            }
            label="Only dealers"
          />
          <FormControlLabel
            control={
              <Switch
                checked={showOnlyDistributors}
                onChange={handleDistributorsChange}
                name="distributors"
              />
            }
            label="Only distributors"
          />
        </FormGroup>
      </FormControl>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          No results found due to the current filters.
        </Alert>
      </Snackbar>
    </StyledDiv>
  );
};
export default TypeFilter;
