import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // You can handle the error here, log it, or display a custom error message.
    console.error(error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render a custom error message or fallback UI here.
      return <div>Error: Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
