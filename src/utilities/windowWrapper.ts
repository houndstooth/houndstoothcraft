// tslint:disable:no-any

declare const global: any

interface Document {
	body: { appendChild: (p?: any, q?: any) => any },
	createElement: (p?: any, q?: any) => any,
	createTextNode: (p?: any, q?: any) => any,
	querySelector: (p?: any, q?: any) => any,
}

const mockDocument: Document = {
	body: {
		appendChild: () => undefined,
	},
	createElement: () => undefined,
	createTextNode: () => undefined,
	querySelector: () => undefined,
}

interface Window {
	clearInterval: (p?: any, q?: any) => any,
	setInterval: (p?: any, q?: any) => any,
	URL: { createObjectURL: (p?: any, q?: any) => any, revokeObjectURL: (p?: any, q?: any) => any },
}

const mockWindow: Window = {
	URL: {
		createObjectURL: () => undefined,
		revokeObjectURL: () => undefined,
	},
	clearInterval: () => undefined,
	setInterval: () => undefined,
}

const consoleWrapper = console

const documentWrapper = global.window ? document : mockDocument

const windowWrapper = global.window ? window : mockWindow

export {
	consoleWrapper as console,
	documentWrapper as document,
	windowWrapper as window,
}

export { windowWrapper }
