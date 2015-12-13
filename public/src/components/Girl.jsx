var React = require('react');

var ParameterStore = require('../stores/ParameterStore');

class Girl extends React.Component {
	constructor(props){
		super(props);
		ParameterStore.on('change-Girl', (newState) => this.setState(newState));
	}

	render(){
		this.state = ParameterStore.getGirl();
		return (
				<div ref="girl" style={{
					width: 128,
					height: 128,
					position: 'absolute', 
					top: this.state.y, 
					left: this.state.x,
					backgroundImage: `url(${this.props.sprites.src})`,
					backgroundPosition: '0 -254px'
				}} />
			);
	}

	componentDidMount(){
		this.el = this.refs.girl;
		this.index = 0;
		this.run();
	}

	componentDidUpdate(prevProps){
		clearInterval(this._timer);
		this.run();
	}

	componentWillUnmount(){
		clearInterval(this._timer);
	}

	run(){
		var el = this.el, index = this.index;
		this._timer = 
			setInterval(function(){
			  var i = index === 3 ? 1 : index;
			  el.style.backgroundPosition = i * -128 + 'px -254px';
			  if(++index > 3)
			    index = 0;
			}, this.props.v - this.state.vOffset);
	}
}

module.exports = Girl;