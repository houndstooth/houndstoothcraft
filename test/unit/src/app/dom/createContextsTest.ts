import Spy = jasmine.Spy
import {
	appState,
	createContext,
	createContexts,
	NullarySideEffector,
	to,
} from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'


describe('create contexts', () => {
	let subject: NullarySideEffector
	let canvasContainer: HTMLElement
	let createContextSpy: Spy
	beforeEach(() => {
		subject = createContexts.default
		createContextSpy = spyOn(createContext, 'default')

		canvasContainer = buildMockElement() as HTMLElement
		canvasContainer.innerHTML = 'some old canvases'
		appState.dom.canvasContainer = canvasContainer
	})

	it('clears the canvas container contents', () => {
		subject()

		expect(canvasContainer.innerHTML).toBe('')
	})

	it('adds contexts to the app state for each layer', () => {
		appState.controls.endLayer = to.Layer(5)
		expect(appState.render.contexts.length).toBe(0)

		subject()

		expect(appState.render.contexts.length).toBe(6)
	})

	it('can reduce the count of contexts on the app state, and canvases on the dom', () => {
		appState.controls.endLayer = to.Layer(5)
		subject()

		expect(createContextSpy.calls.count()).toBe(6)
		expect(appState.render.contexts.length).toBe(6)

		appState.controls.endLayer = to.Layer(3)
		createContextSpy.calls.reset()

		subject()

		expect(createContextSpy.calls.count()).toBe(4)
		expect(appState.render.contexts.length).toBe(4)
	})
})
