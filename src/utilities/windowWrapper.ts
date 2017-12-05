// tslint:disable:no-any no-unsafe-any

import { buildMockElement } from '../../test'
import { PageElement } from '../app'
import noop from './noop'

declare const global: any

interface MockDocument {
	body: {
		appendChild?: any,
	},
	createElement: (tagName: string) => PageElement,
	createTextNode?: any,
	querySelector?: any,
}

/* istanbul ignore next */
const mockDocument: MockDocument = {
	body: {
		appendChild: noop,
	},
	createElement: (_: string): PageElement => buildMockElement(),
	createTextNode: noop,
	querySelector: noop,
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

/* istanbul ignore next */
const mockWindow: MockWindow = {
	URL: {
		createObjectURL: (): string => '',
		revokeObjectURL: noop,
	},
	clearInterval: noop,
	setInterval: (): number => 0,
	setTimeout: (): number => 0,
}

const consoleWrapper: Console = console

/* istanbul ignore next */
const documentWrapper: Document | MockDocument = global.window ? document : mockDocument

/* istanbul ignore next */
const windowWrapper: Window | MockWindow = global.window ? window : mockWindow

export {
	consoleWrapper,
	documentWrapper,
	windowWrapper,
}
