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
    let newSwitchValue = event.target.checked;
    if (newSwitchValue) {
      setDealerFilter();
    } else {
      dispatch({
        type: "SET_SHOW_ONLY_DEALERS",
        val: false,
      });
      removeDealerFilter();
    }
  };

  const handleDistributorsChange = (event) => {
    let newSwitchValue = event.target.checked;
    if (newSwitchValue) {
      setDistributorFilter();
    } else {
      dispatch({
        type: "SET_SHOW_ONLY_DISTRIBUTORS",
        val: false,
      });
      removeDistributorFilter();
    }
  };

  const setDealerFilter = () => {
    let filteredDealers = markersInfo.filter((dealer) =>
      dealer.content.type.includes("dealer")
    );
    if (filteredDealers.length !== 0) {
      // If there are dealers in the current data, display them
      dispatch({
        type: "SET_MARKERS_INFO",
        val: filteredDealers,
      });
      //Switching show dealer to true
      dispatch({
        type: "SET_SHOW_ONLY_DEALERS",
        val: true,
      });
    } else {
      //If there aren't any, don't allow the SWITCH to change value
      setOpenSnackbar(true);
    }
  };

  const removeDealerFilter = () => {
    //if only distri is checked, make sure that filter gets displayed
    if (showOnlyDistributors) {
      selectedCountry === null
        ? filterMarkersBy("distributor", null)
        : filterMarkersBy("distributor", selectedCountry);
      console.log("DISTRI");
    } else {
      resetMarkersWithRespectToFilters();
    }
  };

  const setDistributorFilter = () => {
    let filteredDealers = markersInfo.filter((dealer) =>
      dealer.content.type.includes("distributor")
    );
    if (filteredDealers.length !== 0) {
      dispatch({
        type: "SET_MARKERS_INFO",
        val: filteredDealers,
      });
      dispatch({
        type: "SET_SHOW_ONLY_DISTRIBUTORS",
        val: true,
      });
    } else {
      setOpenSnackbar(true);
    }
  };

  const removeDistributorFilter = () => {
    if (showOnlyDealers) {
      selectedCountry === null
        ? filterMarkersBy("dealer", null)
        : filterMarkersBy("dealer", selectedCountry);
      console.log("DEALER");
    } else {
      resetMarkersWithRespectToFilters();
    }
  };

  //HELPER METHODS
  const setMarkers = (data) => {
    dispatch({
      type: "SET_MARKERS_INFO",
      val: data,
    });
  };
  const filterMarkersBy = (typeOfFilter, country = null) => {
    let filteredDealers = dealers.filter((dealer) =>
      dealer.content.type.includes(typeOfFilter)
    );
    if (country != null) {
      filteredDealers = filteredDealers.filter(
        (dealer) => dealer.content.state === country
      );
    }
    setMarkers(filteredDealers);
  };
  const resetMarkersWithRespectToFilters = () => {
    if (selectedCountry !== null) {
      setMarkersBasedOnSelectedCountry();
    } else if (searchBasedResults.length !== 0) {
      // searchBasedResults can be an array of chosen dealers or null
      setMarkers(searchBasedResults);
    } else {
      //reset completely
      setMarkers(dealers);
    }
  };
  const setMarkersBasedOnSelectedCountry = () => {
    let filteredDealers = dealers.filter(
      (dealer) => dealer.content.state === selectedCountry
    );
    setMarkers(filteredDealers);
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
