import { createEffectToggle, createEffectToggles, documentWrapper, PageElement } from '../../../../../src'
import Spy = jasmine.Spy
import { buildMockElement } from '../../../helpers'

describe('create effect toggles', () => {
	let createEffectToggleSpy: Spy
	const children: PageElement[] = []
	const effectTogglesContainer: PageElement = buildMockElement({ children })
	const attributeObject: { id: string } = { id: '' }
	const moreEffectsMessage: PageElement = buildMockElement({ attributeObject })
	beforeEach(() => {
		createEffectToggleSpy = spyOn(createEffectToggle, 'default')
		spyOn(documentWrapper, 'querySelector').and.returnValue(effectTogglesContainer)
		spyOn(documentWrapper, 'createElement').and.returnValue(moreEffectsMessage)
	})

	it('adds an effect toggle for each effect', () => {
		createEffectToggles.default([
			{ name: 'effectOne', description: '' },
			{ name: 'effectTwo', description: '' },
		])

		// tslint:disable-next-line:no-unsafe-any
		expect(createEffectToggleSpy.calls.all()[ 0 ].args[ 0 ].name).toBe('effectOne')
		// tslint:disable-next-line:no-unsafe-any
		expect(createEffectToggleSpy.calls.all()[ 1 ].args[ 0 ].name).toBe('effectTwo')
	})

	it('clears any existing toggles', () => {
		createEffectToggles.default([])

		expect(effectTogglesContainer.innerHTML).toBe('')
	})

	it('adds a message about more effects coming soon', () => {
		createEffectToggles.default([])

		expect(children[0]).toBe(moreEffectsMessage)
	})

	it('adds an id to that message so that it can be styled', () => {
		createEffectToggles.default([])

		expect(attributeObject.id).toBe('more-effects-soon-message')
	})
})
