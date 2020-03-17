import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import About from "./routes/About";
import Error_page from "./routes/Error_page";
import Navigation from "./components/Navigation";
import { Provider } from "react-redux";
import store from "./store/store";
import MaskMap from "./routes/MaskMap";

function App() {

  return (
    <Provider store={store}>
      <HashRouter>
        <Navigation />
        <Switch >
          <Route path="/" exact={true} component={MaskMap} />
          <Route path="/about" exact={true} component={About} />
          <Route component={Error_page} />
        </Switch>
      </HashRouter>
    </Provider >
  );
}

export default App;
