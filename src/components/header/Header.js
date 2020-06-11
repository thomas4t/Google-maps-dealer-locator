import React from "react";
import CountrySelect from "./CountrySelect";
import PlaceSearch from "./PlaceSearch";
import TypeFilter from "./TypeFilter";

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "99%",
  height: "12%",
  margin: "auto",
};

const Header = (props) => {
  return (
    <div style={headerStyle}>
      <CountrySelect />
      <PlaceSearch infowindow={props.infowindow} />
      <TypeFilter />
    </div>
  );
};

export default Header;
