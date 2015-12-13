var React = require('react');

var ParameterStore = require('../stores/ParameterStore');

const MOVE_STOP  = require('../constants').MOVE_STOP;
const MOVE_START = require('../constants').MOVE_START;

class Obstacle extends React.Component {
	constructor(props){
		super(props);
		this.state = ParameterStore.getObstacle();
		ParameterStore.on('reset-Obstacle', 
			()=>this.setState(ParameterStore.getObstacle()));
	}

	render(){
		return (
				<div ref="obstacle" style={{
					width: 64,
					height: 68,
					position: 'absolute', 
					top: this.state.y, 
					left: this.state.x,
					backgroundImage: `url(${this.props.sprites.src})`,
					backgroundPosition: '-1177px -70px',
					display: this.state.display
				}}></div>
			);
	}

	componentDidMount(){
		this.handleGameStatus(this.props);
	}

	shouldComponentUpdate (nextProps, nextState){
		if(this.props.gameStatus !== nextProps.gameStatus)
			return this.handleGameStatus(nextProps), false;
		return true;
	}

	componentWillUnmount(){
		this.stop();
	}

	handleGameStatus(nextProps){
		switch(nextProps.gameStatus){
			case MOVE_START: return this.move();
			case MOVE_STOP : return this.stop();
			default: break;
		}
	}

	randomMove(){
		setTimeout(() => {
			this.setState({display: 'block'});
			this.move();	
		}, (Math.random() + 1) * 3000);
	}

	move(){
		var i = this.state.i;
		this._timer = setInterval(() => {
			var x = this.state.x - (++i) * 2;
			this.setState({ x: x });
			ParameterStore.setObstacle({x: x});

			this.state.i = i;
			if(x <= 0)
				this.hide();
		}, this.props.v * 0.5);
	}

	hide(){
		this.setState({display: 'none', x: ParameterStore.getObstacle().defaultX, i: 0});
		this.stop();
		this.randomMove();
	}

	stop(){
		clearInterval(this._timer);
	}
}

module.exports = Obstacle;