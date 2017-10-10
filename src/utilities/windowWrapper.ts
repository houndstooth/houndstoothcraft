declare const global: any

const mockDocument: {
	createElement: Function,
	createTextNode: Function,
	querySelector: Function,
	body: { appendChild: Function },
	} = {
		createElement: () => null,
		createTextNode: () => null,
		querySelector: () => null,
		body: {
			appendChild: () => null,
		},
	}

const mockWindow: {
	clearInterval: Function,
	setInterval: Function,
	URL: { createObjectURL: Function, revokeObjectURL: Function },
	} = {
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
