import React from "react";
import axios from "axios";
import "./styles.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
  }

  componentDidMount() {}

  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = (event) => {
    console.log("Search term: " + this.state.searchTerm);
    axios({
      method: "get",
      url: "http://www.omdbapi.com/",
      params: { apikey: "", s: this.state.searchTerm },
    })
      .catch(function (error) {
        console.log(error);
        return error.response;
      })
      .then((response) => {
        console.log(response.data);
      });

    event.preventDefault();
  };

  render() {
    return (
      <div className="main">
        <div className="main__container">
          <div className="main__title">The Shoppies</div>

          <div className="search_container">
            <div className="search_container__title">Movie title</div>
            <form
              className="search_container__form"
              onSubmit={this.handleSearch}
            >
              <input
                type="text"
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                className="search_input"
              />
              <input type="submit" value="Search"></input>
            </form>
          </div>

          <div className="results_container"></div>
        </div>
      </div>
    );
  }
}

export default Home;
