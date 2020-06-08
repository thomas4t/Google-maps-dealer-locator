import React from "react";

const InfoWindowComp = (props) => {
  return (
    <h2>
      {props.dealerInfo.content.city}, {props.dealerInfo.id}
    </h2>
  );
};

export default InfoWindowComp;
