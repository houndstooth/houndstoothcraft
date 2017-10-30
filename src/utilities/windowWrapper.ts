// tslint:disable:no-any no-unsafe-any

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
		appendChild: (): void => undefined,
	},
	createElement: (): void => undefined,
	createTextNode: (): void => undefined,
	querySelector: (): void => undefined,
}

interface Window {
	clearInterval: (p?: any, q?: any) => any,
	setInterval: (p?: any, q?: any) => any,
	URL: { createObjectURL: (p?: any, q?: any) => any, revokeObjectURL: (p?: any, q?: any) => any },
}

const mockWindow: Window = {
	URL: {
		createObjectURL: (): void => undefined,
		revokeObjectURL: (): void => undefined,
	},
	clearInterval: (): void => undefined,
	setInterval: (): void => undefined,
}

const consoleWrapper: any = console

const documentWrapper: any = global.window ? document : mockDocument

const windowWrapper: any = global.window ? window : mockWindow

export {
	consoleWrapper as console,
	documentWrapper as document,
	windowWrapper as window,
}

export { windowWrapper }
