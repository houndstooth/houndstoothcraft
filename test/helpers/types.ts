// tslint:disable:no-any

import Spy = jasmine.Spy

interface BuildMockContext {
	readonly contextCallsOrder?: MockContextCall[],
	readonly toBlobSpy?: Spy,
}

interface MockBody extends MockElement {
	appendChild?: any,
}

interface MockCanvas {
	classList?: any,
	getContext?: any,
	height?: any,
	style: {
		display?: any,
		left?: any,
		position?: any,
		top?: any,
		zIndex?: any,
	},
	width?: any,
}

interface MockContext {
	arc?: any,
	beginPath?: any,
	canvas?: any,
	clearRect?: any,
	clip?: any,
	closePath?: any,
	drawImage?: any,
	fill?: any,
	fillRect?: any,
	fillStyle?: any,
	fillText?: any,
	font?: any,
	globalAlpha?: any,
	globalCompositeOperation?: any,
	lineTo?: any,
	moveTo?: any,
	toBlob?: any,
	restore?: any,
	save?: any,
	stroke?: any,
	strokeStyle?: any,
}

interface MockContextCall {
	method: MockContextMethod,
	x?: number,
	y?: number
}

type MockContextMethod =
	| 'beginPath'
	| 'clearRect'
	| 'clip'
	| 'closePath'
	| 'fill'
	| 'lineTo'
	| 'moveTo'
	| 'restore'
	| 'save'

interface MockElement {
	appendChild?: any,
	classList?: any,
	click?: any,
	download?: any,
	href?: any,
	innerHTML?: any,
	nextSibling?: any,
	parentNode?: any,
	setAttribute?: any,
	style: {
		cursor?: any,
		display?: any,
		height?: any,
		left?: any,
		padding?: any,
		position?: any,
		top?: any,
		width?: any,
	},
}

export {
	BuildMockContext,
	MockContext,
	MockElement,
	MockContextCall,
	MockContextMethod,
	MockCanvas,
	MockBody,
}
