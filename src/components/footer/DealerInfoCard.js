import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const StyledCard = styled(Card)`
  margin: 2% 10px 2% 10px;
`;
const StyledCardContent = styled(CardContent)`
  height: 57%;
`;

const DealerInfoCard = (props) => {
  //accepts dealerInfo prop which is a dealer object

  return (
    <StyledCard>
      <StyledCardContent>
        <Typography color="textSecondary" gutterBottom>
          {props.dealerInfo.content.type.length === 2
            ? props.dealerInfo.content.type[0].toUpperCase() +
              " & " +
              props.dealerInfo.content.type[1].toUpperCase()
            : null}
          {props.dealerInfo.content.type.length === 1
            ? props.dealerInfo.content.type[0].toUpperCase()
            : null}
        </Typography>
        <Typography variant="h5" component="h3">
          {props.dealerInfo.content.name}
        </Typography>
        <Typography variant="body2" component="p">
          {props.dealerInfo.content.street}, {props.dealerInfo.content.city},{" "}
          {props.dealerInfo.content.postalCode}
        </Typography>
        <Typography color="textSecondary">
          {props.dealerInfo.content.phone === "" ||
          props.dealerInfo.content.phone === null
            ? null
            : "tel: " + props.dealerInfo.content.phone}
          <br />
          {props.dealerInfo.content.email === null
            ? null
            : "email: " + props.dealerInfo.content.email}
        </Typography>
      </StyledCardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          onClick={() => props.handleOnInfoCardClick(props.dealerInfo)}
          size="small"
        >
          Show on map
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default DealerInfoCard;
