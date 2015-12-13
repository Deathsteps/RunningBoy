var React = require('react');

class Layout extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		return (
				<div style={{width: 800, position: 'absolute'}}>
					{_.forEach(this.props.children, (child) => (child))}
				</div>
			);
	}
}

module.exports = Layout;