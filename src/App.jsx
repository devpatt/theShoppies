import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import HomePage from "./views/home";
import SearchPage from "./views/search";

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
          {/* <Route path="/search" component={SearchPage} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
