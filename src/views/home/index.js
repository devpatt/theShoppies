import React from "react";
import axios from "axios";
import "./styles.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      nominations: [],
    };
  }

  componentDidMount() {}

  addNomination = (result) => {
    if (
      this.state.nominations.length < 5 &&
      this.state.nominations.filter((obj) => obj.imdbID === result.imdbID)
        .length === 0
    ) {
      this.setState({ nominations: [...this.state.nominations, result] });
    }
  };

  removeNomination = (result) => {
    this.setState({
      nominations: this.state.nominations.filter((obj) => {
        return obj.imdbID !== result.imdbID;
      }),
    });
  };

  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = (event) => {
    this.setState({ submittedSearchTerm: this.state.searchTerm });
    axios({
      method: "get",
      url: "https://www.omdbapi.com/",
      params: { apikey: "****", s: this.state.searchTerm },
    })
      .catch(function (error) {
        console.log(error);
        return error.response;
      })
      .then((response) => {
        let data = response.data;
        console.log(data);
        if (data.Response && data.hasOwnProperty("Search")) {
          this.setState({
            searchResults: data.Search,
            searchError: false,
          });
        } else {
          this.setState({
            searchError: true,
            searchErrorMsg: data.Error,
          });
        }
      });

    event.preventDefault();
  };

  render() {
    return (
      <div className="main">
        <div className="main__container">
          {this.state.nominations.length === 5 && (
            <div className="success__banner">
              <div className="success__banner__text">
                You have successfully selected 5 nominations!
              </div>
            </div>
          )}
          <div className="main__title">{"The Shoppies"}</div>

          <div className="search_container">
            <div className="search_container__title">{"Movie title"}</div>
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

          <div className="body_container">
            <div className="results_container">
              <div className="results_container__title">
                Results for "{this.state.submittedSearchTerm}"
              </div>
              {this.state.searchError ? (
                <div className="results_container__error">
                  {this.state.searchErrorMsg}
                </div>
              ) : (
                <ul className="results_container__list">
                  {this.state.searchResults &&
                    this.state.searchResults.map((result) => {
                      return (
                        <li key={result.imdbID}>
                          {result.Title} ({result.Year})
                          <button
                            disabled={
                              this.state.nominations.filter(
                                (obj) => obj.imdbID === result.imdbID
                              ).length !== 0
                            }
                            className="nominate_button"
                            onClick={() => this.addNomination(result)}
                          >
                            Nominate
                          </button>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
            <div className="nominations_container">
              <div className="nominations_container__title">Nominations</div>
              <ul className="nominations_container__list">
                {this.state.nominations &&
                  this.state.nominations.map((result) => {
                    return (
                      <li key={result.imdbID}>
                        {result.Title} ({result.Year})
                        <button
                          className="remove_button"
                          onClick={() => this.removeNomination(result)}
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
