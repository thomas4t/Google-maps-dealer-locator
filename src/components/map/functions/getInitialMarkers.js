import React from "react";
import { renderToString } from "react-dom/server";
import InfoWindowComp from "../InfoWindowComp";

const getMarkers = (map, google, infowindow, markersInfo) => {
  const bounds = new google.maps.LatLngBounds();
  let markers = [];
  markersInfo.map((dealer) => {
    let latLng = new google.maps.LatLng(dealer.content.lat, dealer.content.lng);
    let marker = new google.maps.Marker({
      position: latLng,
      title: dealer.content.name,
    });
    bounds.extend(latLng);
    marker.addListener("click", () => {
      const content = renderToString(<InfoWindowComp dealerInfo={dealer} />);
      infowindow.setContent(content);
      infowindow.open(map, marker);
      //   infowindow.open(map, this); ??
      map.panTo(marker.getPosition());
    });
    markers.push(marker);
    return dealer;
  });
  map.setZoom(8);
  return markers;
};

export default getMarkers;
