import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Text from './Text';


export default class Game {

	constructor(element, width, height) {
		this.width = width;
		this.height = height;

		this.gameElement = document.getElementById(element);
		this.board = new Board(this.width, this.height);
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.padding = 10;
		this.radius = 8;
		this.size = 30;

		this.player1 = new Paddle(this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.padding,
			(height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z);
		this.player2 = new Paddle(this.height,
			this.paddleWidth,
			this.paddleHeight,
			(width - this.padding - this.paddleWidth),
			(height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down);
		this.ball = new Ball(this.radius, this.width, this.height);
		this.score1 = new Score(this.width / 2 - 40, 30, this.size);
		this.score2 = new Score(this.width / 2 + 25, 30, this.size);
		this.victory1 = new Text(40, 110, 48);
		this.victory2 = new Text(10, 150, this.size);

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		})

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.enter) {
				location.reload()
			}
		})
	}

	victoryA(svg){
		if (this.player1.score >= 10) {
			this.pause = true;
			this.victory1.render(svg, 'Player 1 wins!')
			this.victory2.render(svg, 'Press enter to play again!')
		}
	}

	victoryB(svg){
		if (this.player2.score >= 10) {
			this.pause = true;
			this.victory1.render(svg, 'Player 2 wins!')
			this.victory2.render(svg, 'Press enter to play again!')
		}
	}

	render() {
		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'ViewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg, this.player1, this.player2);
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);

		this.victoryA(svg);
		this.victoryB(svg);
	}
}