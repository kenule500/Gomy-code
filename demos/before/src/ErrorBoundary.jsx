import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // This updates the state so the next render shows the fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Use this for logging to services like Sentry or LogRocket
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  // Allows the user to try again without refreshing the whole browser
  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/"; // Or use navigate('/') if using React Router
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.header}>Oops! Something went wrong.</h1>
          <p style={styles.text}>
            Our language engine hit a snag. Don't worry, your progress is safe.
          </p>
          <button onClick={this.handleReset} style={styles.button}>
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  header: { color: '#e74c3c' },
  text: { color: '#555', marginBottom: '20px' },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default ErrorBoundary;