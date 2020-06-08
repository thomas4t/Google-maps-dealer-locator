const setCurrentLocation = (map) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      let latLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(latLng);
    });
  } else {
    map.setCenter({ lat: 51.996848, lng: 9.248478 });
  }
};

export default setCurrentLocation;
