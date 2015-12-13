'use strict'

var EventEmitter = require('events').EventEmitter;

const MOVE_STOP  = require('../constants').MOVE_STOP;
const MOVE_START = require('../constants').MOVE_START;

var data = {
	Boy: {x: 30, y: 40, vOffset: 0, frameIndex: 0, jumpIndex: 1, jumping: false},
	Girl: {x: 160, y: 70, vOffset: 0, frameIndex: 0},
	Road: {w: 510, h: 154, l: 510/10, t: 0, f: 0},
	Obstacle: {defaultX: 440, x: 440, y: 100, display: 'block', i: 0}
};

var defaults = {};
for(let k in data){
	defaults[k] = Object.assign({}, data[k]);
}

var parameters = Object.assign({}, EventEmitter.prototype, {
	reset(){
		for(let key in data){
			this['reset'+key]();
		}
	}
});

function makeGet (key) {
	return () => data[key];
}
function makeSet (key) {
	return function(json) {
		Object.assign(data[key], json);
		this.emit('change-'+key, json);
	}
}
function makeReset (key) {
	return function () {
		data[key] = Object.assign({}, defaults[key]);
		this.emit('reset-'+key);
	}
}

for(let key in data){
	parameters['get' + key] = makeGet(key);
	parameters['set' + key] = makeSet(key);
	parameters['reset' + key] = makeReset(key);
}

module.exports = parameters;

