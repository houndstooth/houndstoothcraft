// tslint:disable:no-any no-unsafe-any

import noop from './noop'
import { NullarySideEffector } from './types'

declare const global: any

interface Document {
	body: {
		appendChild?: any,
	},
	createElement?: any,
	createTextNode?: any,
	querySelector?: any,
}

const mockDocument: Document = {
	body: {
		appendChild: noop,
	},
	createElement: noop,
	createTextNode: noop,
	querySelector: noop,
}

interface Window {
	clearInterval: (intervalId: number) => void,
	setInterval: (fn: any, interval: number) => number,
	setTimeout: (fn: any, timeout: number) => any,
	URL: { createObjectURL: (p?: any, q?: any) => any, revokeObjectURL: (p?: any, q?: any) => any },
}

const mockWindow: Window = {
	URL: {
		createObjectURL: noop,
		revokeObjectURL: noop,
	},
	clearInterval: noop,
	setInterval: () => 0,
	setTimeout: noop,
}

const consoleWrapper: any = console

/* istanbul ignore next */
const documentWrapper: any = global.window ? document : mockDocument

/* istanbul ignore next */
const windowWrapper: any = global.window ? window : mockWindow

export {
	consoleWrapper,
	documentWrapper,
	windowWrapper,
}
