// tslint:disable:max-file-line-count max-line-length no-any

import Spy = jasmine.Spy
import { ObjectOf } from '../../../src/indexForTest'

interface ExampleSettings extends ExampleSettingsStructure {
	settingOne: number,
	settingTwo: string,

	[_: string]: number | string,
}

interface ExampleSettingsStructure {
	settingOne: {},
	settingTwo: {},
}

interface TestObject {
	aaa?: string,
	bbb?: string,
}

type SimulateClick = (_: HTMLInputElement, __: (_: Event) => void) => void

interface CreateMockElementParams {
	attributeObject?: ObjectOf<string>,
	children?: HTMLElement[],
	classList?: string[],
	clickSpy?: Spy,
	id?: string,
	parentNodeId?: string,
	parentNodeInsertBeforeSpy?: Spy,
	parentNodeOpen?: boolean,
	parentNodeRemoveChildSpy?: Spy,
	value?: string,
}

interface MockElement {
	appendChild?: any,
	classList?: any,
	click?: any,
	disabled?: any,
	download?: any,
	href?: any,
	id?: any,
	innerHTML?: any,
	nextSibling?: any,
	onchange?: any,
	onclick?: any,
	parentNode?: any,
	setAttribute?: any,
	style: {
		cursor?: any,
		display?: any,
		fill?: any,
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
	textContent?: any,
	value?: any,
}

interface MockCanvas extends MockElement {
	getContext?: any,
	height?: any,
	width?: any,
}

interface MockEvent {
	AT_TARGET: any,
	bubbles: any,
	BUBBLING_PHASE: any,
	cancelable: any,
	cancelBubble: any,
	CAPTURING_PHASE: any,
	currentTarget: any,
	deepPath: any,
	defaultPrevented: any,
	eventPhase: any,
	initEvent: any,
	isTrusted: any,
	preventDefault: any,
	returnValue: any,
	scoped: any,
	srcElement: any,
	stopImmediatePropagation: any,
	stopPropagation: any,
	target: any,
	timeStamp: any,
	type: any,
}

interface CreateMockContextParams {
	clearRectSpy?: Spy,
	contextCallsOrder?: MockContextCall[],
	drawImageSpy?: Spy,
	fillRectSpy?: Spy,
	toBlobSpy?: Spy,
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

interface MockConsole {
	assert: any,
	clear: any,
	console: any,
	count: any,
	debug: any,
	dir: any,
	dirxml: any,
	error: any,
	exception: any,
	group: any,
	groupCollapsed: any,
	groupEnd: any,
	info: any,
	log: any,
	msIsIndependentlyComposed: any,
	profile: any,
	profileEnd: any,
	select: any,
	table: any,
	time: any,
	timeEnd: any,
	trace: any,
	warn: any,
}

interface MockDocument {
	body: {
		appendChild?: any,
	},
	createElement: (tagName: string) => HTMLElement,
	createTextNode: any,
	querySelector: any,
}

interface MockWindow {
	clearInterval: (intervalId: number) => void,
	setInterval: (handler: (...args: any[]) => void, interval: number) => number,
	setTimeout: (handler: (...args: any[]) => void, timeout: number) => number,
	URL: {
		createObjectURL: (blob: any) => string,
		revokeObjectURL: (url: string) => any,
	},
}

export {
	CreateMockContextParams,
	MockContext,
	MockContextCall,
	MockContextMethod,
	MockCanvas,
	MockElement,
	MockEvent,
	CreateMockElementParams,
	ExampleSettings,
	ExampleSettingsStructure,
	SimulateClick,
	TestObject,
	MockConsole,
	MockDocument,
	MockWindow,
}
