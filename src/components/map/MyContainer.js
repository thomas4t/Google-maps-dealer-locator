import React, { useEffect, useState } from "react";
import { GoogleApiWrapper, Map } from "google-maps-react";
import StyledPaper from "./StyledPaper";
import Header from "../header/Header";
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

import { useSelector } from "react-redux";

let mapInstance = null;

export function MyContainer(props) {
  //states and such
  const [markerCluster, setMarkerCluster] = useState(null);
  //const [mapInstance, setMapInstance] = useState(null);
  const markersInfo = useSelector((state) => state.markersInfo);
  //declaring and initializing 'globally' used objects
  //let mapInstance = null;
  const google = window.google;
  const infowindow = new props.google.maps.InfoWindow({
    content: "",
  });

  //defining custom hook which starts updating only after first render occurs
  //updating markers
  const didMount = useDidMount();
  const updateMarkers = () => {
    if (didMount) {
      console.log("CHANGE");
      if (markerCluster) {
        markerCluster.clearMarkers();
      }
      let markers = getMarkers(mapInstance, google, infowindow, markersInfo);
      markerCluster.addMarkers(markers, true);
    }
  };
  useEffect(updateMarkers, [markersInfo]);

  const onLoad = (mapProps, map) => {
    mapInstance = map;
    let markers = getInitialMarkers(map, google, infowindow, markersInfo);
    const options = {
      imagePath: "/static/m",
      gridSize: 75,
      maxZoom: 13,
      minimumClusterSize: 2,
      averageCenter: true,
    };
    const initialMarkerCluster = new MarkerClusterer(map, markers, options);
    setMarkerCluster(initialMarkerCluster);
    setCurrentLocation(mapInstance);

    // mapInstance.addListener("zoom_changed", () => {
    //   let zoom = mapInstance.getZoom();
    //   console.log(zoom);
    // });
  };

  return (
    <StyledPaper elevation={20}>
      <Header infowindow={infowindow} />
      <div style={mapDivStyle}>
        <Map
          style={containerStyle}
          containerStyle={containerSizing}
          google={props.google}
          onReady={onLoad}
        ></Map>
      </div>
    </StyledPaper>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(MyContainer);
