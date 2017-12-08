import Spy = jasmine.Spy
import {
	appState,
	createContext,
	createContexts,
	documentWrapper,
	NullarySideEffector,
	HTMLElement,
	scaleCanvasContainer,
	to,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

const subject: NullarySideEffector = createContexts.default

describe('create contexts', () => {
	let canvasContainer: HTMLElement
	let createContextSpy: Spy
	let querySelectorSpy: Spy
	beforeEach(() => {
		createContextSpy = spyOn(createContext, 'default')

		canvasContainer = buildMockElement()
		canvasContainer.innerHTML = 'some old canvases'
		querySelectorSpy = spyOn(documentWrapper, 'querySelector').and.returnValue(canvasContainer)
	})

	it('clears the canvas container contents', () => {
		subject()

		expect(canvasContainer.innerHTML).toBe('')
	})

	it('adds contexts to the app state for each layer', () => {
		appState.controls.endLayer = to.Layer(5)
		expect(appState.canvas.contexts.length).toBe(0)

		subject()

		expect(appState.canvas.contexts.length).toBe(6)
	})

	it('can reduce the count of contexts on the app state, and canvases on the dom', () => {
		appState.controls.endLayer = to.Layer(5)
		subject()

		expect(createContextSpy.calls.count()).toBe(6)
		expect(appState.canvas.contexts.length).toBe(6)

		appState.controls.endLayer = to.Layer(3)
		createContextSpy.calls.reset()

		subject()

		expect(createContextSpy.calls.count()).toBe(4)
		expect(appState.canvas.contexts.length).toBe(4)
	})

	it('creates the canvas container if it does not already exist', () => {
		querySelectorSpy.and.returnValue(undefined)
		spyOn(scaleCanvasContainer, 'default').and.returnValue(canvasContainer)

		subject()

		expect(scaleCanvasContainer.default).toHaveBeenCalled()
	})
})
