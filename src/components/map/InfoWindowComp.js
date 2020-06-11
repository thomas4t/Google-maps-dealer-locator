import React from "react";

const InfoWindowComp = (props) => {
  //accepts dealerInfo prop which is a dealer object
  return (
    //conditionally render some stuff
    <div>
      {props.dealerInfo.content.type.length === 2 ? (
        <h3>
          {props.dealerInfo.content.type[0].toUpperCase()} &{" "}
          {props.dealerInfo.content.type[1].toUpperCase()}
        </h3>
      ) : null}
      {props.dealerInfo.content.type.length === 1 ? (
        <h3>{props.dealerInfo.content.type[0].toUpperCase()}</h3>
      ) : null}
      <h2>{props.dealerInfo.content.name}</h2>
      <h4>
        {props.dealerInfo.content.street}, {props.dealerInfo.content.city},{" "}
        {props.dealerInfo.content.postalCode}
      </h4>
      {props.dealerInfo.content.phone === "" ||
      props.dealerInfo.content.phone === null ? null : (
        <p>tel: {props.dealerInfo.content.phone}</p>
      )}
      {props.dealerInfo.content.email === null ? null : (
        <p>email: {props.dealerInfo.content.email}</p>
      )}
    </div>
  );
};

export default InfoWindowComp;
