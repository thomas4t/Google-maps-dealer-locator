import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

const StyledPaper = styled(Paper)`
  background: linear-gradient(to top, #8e9eab, #eef2f3);
  text-align: center;
  height: 85vh;
  width: 70vw;
  margin: auto;
  margin-top: 5vh;
  @media only screen and (max-width: 1300px) {
    width: 90vw;
  }
`;

export default StyledPaper;
