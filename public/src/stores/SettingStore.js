'use strict'

var EventEmitter = require('events').EventEmitter;

const MOVE_STOP  = require('../constants').MOVE_STOP;

module.exports = Object.assign({}, EventEmitter.prototype, {

	get() {
		var img = new Image();
    img.src = 'assets/game.png';

		return {
			v: 300,
			sprites: img,
			status: MOVE_STOP,
			gameover: false
		}
	},

	set(json) {
		this.emit('change', json);
	}
})