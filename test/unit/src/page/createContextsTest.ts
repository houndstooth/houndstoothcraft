import Spy = jasmine.Spy
import { PageElement } from '../../../../src/page'
import * as createContext from '../../../../src/page/createContext'
import { createContexts } from '../../../../src/page/createContexts'
import * as scaleCanvasContainer from '../../../../src/page/scaleCanvasContainer'
import { state } from '../../../../src/state'
import { setSetting } from '../../../../src/store/setSetting'
import * as to from '../../../../src/utilities/to'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create contexts', () => {
	let canvasContainer: PageElement
	let createContextSpy: Spy
	let querySelectorSpy: Spy
	beforeEach(() => {
		createContextSpy = spyOn(createContext, 'default')

		canvasContainer = buildMockElement()
		canvasContainer.innerHTML = 'some old canvases'
		querySelectorSpy = spyOn(window.document, 'querySelector').and.returnValue(canvasContainer)
	})

	it('clears the canvas container contents', () => {
		createContexts()

		expect(canvasContainer.innerHTML).toBe('')
	})

	it('adds contexts to the state for each layer', () => {
		setSetting('endLayer', to.Layer(5))
		expect(state.contexts.length).toBe(0)

		createContexts()

		expect(state.contexts.length).toBe(6)
	})

	it('can reduce the count of contexts in the state, and canvases on the page', () => {
		setSetting('endLayer', to.Layer(5))
		createContexts()

		expect(createContextSpy.calls.count()).toBe(6)
		expect(state.contexts.length).toBe(6)

		setSetting('endLayer', to.Layer(3))
		createContextSpy.calls.reset()

		createContexts()

		expect(createContextSpy.calls.count()).toBe(4)
		expect(state.contexts.length).toBe(4)
	})

	it('creates the canvas container if it does not already exist', () => {
		querySelectorSpy.and.returnValue(undefined)
		spyOn(scaleCanvasContainer, 'scaleCanvasContainer').and.returnValue(canvasContainer)

		createContexts()

		expect(scaleCanvasContainer.scaleCanvasContainer).toHaveBeenCalled()
	})
})
