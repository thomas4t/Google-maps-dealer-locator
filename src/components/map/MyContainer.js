import React, { useEffect, useState } from "react";
import { GoogleApiWrapper, Map } from "google-maps-react";
import StyledPaper from "./StyledPaper";
import Header from "../header/Header";
import DealersDetails from "../footer/DealersDetails";
import MarkerClusterer from "@google/markerclusterer";
import {
  containerSizing,
  containerStyle,
  mapDivStyle,
} from "../../styles/mapContainerStyles";
import getMarkers from "./functions/getMarkers";
import getInitialMarkers from "./functions/getInitialMarkers";
import setCurrentLocation from "./functions/setCurrentLocation";

import useDidMount from "../../custom-hooks/useDidMount";

import { useSelector, useDispatch } from "react-redux";

let mapInstance = null;

export function MyContainer(props) {
  //states and such
  const [markerCluster, setMarkerCluster] = useState(null);
  const markersInfo = useSelector((state) => state.markersInfo);
  const displayExpansionPanel = useSelector(
    (state) => state.displayDealersDetails
  );

  const dispatch = useDispatch();
  //declaring and initializing 'globally' used objects
  //let mapInstance = null;
  const google = window.google;
  const infowindow = new props.google.maps.InfoWindow({
    content: "",
  });

  //defining custom hook which starts updating after first render
  //updating markers
  const didMount = useDidMount();
  const updateMarkers = () => {
    if (didMount) {
      if (markerCluster) {
        markerCluster.clearMarkers();
      }
      let markers = getMarkers(mapInstance, google, infowindow, markersInfo);
      //Update state with marker objects
      dispatch({
        type: "SET_MARKER_OBJECTS",
        val: markers,
      });
      //Assign markerCluster new markers
      markerCluster.addMarkers(markers, true);
    }
  };
  useEffect(updateMarkers, [markersInfo]);

  const onLoad = (mapProps, map) => {
    mapInstance = map;
    //placing mapInstance into redux
    dispatch({
      type: "SET_MY_MAP",
      val: map,
    });

    //getting markers
    let markers = getInitialMarkers(map, google, infowindow, markersInfo);
    const options = {
      imagePath: "/static/m",
      gridSize: 75,
      maxZoom: 12,
      minimumClusterSize: 2,
      averageCenter: true,
    };
    const initialMarkerCluster = new MarkerClusterer(map, markers, options);
    setMarkerCluster(initialMarkerCluster); //hotfix
    setCurrentLocation(mapInstance);
  };

  return (
    <React.Fragment>
      <StyledPaper elevation={20}>
        <Header infowindow={infowindow} mapInstance={mapInstance} />
        <div style={mapDivStyle}>
          <Map
            style={containerStyle}
            containerStyle={containerSizing}
            google={props.google}
            onReady={onLoad}
          ></Map>
        </div>
      </StyledPaper>
      {displayExpansionPanel ? (
        <DealersDetails infowindow={infowindow} mapInstance={mapInstance} />
      ) : null}
    </React.Fragment>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(MyContainer);
