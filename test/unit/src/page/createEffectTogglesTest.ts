import * as createEffectToggle from '../../../../src/page/createEffectToggle'
import Spy = jasmine.Spy
import { createEffectToggles } from '../../../../src/page/createEffectToggles'
import { PageElement } from '../../../../src/page/types'
import { document } from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create effect toggles', () => {
	let createEffectToggleSpy: Spy
	const effectTogglesContainer: PageElement = buildMockElement()
	beforeEach(() => {
		createEffectToggleSpy = spyOn(createEffectToggle, 'createEffectToggle')
		spyOn(document, 'querySelector').and.returnValue(effectTogglesContainer)
	})

	it('adds an effect toggle for each effect', () => {
		createEffectToggles([ { name: 'effectOne' }, { name: 'effectTwo' } ])

		expect(createEffectToggleSpy.calls.all()[ 0 ].args[ 0 ]).toEqual({ name: 'effectOne' })
		expect(createEffectToggleSpy.calls.all()[ 1 ].args[ 0 ]).toEqual({ name: 'effectTwo' })
	})

	it('clears any existing toggles', () => {
		createEffectToggles([])

		expect(effectTogglesContainer.innerHTML).toBe('')
	})
})
