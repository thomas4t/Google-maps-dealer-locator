import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { renderToString } from "react-dom/server";
import { animateScroll as scroll } from "react-scroll";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import DealerInfoCard from "./DealerInfoCard";
import InfoWindowComp from "../map/InfoWindowComp";
import { useSelector } from "react-redux";

const MyDiv = styled.div`
  overflow: auto;
  text-align: center;
  height: ${(props) => (props.isPanelExpanded ? "90vh" : "10vh")};
  width: 70vw;
  margin: auto;
  margin-top: 2vh;
  margin-bottom: 5vh;
  @media only screen and (max-width: 1300px) {
    width: 90vw;
  }
`;

const DealersDetails = (props) => {
  const markersInfo = useSelector((state) => state.markersInfo);
  const markerObjects = useSelector((state) => state.markerObjects);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [dealersToDisplay, setDealersToDisplay] = useState([]);
  const [leftOutDealers, setLeftOutDealers] = useState(0);

  useEffect(() => {
    if (isPanelExpanded) {
      if (markersInfo.length > 50) {
        let sliced = markersInfo.slice(0, 50);
        setDealersToDisplay(sliced);
        setLeftOutDealers(markersInfo.length - sliced.length);
      } else {
        setDealersToDisplay(markersInfo);
        setLeftOutDealers(0);
      }
    } else {
      setDealersToDisplay([]);
    }
  }, [isPanelExpanded, markersInfo]);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const scrollToBottom = () => {
    scroll.scrollToBottom({
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const handlePanelOnChange = () => {
    if (!isPanelExpanded) {
      scrollToBottom();
    } else {
      scrollToTop();
    }
    setIsPanelExpanded(!isPanelExpanded);
  };

  const handleOnInfoCardClick = (dealer) => {
    props.mapInstance.setZoom(13);
    scrollToTop();
    let marker = markerObjects.filter((marker) => marker.id === dealer.id)[0]; //is returned in an array
    props.mapInstance.panTo(marker.getPosition());
    const content = renderToString(<InfoWindowComp dealerInfo={dealer} />);
    props.infowindow.setContent(content);
    props.infowindow.open(props.mapInstance, marker);
  };

  const handleOnTakeMeBackButtonClick = () => {
    scrollToTop();
    // setIsPanelExpanded(false);
  };

  const expansionPanelDetailsStyle = {
    display: "flex",
    flexFlow: "wrap",
    justifyContent: "center",
  };
  return (
    <MyDiv isPanelExpanded={isPanelExpanded}>
      <ExpansionPanel
        style={{
          background: "#f2f2f2",
        }}
        expanded={isPanelExpanded}
        onChange={() => handlePanelOnChange()}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {/* <Typography className={classes.heading}>Expansion Panel 1</Typography> */}
          <Typography href="#MyContainer">
            {isPanelExpanded ? "Hide details" : "Show details"}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={expansionPanelDetailsStyle}>
          {dealersToDisplay.map((dealer) => (
            <DealerInfoCard
              dealerInfo={dealer}
              key={dealer.id}
              scrollToTop={scrollToTop}
              handleOnInfoCardClick={handleOnInfoCardClick}
            />
          ))}
          <br />
          {leftOutDealers === 0 ? null : (
            <div style={{ display: "block", flexGrow: "1", margin: "auto" }}>
              <h2>And {leftOutDealers} more...</h2>
              <Button
                onClick={() => handleOnTakeMeBackButtonClick()}
                variant="contained"
              >
                Take me back
              </Button>
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </MyDiv>
  );
};

export default DealersDetails;
