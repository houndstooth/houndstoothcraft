import Spy = jasmine.Spy
import { PageElement } from '../../../../../src/app/page'
import * as createContext from '../../../../../src/app/page/createContext'
import { createContexts } from '../../../../../src/app/page/createContexts'
import * as scaleCanvasContainer from '../../../../../src/app/page/scaleCanvasContainer'
import { setSetting } from '../../../../../src/app/store/setSetting'
import { state } from '../../../../../src/state'
import * as to from '../../../../../src/to'
import * as windowWrapper from '../../../../../src/utilities'
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('create contexts', () => {
	let canvasContainer: PageElement
	let createContextSpy: Spy
	let querySelectorSpy: Spy
	beforeEach(() => {
		createContextSpy = spyOn(createContext, 'default')

		canvasContainer = buildMockElement()
		canvasContainer.innerHTML = 'some old canvases'
		querySelectorSpy = spyOn(windowWrapper.documentWrapper, 'querySelector').and.returnValue(canvasContainer)
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
