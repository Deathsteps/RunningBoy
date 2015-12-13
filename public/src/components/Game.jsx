var _ = require('lodash');
var React = require('react');

var SettingStore = require('../stores/SettingStore');

var Layout     = require('./Layout.jsx');
var Timeline   = require('./Timeline.jsx');
var Road       = require('./Road.jsx');
var Obstacle   = require('./Obstacle.jsx');
var Boy        = require('./Boy.jsx');
var Girl       = require('./Girl.jsx');
var Controller = require('./Controller');

class Game extends React.Component {

	constructor(props){
		super(props);
		this.state = SettingStore.get();
		SettingStore.on('change', (newState) => this.setState(newState));
	}

	render(){
		var mainLayout = 
			<Layout>
				<Road v={this.state.v} sprites={this.state.sprites} gameStatus={this.state.status}/>
				<Obstacle v={this.state.v} sprites={this.state.sprites} gameStatus={this.state.status}/>
				<Boy v={this.state.v} sprites={this.state.sprites} gameStatus={this.state.status}/>
				<Controller v={this.state.v} role="Boy" gameStatus={this.state.status} />
			</Layout>;

		var failLayout = 
			<Layout>
				<div className="fail_mask"></div>
				<div className="fail_logo"></div>
			</Layout>

		failLayout = this.state.gameover ? failLayout : '';

		return (
				<div>
					{mainLayout}
					{failLayout}
				</div>
			);
	}

}

module.exports = Game;