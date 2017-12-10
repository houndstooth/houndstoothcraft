// tslint:disable:no-any

import { appState, globalWrapper, NullarySideEffector } from '../../../src'
import buildMockElement from './buildMockElement'
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
	exception: noop,
	error: noop,
	group: noop,
	groupCollapsed: noop,
	groupEnd: noop,
	info: noop,
	log: noop,
	msIsIndependentlyComposed: noop,
	profile: noop,
	profileEnd: noop,
	select: noop,
	table: noop,
	time: noop,
	timeEnd: noop,
	trace: noop,
	warn: noop,
}

const mockDocument: MockDocument = {
	body: {
		appendChild: noop,
	},
	createElement: (_: string): HTMLElement => buildMockElement() as HTMLElement,
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

const mockDom: NullarySideEffector =
	(): void => {
		globalWrapper.console = mockConsole as Console
		globalWrapper.document = mockDocument as Document
		globalWrapper.window = mockWindow as Window

		appState.dom.descriptionsContainer = buildMockElement() as HTMLElement
		appState.dom.frameInput = buildMockElement() as HTMLInputElement
		appState.dom.layersProgressBar = buildMockElement() as HTMLElement
		appState.dom.pauseButton = buildMockElement() as HTMLButtonElement
		appState.dom.playButton = buildMockElement() as HTMLButtonElement
		appState.dom.progressBar = buildMockElement() as HTMLElement
		appState.dom.progressMessage = buildMockElement() as HTMLElement
		appState.dom.rewindButton = buildMockElement() as HTMLButtonElement
		appState.dom.snapshotButton = buildMockElement() as HTMLButtonElement
	}

export default mockDom
