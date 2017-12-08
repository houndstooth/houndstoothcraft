// tslint:disable:no-any

import { appState, globalWrapper, noop, NullarySideEffector } from '../../../src'
import buildMockElement from './buildMockElement'

interface MockDocument {
	body: {
		appendChild?: any,
	},
	createElement: (tagName: string) => HTMLElement,
	createTextNode?: any,
	querySelector?: any,
}

const mockDocument: MockDocument = {
	body: {
		appendChild: noop.default,
	},
	createElement: (_: string): HTMLElement => buildMockElement() as HTMLElement,
	createTextNode: noop.default,
	querySelector: noop.default,
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
		globalWrapper.window = mockWindow as Window
		globalWrapper.document = mockDocument as Document

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
