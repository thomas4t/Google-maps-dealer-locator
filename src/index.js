import React from "react";
import ReactDOM from "react-dom";
import MyContainer from "./components/map/MyContainer";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <MyContainer />
  </Provider>,
  document.getElementById("root")
);
