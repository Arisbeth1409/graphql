import React, { Component } from "react";
import "../styles/App.css";
import CreateLink from "./CreateLink";
import Header from "../components/Header";
import { Switch, Route } from "react-router-dom";
import LinkListPage from "../components/LinkListPage";
import Login from "./Login";

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <div className="ph3 pv1 background-gray">
          <Switch>
            <main>
              <Header />
              <Route exact path="/" component={LinkListPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/create" component={CreateLink} />
            </main>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
