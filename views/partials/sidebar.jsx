var React = require('react');
var Sidebar = require('react-sidebar').default;

var App = React.createClass({
  getInitialState: function() {
    return {sidebarOpen: false};
  },

  onSetSidebarOpen: function(open) {
    this.setState({sidebarOpen: open});
  },

  render: function() {
    var sidebarContent = <b>Sidebar content</b>;

    return (
      <Sidebar sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               onSetOpen={this.onSetSidebarOpen}>
        <b>Main content</b>
      </Sidebar>
    );
  }
});
