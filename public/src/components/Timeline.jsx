var React = require('react');

class Timeline extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		var list = []
		for(let i = 0, l = 49; i<l; i+= 1){
			let important = i % 4 == 0;
			list.push(
					<line 
						x1={ 5+i*10 } x2={ 5+i*10 }
	          y1={ important ? 0 : 10 } y2='20'
	          stroke="black" 
	          stroke-width={ important ? 2 : 1 } />
        );
			if(i % 8 == 0)
				list.push(
						<text x={ 2+i*10 } y="42">
					    {i}
					  </text>
				  );
		}

		return (
				<div style={{marginLeft: 10, position: 'relative'}}>
					<svg width="500" height="50">
						{ list.map((item) => (item)) }
				  </svg>
				  <input type="range" min="0" max="48" value="0" 
				  	style={{width: 480, position: 'absolute', left: 0, top: 8}}/>
				</div>
			);
	}
}

module.exports = Timeline;