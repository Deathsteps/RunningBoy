var React = require('react');

var ParameterStore = require('../stores/ParameterStore');

const MOVE_STOP  = require('../constants').MOVE_STOP;
const MOVE_START = require('../constants').MOVE_START;

class Boy extends React.Component {
	constructor(props){
		super(props);
		this.state = ParameterStore.getBoy();

		ParameterStore.on('change-Boy', (newState) => {
			if(newState.jumping !== undefined)
				this.setState(newState);
		});
		ParameterStore.on('reset-Boy', () => {
			this.forceUpdate();
			this.componentDidMount();
		});
	}

	render(){
		return (
				<canvas ref="boy" width="128" height="128" 
					style={{position: 'absolute', top: this.state.y, left: this.state.x}}>
				</canvas>
			);
	}

	componentDidMount(){
		this.ctx = this.refs.boy.getContext('2d');
		setTimeout(() => {
			this.ctx.clearRect(0, 0, 128, 128);
			this.ctx.drawImage(this.props.sprites,
				128, 0, 128, 128, 0, 0, 128, 128)
		});
	}

	shouldComponentUpdate (nextProps, nextState){
		return this.update(nextProps, nextState), false;
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

	run(){
		var ctx = this.ctx, index = this.state.frameIndex, img = this.props.sprites;
		if(!this._runFunc){
			this._runFunc = () => {
			  ctx.clearRect(0, 0, 128, 128);
			  var i = index === 3 ? 1 : index;
			  ctx.drawImage(img, 0 + 128*i, 0, 128, 128, 0, 0, 128, 128);
			  if(++index > 3)
			    index = 0;
			  this.state.frameIndex = index;
			};	
		}

		this._animation = this._runFunc;
		this.start();
	}

	jump(){
		var ctx = this.ctx, index = this.state.jumpIndex, img = this.props.sprites;
		if(!this._jumpFunc){
			var top = parseInt(this.refs.boy.style.top);
			this._jumpFunc = () => {
				if(index === 1){
					ctx.clearRect(0, 0, 128, 128);
					ctx.drawImage(img, 128*3, 0, 128, 128, 0, 0, 128, 128);
				}
			 	
			 	var y = top - 3*index*(8 - index);
			  this.refs.boy.style.top = y + 'px';
			  ParameterStore.setBoy({y: y});

			  if(++index > 8){
			    this.state.jumpIndex = index = 1;
			    this.stopJumping();
			  }else{
			  	this.state.jumpIndex = index;
			  }
			};
		}

		this._animation = this._jumpFunc;
		this.start(0.5);
	}

	stopJumping(){
		this.setState({jumping: false});
	}

	stop(){
		clearInterval(this._timer);
		this._timer = undefined;
	}

	start(speedRatio=1){
		this.stop();
		this._timer = setInterval(
			() => this._animation(),
			(this.props.v - this.state.vOffset) * speedRatio
		);
	}
} 

module.exports = Boy;