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
      id: dealer.id,
    });
    bounds.extend(latLng);
    marker.addListener("click", () => {
      const content = renderToString(<InfoWindowComp dealerInfo={dealer} />);
      infowindow.setContent(content);
      infowindow.open(map, marker);
      map.panTo(marker.getPosition());
    });
    markers.push(marker);
    return dealer;
  });
  map.fitBounds(bounds);
  map.panToBounds(bounds);
  if (markers.length === 1) {
    //if there is only 1 marker, do some stuff
    const content = renderToString(
      <InfoWindowComp dealerInfo={markersInfo[0]} />
    );
    infowindow.setContent(content);
    infowindow.open(map, markers[0]);
    map.setZoom(13);
  }
  return markers;
};

export default getMarkers;
