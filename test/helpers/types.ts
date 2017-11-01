// tslint:disable:no-any

import Spy = jasmine.Spy

interface BuildMockContext {
	readonly contextCallsOrder?: MockContextCall[],
	readonly toBlobSpy?: Spy,
}

interface MockCanvas extends MockElement {
	getContext?: any,
	height?: any,
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
	restore?: any,
	save?: any,
	stroke?: any,
	strokeStyle?: any,
	toBlob?: any,
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
		fontFamily?: any,
		fontSize?: any,
		height?: any,
		justifyContent?: any,
		left?: any,
		margin?: any,
		padding?: any,
		position?: any,
		top?: any,
		width?: any,
		zIndex?: any,
	},
}

export {
	BuildMockContext,
	MockContext,
	MockElement,
	MockContextCall,
	MockContextMethod,
	MockCanvas,
}
