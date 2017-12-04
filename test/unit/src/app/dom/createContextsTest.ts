import Spy = jasmine.Spy
import {
	createContext,
	createContexts,
	documentWrapper,
	PageElement,
	scaleCanvasContainer,
	setSetting,
	state,
	to,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('create contexts', () => {
	let canvasContainer: PageElement
	let createContextSpy: Spy
	let querySelectorSpy: Spy
	beforeEach(() => {
		createContextSpy = spyOn(createContext, 'default')

		canvasContainer = buildMockElement()
		canvasContainer.innerHTML = 'some old canvases'
		querySelectorSpy = spyOn(documentWrapper, 'querySelector').and.returnValue(canvasContainer)
	})

	it('clears the canvas container contents', () => {
		createContexts.default()

		expect(canvasContainer.innerHTML).toBe('')
	})

	it('adds contexts to the state for each layer', () => {
		setSetting.default('endLayer', to.Layer(5))
		expect(state.canvas.contexts.length).toBe(0)

		createContexts.default()

		expect(state.canvas.contexts.length).toBe(6)
	})

	it('can reduce the count of contexts in the state, and canvases on the dom', () => {
		setSetting.default('endLayer', to.Layer(5))
		createContexts.default()

		expect(createContextSpy.calls.count()).toBe(6)
		expect(state.canvas.contexts.length).toBe(6)

		setSetting.default('endLayer', to.Layer(3))
		createContextSpy.calls.reset()

		createContexts.default()

		expect(createContextSpy.calls.count()).toBe(4)
		expect(state.canvas.contexts.length).toBe(4)
	})

	it('creates the canvas container if it does not already exist', () => {
		querySelectorSpy.and.returnValue(undefined)
		spyOn(scaleCanvasContainer, 'default').and.returnValue(canvasContainer)

		createContexts.default()

		expect(scaleCanvasContainer.default).toHaveBeenCalled()
	})
})
