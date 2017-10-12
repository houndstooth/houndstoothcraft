declare const global: any

type Document = {
	createElement: Function,
	createTextNode: Function,
	querySelector: Function,
	body: { appendChild: Function },
}

const mockDocument: Document = {
	createElement: () => null,
	createTextNode: () => null,
	querySelector: () => null,
	body: {
		appendChild: () => null,
	},
}

type Window = {
	clearInterval: Function,
	setInterval: Function,
	URL: { createObjectURL: Function, revokeObjectURL: Function },
}

const mockWindow: Window = {
	clearInterval: () => null,
	setInterval: () => null,
	URL: {
		createObjectURL: () => null,
		revokeObjectURL: () => null,
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
