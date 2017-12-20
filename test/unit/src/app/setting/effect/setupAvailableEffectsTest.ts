import { appState, NamedEffect, setupAvailableEffects } from '../../../../../../src/indexForTest'

describe('setup available effect', () => {
	it('creates an object with keys to each effect by their kebab-cased names', () => {
		const subject: (_: NamedEffect[]) => void = setupAvailableEffects.default
		const allEffects: NamedEffect[] = [ { name: 'mock effect', description: '' } ]

		subject(allEffects)

		expect(appState.settings.availableEffects).toEqual({
			'mock-effect': { name: 'mock effect', description: '' },
		})
	})
})
