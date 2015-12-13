var React = require('react');

var ParameterStore = require('../stores/ParameterStore');

const MOVE_STOP  = require('../constants').MOVE_STOP;
const MOVE_START = require('../constants').MOVE_START;

class Road extends React.Component {
	constructor(props){
		super(props);
		this.state = ParameterStore.getRoad();
		ParameterStore.on('reset-Road', ()=> {
			this.state = ParameterStore.getRoad();
			this.componentDidMount()
		});
	}

	render(){
		return (
				<canvas ref="background" width="520" height="260"></canvas>
			);
	}

	componentDidMount(){
		this.ctx = this.refs.background.getContext('2d');
		setTimeout(() => {
			// sky
			this.ctx.drawImage(this.props.sprites,
				526, 0, this.state.w, 154, 0, 0, this.state.w, 154);
			// road
			this.ctx.drawImage(this.props.sprites,
				526, 284, this.state.w, 154, 0, 44, this.state.w, 154);
		});
	}

	shouldComponentUpdate (nextProps, nextState, rest){
		if(this.props.gameStatus !== nextProps.gameStatus)
			return this.handleGameStatus(nextProps), false;
		return true;
	}

	componentWillUnmount(){
		this.stopRunning();
	}

	handleGameStatus(nextProps){
		switch(nextProps.gameStatus){
			case MOVE_START: return this.run();
			case MOVE_STOP : return this.stopRunning();
			default: break;
		}
	}

	run(){
		var ctx = this.ctx, 
			img = this.props.sprites,
			t = this.state.t, f = this.state.f, 
			w = this.state.w, l = this.state.l;
    this._timer = setInterval(() => {
      ctx.clearRect(0, 0, 800, 400);
      // sx, sy, sw, sh, dx, dy, dw, dh
      var m = t*10, n = w - t*10;
      var movements = [
        { sx: m, sw: n, dx: 0, dw: n },
        { sx: 0, sw: m, dx: n, dw: m }
      ];
      // sky
      ctx.drawImage(img, 526 + movements[f  ].sx, 0, movements[f  ].sw, 154, movements[f  ].dx, 0, movements[f  ].dw, 154);
      ctx.drawImage(img, 526 + movements[1-f].sx, 0, movements[1-f].sw, 154, movements[1-f].dx, 0, movements[1-f].dw, 154);
      // road
      ctx.drawImage(img, 526 + movements[f  ].sx, 284, movements[f  ].sw, 154, movements[f  ].dx, 44, movements[f  ].dw, 154);
      ctx.drawImage(img, 526 + movements[1-f].sx, 284, movements[1-f].sw, 154, movements[1-f].dx, 44, movements[1-f].dw, 154);
      if(++t > l-1){
        t = 0;
        f = 1;
      }
      // set values back to state
      this.state.t = t; this.state.f = f;
    }, this.props.v);
	}

	stopRunning(){
		clearInterval(this._timer);
	}
}

module.exports = Road;