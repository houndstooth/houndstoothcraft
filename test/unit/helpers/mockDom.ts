// tslint:disable:no-any no-object-literal-type-assertion

import { appState, globalWrapper } from '../../../src/indexForTest'
import createMockElement from './createMockElement'
import noop from './noop'
import { MockConsole, MockDocument, MockWindow } from './types'

const mockConsole: MockConsole = {
	assert: noop,
	clear: noop,
	console: noop,
	count: noop,
	debug: noop,
	dir: noop,
	dirxml: noop,
	error: noop,
	exception: noop,
	group: noop,
	groupCollapsed: noop,
	groupEnd: noop,
	info: noop,
	log: noop,
	markTimeline: noop,
	memory: noop,
	msIsIndependentlyComposed: noop,
	profile: noop,
	profileEnd: noop,
	select: noop,
	table: noop,
	time: noop,
	timeEnd: noop,
	timeStamp: noop,
	timeline: noop,
	timelineEnd: noop,
	trace: noop,
	warn: noop,
}

const mockDocument: MockDocument = {
	body: {
		appendChild: noop,
	},
	createElement: (_: string): HTMLElement => ({} as HTMLElement),
	createTextNode: noop,
	querySelector: noop,
}

const mockWindow: MockWindow = {
	URL: {
		createObjectURL: (): string => '',
		revokeObjectURL: noop,
	},
	clearInterval: noop,
	setInterval: (): number => 0,
	setTimeout: (): number => 0,
}

const mockDom: () => void =
	(): void => {
		globalWrapper.console = mockConsole as Console
		globalWrapper.document = mockDocument as Document
		globalWrapper.window = mockWindow as Window

		appState.dom.canvasContainer = createMockElement() as HTMLElement
		appState.dom.descriptionsContainer = createMockElement() as HTMLElement
		appState.dom.frameInput = createMockElement() as HTMLInputElement
		appState.dom.layersProgressBar = createMockElement() as HTMLElement
		appState.dom.pauseButton = createMockElement() as HTMLButtonElement
		appState.dom.playButton = createMockElement() as HTMLButtonElement
		appState.dom.progressBar = createMockElement() as HTMLElement
		appState.dom.progressMessage = createMockElement() as HTMLElement
		appState.dom.rewindButton = createMockElement() as HTMLButtonElement
		appState.dom.snapshotButton = createMockElement() as HTMLButtonElement
	}

export default mockDom
