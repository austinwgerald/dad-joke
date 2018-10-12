import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: '',
      message: ''
    };
  }

  handleClick = () => {
    this.getJokeData();
  }

  componentDidMount() {
    this.getJokeData();
  }

  getJokeData() {
    console.log('Getting a new serving of fresh, organic dad joke.');
    this.callApi()
      .then(res => this.validate(res))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/joke');
    const body = await response.json();
    console.log(body)
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  validate(res) {
    if (res.status === 200 && res.joke !== null) {
      this.setState({ joke: res.joke });
    }
    else if (res.status !== 200 && res.message !== null) {
      this.setState({ message: res.message });
    }
    else {
      this.setState({ message: 'There was an error. Please try again!' });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-title">React(ing) to Dad Jokes.</p>
        </header>
        <div className="Message">
          {this.state.message}
        </div>
        <div className="Joke">
          {this.state.joke.split("\n").map((i, key) => {
            return <div key={key}>{i}</div>;
          })}
        </div>
        <br /><br />
        <button className="Button" onClick={this.handleClick}>
          &#xab; ACTIVATE LASERS (get new joke) &#xbb;
        </button>

      </div>
    );
  }
}

export default App;
