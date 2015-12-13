var React = require('react');

var ParameterStore = require('../stores/ParameterStore');

var React = require('react');

var ParameterStore = require('../stores/ParameterStore');

const MOVE_STOP  = require('../constants').MOVE_STOP;
const MOVE_START = require('../constants').MOVE_START;


class Girl extends React.Component {
	constructor(props){
		super(props);
		this.state = Object.assign({}, ParameterStore.getGirl());

		ParameterStore.on('change-Girl', (newState) => {
			if(newState.jumping !== undefined)
				this.setState(newState);
		});
		ParameterStore.on('reset-Girl', () => {
			this.setState(Object.assign({}, ParameterStore.getGirl()));
		});
	}

	render(){
		var i;
		if(this.state.jumping){
			i = 3;
		}else{
			i = [1,0,1,2][this.state.frameIndex];
		}
		var backgroundPosition = i * -128 + 'px -254px'
		return (
				<div ref="girl" style={{
					width: 128,
					height: 128,
					position: 'absolute', 
					top: this.state.y, 
					left: this.state.x,
					backgroundImage: `url(${this.props.sprites.src})`,
					backgroundPosition: backgroundPosition
				}} />
			);
	}

	shouldComponentUpdate (nextProps, nextState){
		if(nextProps.gameStatus !== this.props.gameStatus ||
			nextState.jumping !== this.state.jumping)
			return this.update(nextProps, nextState), false;
		return true;
	}

	update(nextProps, nextState){
		switch(nextProps.gameStatus){
			case MOVE_START:
				nextState.jumping ? this.jump() : this.run();
				break;
			case MOVE_STOP :
				this.stop();
				break;
			default:
				break;
		}
	}

	componentWillUnmount(){
		this.stop();
	}

	run(){
		this._animation = () => {
			var index = this.state.frameIndex;
			if(++index > 3){
				this.setState({frameIndex: 0});
			}else{
				this.setState({frameIndex: index});
			}
		};

		this.start();
	}

	jump(){
		this._animation = () => {
		 	var index = this.state.jumpIndex;

		 	var y = this.state.defaultY - 3*index*(8 - index);
		  this.setState({y: y});
		  ParameterStore.setGirl({y: y});

		  if(++index > 8){
		    index = 1;
		    this.stopJumping();
		  }
		  this.state.jumpIndex = index;
		}

		this.start(0.5);
	}

	stopJumping(){
		this.setState({jumping: false});
	}

	start(speedRatio=1){
		this.stop();
		this._timer = setInterval(
			() => this._animation(),
			(this.props.v - this.state.vOffset) * speedRatio
		);
	}

	stop(){
		clearInterval(this._timer);	
	}
}

module.exports = Girl;