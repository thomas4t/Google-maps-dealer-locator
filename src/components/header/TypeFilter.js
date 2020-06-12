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
  const [isTypeFilterOn, setIsTypeFilterOn] = useState(false);
  const dispatch = useDispatch();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleDealersChange = (event) => {
    let newSwitchValue = event.target.checked;
    if (showOnlyDistributors) {
      // if ONLY DISTRIB. is checked, disable its filter
      dispatch({
        type: "SET_SHOW_ONLY_DISTRIBUTORS",
        val: false,
      });
    } else {
    }
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
        setOpenSnackbar(true);
      }
    } else {
      restoreUnfilteredMarkers();
    }
  };

  const determineDistriFilters = (newSwitchValue) => {
    //If new value is true = DISPLAY ONLY DISTRIBUTORS
    if (newSwitchValue) {
      let filteredDealers = markersInfo.filter((dealer) =>
        dealer.content.type.includes("distributor")
      );
      if (filteredDealers.length !== 0) {
        // If there are distributors of the current markers, display them
        dispatch({
          type: "SET_MARKERS_INFO",
          val: filteredDealers,
        });
      } else {
        //If there aren't any, don't allow the SWITCH to change value
        dispatch({
          type: "SET_SHOW_ONLY_DISTRIBUTORS",
          val: !newSwitchValue,
        });
        setOpenSnackbar(true); //WARNING "POPUP"
      }
    } else {
      restoreUnfilteredMarkers();
    }
  };

  const restoreUnfilteredMarkers = () => {
    if (selectedCountry !== null) {
      setMarkersBasedOnSelectedCountry();
    } else if (searchBasedResults.length !== 0) {
      // searchBasedResults can be an array of chosen dealers or null
      setMarkersBasedOnSearch();
    } else {
      //set markers to their initial state
      dispatch({
        type: "SET_MARKERS_INFO",
        val: dealers,
      });
    }
  };

  const setMarkersBasedOnSelectedCountry = () => {
    let filteredDealers = dealers.filter(
      (dealer) => dealer.content.state === selectedCountry
    );
    dispatch({
      type: "SET_MARKERS_INFO",
      val: filteredDealers,
    });
  };
  const setMarkersBasedOnSearch = () => {
    dispatch({
      type: "SET_MARKERS_INFO",
      val: searchBasedResults,
    });
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
