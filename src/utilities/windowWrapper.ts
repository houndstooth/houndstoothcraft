declare const global: any

type Document = {
	createElement: Function,
	createTextNode: Function,
	querySelector: Function,
	body: { appendChild: Function },
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
	clearInterval: Function,
	setInterval: Function,
	URL: { createObjectURL: Function, revokeObjectURL: Function },
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
