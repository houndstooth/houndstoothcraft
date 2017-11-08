// tslint:disable:no-any no-unsafe-any

import { noop } from './noop'

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
	clearInterval: (p?: any, q?: any) => any,
	setInterval: (p?: any, q?: any) => any,
	setTimeout: (p?: any, q?: any) => any,
	URL: { createObjectURL: (p?: any, q?: any) => any, revokeObjectURL: (p?: any, q?: any) => any },
}

const mockWindow: Window = {
	URL: {
		createObjectURL: noop,
		revokeObjectURL: noop,
	},
	clearInterval: noop,
	setInterval: noop,
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
