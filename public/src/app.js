var React = require('react');
var ReactDOM = require('react-dom');

var Game = require('./components/Game.jsx');

ReactDOM.render(React.createFactory(Game)(), document.getElementById('main'));