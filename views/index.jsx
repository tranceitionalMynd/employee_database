var React = require('react');

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

module.exports = HelloMessage;

//<html>
//<head>
//  <% include partials/head.ejs %>
//</head>
//<body>
//  <p>Hello world!</p>
//</body>
//</html>
