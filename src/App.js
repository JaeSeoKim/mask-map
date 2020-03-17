import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Location from "./routes/Loaction";
import Detail from "./routes/Detail";
import About from "./routes/About";
import Error_page from "./routes/Error_page";
import Navigation from "./components/Navigation";
import { Provider } from "react-redux";
import store from "./store/store";
import MaskMap from "./components/MaskMap";

function App() {

  return (
    <Provider store={store}>
      <HashRouter>
        <Navigation />
        <Switch >
          <Route path="/" exact={true} component={Home} />
          <Route path="/location" exact={true} component={Location} />
          <Route path="/about" exact={true} component={About} />
          <Route path="/detail/:id" exact={true} component={Detail} />
          <Route path="/maskMap" exact={true} component={MaskMap} />
          <Route component={Error_page} />
        </Switch>
      </HashRouter>
    </Provider >
  );
}

export default App;
