import { availableEffects, NamedEffect } from '../../../src'

describe('available effects', () => {
	it('gets what you set', () => {
		expect(availableEffects.get()).toEqual([])

		const effects: NamedEffect[] = [ { name: 'some effect', description: '' } ]
		availableEffects.set(effects)

		expect(availableEffects.get()).toBe(effects)
	})
})
