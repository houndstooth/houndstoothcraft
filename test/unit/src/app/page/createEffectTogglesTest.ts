import * as createEffectToggle from '../../../../../src/app/page/createEffectToggle'
import Spy = jasmine.Spy
import { createEffectToggles } from '../../../../../src/app/page/createEffectToggles'
import { PageElement } from '../../../../../src/app/page/types'
import { documentWrapper } from '../../../../../src/utilities'
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('create effect toggles', () => {
	let createEffectToggleSpy: Spy
	const effectTogglesContainer: PageElement = buildMockElement()
	beforeEach(() => {
		createEffectToggleSpy = spyOn(createEffectToggle, 'createEffectToggle')
		spyOn(documentWrapper, 'querySelector').and.returnValue(effectTogglesContainer)
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
