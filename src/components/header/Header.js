import React from "react";
import CountrySelect from "./CountrySelect";
import PlaceSearch from "./PlaceSearch";

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "99%",
  height: "14.5%",
  margin: "auto",
};

const Header = (props) => {
  return (
    <div style={headerStyle}>
      <CountrySelect />
      <PlaceSearch infowindow={props.infowindow} />
    </div>
  );
};

export default Header;
