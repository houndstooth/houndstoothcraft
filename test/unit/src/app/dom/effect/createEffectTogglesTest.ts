import { appState } from '../../../../../../src/app/appState'
import { createEffectToggle, createEffectToggles, globalWrapper, NamedEffect } from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy
import { buildMockElement } from '../../../../helpers'

describe('create effect toggles', () => {
	let subject: (_: NamedEffect[]) => void
	let createEffectToggleSpy: Spy
	let effectTogglesContainer: HTMLElement
	let moreEffectsMessage: HTMLElement
	const children: HTMLElement[] = []
	const attributeObject: { id: string } = { id: '' }

	beforeAll(() => {
		effectTogglesContainer = buildMockElement({ children }) as HTMLElement
		moreEffectsMessage = buildMockElement({ attributeObject }) as HTMLElement
	})

	beforeEach(() => {
		subject = createEffectToggles.default

		createEffectToggleSpy = spyOn(createEffectToggle, 'default')
		appState.dom.effectTogglesContainer = effectTogglesContainer
		spyOn(globalWrapper.document, 'createElement').and.returnValue(moreEffectsMessage)
	})

	it('adds an effect toggle for each effect', () => {
		subject([
			{ name: 'effectOne', description: '' },
			{ name: 'effectTwo', description: '' },
		])

		// tslint:disable-next-line:no-unsafe-any
		expect(createEffectToggleSpy.calls.all()[ 0 ].args[ 0 ].name).toBe('effectOne')
		// tslint:disable-next-line:no-unsafe-any
		expect(createEffectToggleSpy.calls.all()[ 1 ].args[ 0 ].name).toBe('effectTwo')
	})

	it('adds a message about more effect coming soon', () => {
		subject([])

		expect(children[0]).toBe(moreEffectsMessage)
	})

	it('adds an id to that message so that it can be styled', () => {
		subject([])

		expect(attributeObject.id).toBe('more-effect-soon-message')
	})
})
