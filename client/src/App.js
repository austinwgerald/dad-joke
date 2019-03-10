import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import './App.css';
import Footer from './Components/Footer';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 
library.add(
  fab,
  faSpinner
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: '',
      message: '',
      loading: false
    };
  }

  componentDidMount() {
    this.getJokeData();
  }

  handleClick = () => {
    this.getJokeData();
  }

  getJokeData() {
    console.log('Getting a new serving of fresh, organic dad joke.');

    this.setState({ loading: true }, () => {
      this.callApi()
      .then(res => this.validate(res))
      .catch(err => console.log(err));
    });

  }

  callApi = async () => {
    const response = await fetch('/api/joke');
    const body = await response.json();
    console.log(body)

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  validate(res) {
    //Reset loading
    this.setState({ loading: false });

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
      <div className="App" >
        <header className="App-header">
          <p className="App-title">React(ing) to Dad Jokes.</p>
        </header>

        <div className="Message">
          {this.state.message}
        </div>

        { 
          this.state.loading ?

          <FontAwesomeIcon icon={['fas', 'spinner']} pulse size="4x" /> :

          <Fade left spy={this.state.joke}>
            <div className="Joke">
              {this.state.joke.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
              })}
            </div>
          </Fade>
        }

        <br /><br />

        <button className="Button" onClick={this.handleClick}>
          Another!
        </button>
        
        <Footer/>
      </div>
    );
  }
}

export default App;
