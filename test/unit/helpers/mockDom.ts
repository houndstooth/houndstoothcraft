// tslint:disable:no-any

import { appState, globalWrapper, noop, NullarySideEffector } from '../../../src'
import buildMockElement from './buildMockElement'
import { MockConsole, MockDocument, MockWindow } from './types'

const mockConsole: MockConsole = {
	assert: noop.default,
	clear: noop.default,
	console: noop.default,
	count: noop.default,
	debug: noop.default,
	dir: noop.default,
	dirxml: noop.default,
	exception: noop.default,
	error: noop.default,
	group: noop.default,
	groupCollapsed: noop.default,
	groupEnd: noop.default,
	info: noop.default,
	log: noop.default,
	msIsIndependentlyComposed: noop.default,
	profile: noop.default,
	profileEnd: noop.default,
	select: noop.default,
	table: noop.default,
	time: noop.default,
	timeEnd: noop.default,
	trace: noop.default,
	warn: noop.default,
}

const mockDocument: MockDocument = {
	body: {
		appendChild: noop.default,
	},
	createElement: (_: string): HTMLElement => buildMockElement() as HTMLElement,
	createTextNode: noop.default,
	querySelector: noop.default,
}

const mockWindow: MockWindow = {
	URL: {
		createObjectURL: (): string => '',
		revokeObjectURL: noop.default,
	},
	clearInterval: noop.default,
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
