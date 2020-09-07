import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import HomePage from "./views/home";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
