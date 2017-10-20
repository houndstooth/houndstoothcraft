import * as createContext from '../../../../src/page/createContext'
import { createContexts } from '../../../../src/page/createContexts'
import { state } from '../../../../src/state'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create contexts', () => {
	let canvasContainer
	let createContextSpy
	beforeEach(() => {
		createContextSpy = spyOn(createContext, 'default')

		canvasContainer = buildMockElement()
		canvasContainer.innerHTML = 'some old canvases'
		spyOn(window.document, 'querySelector').and.returnValue(canvasContainer)
	})

	it('clears the canvas container contents', () => {
		createContexts()

		expect(canvasContainer.innerHTML).toBe('')
	})

	it('adds contexts to the state for each layer', () => {
		state.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }
		expect(state.contexts.length).toBe(0)

		createContexts()

		expect(state.contexts.length).toBe(6)
	})

	it('can reduce the count of contexts in the state, and canvases on the page', () => {
		state.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }
		createContexts()

		expect(createContextSpy.calls.count()).toBe(6)
		expect(state.contexts.length).toBe(6)

		state.mainHoundstooth.basePattern.layerSettings = { endLayer: 3 }
		createContextSpy.calls.reset()

		createContexts()

		expect(createContextSpy.calls.count()).toBe(4)
		expect(state.contexts.length).toBe(4)
	})
})
