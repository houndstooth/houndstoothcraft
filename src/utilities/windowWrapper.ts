declare const global: any

const mockDocument: {
	createElement: Function,
	createTextNode: Function,
	querySelector: Function,
	body: { appendChild: Function }
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
	URL: { createObjectURL: Function, revokeObjectURL: Function }
	} = {
		clearInterval: () => null,
		setInterval: () => null,
		URL: {
			createObjectURL: () => null,
			revokeObjectURL: () => null,
		},
	}

const _console = console

const _document = global.window ? document : mockDocument

const _window = global.window ? window : mockWindow

export {
	_console as console,
	_document as document,
	_window as window,
}

export default _window
