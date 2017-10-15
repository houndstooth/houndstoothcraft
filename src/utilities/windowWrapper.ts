declare const global: any

type Document = {
	createElement: { (p?: any, q?: any): any },
	createTextNode: { (p?: any, q?: any): any },
	querySelector: { (p?: any, q?: any): any },
	body: { appendChild?: { (p?: any, q?: any): any } },
}

const mockDocument: Document = {
	createElement: () => undefined,
	createTextNode: () => undefined,
	querySelector: () => undefined,
	body: {
		appendChild: () => undefined,
	},
}

type Window = {
	clearInterval: { (p?: any, q?: any): any },
	setInterval: { (p?: any, q?: any): any },
	URL: { createObjectURL: { (p?: any, q?: any): any }, revokeObjectURL: { (p?: any, q?: any): any } },
}

const mockWindow: Window = {
	clearInterval: () => undefined,
	setInterval: () => undefined,
	URL: {
		createObjectURL: () => undefined,
		revokeObjectURL: () => undefined,
	},
}

const consoleDummy = console

const documentDummy = global.window ? document : mockDocument

const windowDummy = global.window ? window : mockWindow

export {
	consoleDummy as console,
	documentDummy as document,
	windowDummy as window,
}

export default windowDummy
