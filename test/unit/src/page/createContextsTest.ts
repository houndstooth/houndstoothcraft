import * as createContext from '../../../../src/page/createContext'
import { createContexts } from '../../../../src/page/createContexts'
import { state } from '../../../../src/state'
import { getSetting } from '../../../../src/store/getSetting'
import { LayerSettings } from '../../../../src/store/types/settings/LayerSettings'
import * as to from '../../../../src/to'
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
		const layerSettings: LayerSettings = getSetting('layer')
		layerSettings.endLayer = to.Layer(5)
		expect(state.contexts.length).toBe(0)

		createContexts()

		expect(state.contexts.length).toBe(6)
	})

	it('can reduce the count of contexts in the state, and canvases on the page', () => {
		const layerSettings: LayerSettings = getSetting('layer')
		layerSettings.endLayer = to.Layer(5)
		createContexts()

		expect(createContextSpy.calls.count()).toBe(6)
		expect(state.contexts.length).toBe(6)

		layerSettings.endLayer = to.Layer(3)
		createContextSpy.calls.reset()

		createContexts()

		expect(createContextSpy.calls.count()).toBe(4)
		expect(state.contexts.length).toBe(4)
	})
})
