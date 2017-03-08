var React = require('react');
var Sidebar = require('./partials/sidebar');

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

module.exports = HelloMessage;
