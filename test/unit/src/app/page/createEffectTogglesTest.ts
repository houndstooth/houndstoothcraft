import { createEffectToggle, createEffectToggles, documentWrapper, PageElement } from '../../../../../src'
import Spy = jasmine.Spy
import { buildMockElement } from '../../../helpers'

describe('create effect toggles', () => {
	let createEffectToggleSpy: Spy
	const effectTogglesContainer: PageElement = buildMockElement()
	beforeEach(() => {
		createEffectToggleSpy = spyOn(createEffectToggle, 'main')
		spyOn(documentWrapper, 'querySelector').and.returnValue(effectTogglesContainer)
	})

	it('adds an effect toggle for each effect', () => {
		createEffectToggles.main([ { name: 'effectOne' }, { name: 'effectTwo' } ])

		expect(createEffectToggleSpy.calls.all()[ 0 ].args[ 0 ]).toEqual({ name: 'effectOne' })
		expect(createEffectToggleSpy.calls.all()[ 1 ].args[ 0 ]).toEqual({ name: 'effectTwo' })
	})

	it('clears any existing toggles', () => {
		createEffectToggles.main([])

		expect(effectTogglesContainer.innerHTML).toBe('')
	})
})
