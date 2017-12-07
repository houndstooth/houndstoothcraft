// tslint:disable:no-any no-unsafe-any

import { buildMockElement } from '../../../test'
import { noop } from '../../utilities'
import { PageElement } from './types'

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
		appendChild: noop.default,
	},
	createElement: (_: string): PageElement => buildMockElement(),
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

/* istanbul ignore next */
const mockWindow: MockWindow = {
	URL: {
		createObjectURL: (): string => '',
		revokeObjectURL: noop.default,
	},
	clearInterval: noop.default,
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
