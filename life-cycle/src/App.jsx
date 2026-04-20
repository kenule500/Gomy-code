import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Step 1: Initialize the state with the Person object and the toggle boolean
  constructor(props) {
    super(props);
    this.state = {
      Person: {
        fullName: "Kenule Nwinee",
        bio: "AI Developer and Systems Architect specialized in BRCA branding.",
        imgSrc: "https://avatars.githubusercontent.com/u/56476653?v=4&size=64",
        profession: "Software Engineer"
      },
      shows: false,
      timeSinceMount: 0 // Field to track interval
    };
    this.timer = null;
  }

  // Step 2: Implement lifecycle methods
  componentDidMount() {
    // Start interval when component mounts
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        timeSinceMount: prevState.timeSinceMount + 1
      }));
    }, 1000);
  }

  componentWillUnmount() {
    // Always clear the interval to prevent memory leaks
    clearInterval(this.timer);
  }

  // Step 3: Function to toggle the 'shows' state
  toggleShow = () => {
    this.setState({ shows: !this.state.shows });
  };

  render() {
    const { fullName, bio, imgSrc, profession } = this.state.Person;

    return (
      <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Royal Academy Profile Manager</h1>
        
        <button onClick={this.toggleShow} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {this.state.shows ? "Hide Profile" : "Show Profile"}
        </button>

        {/* Conditional rendering based on the 'shows' state */}
        {this.state.shows && (
          <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
            <img src={imgSrc} alt={fullName} style={{ borderRadius: '50%' }} />
            <h2>{fullName}</h2>
            <h3>{profession}</h3>
            <p>{bio}</p>
          </div>
        )}

        <hr />
        <h4>Time since component mounted: {this.state.timeSinceMount} seconds</h4>
      </div>
    );
  }
}

export default App;