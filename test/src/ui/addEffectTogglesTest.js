import addEffectToggles from '../../../src/ui/addEffectToggles'
import * as addEffectToggle from '../../../src/ui/addEffectToggle'

describe('add effect toggles', () => {
	it('adds an effect toggle for each effect', () => {
		spyOn(addEffectToggle, 'default')

		addEffectToggles([ 'effectOne', 'effectTwo' ])

		expect(addEffectToggle.default.calls.all()[ 0 ].args[ 0 ]).toBe('effectOne')
		expect(addEffectToggle.default.calls.all()[ 1 ].args[ 0 ]).toBe('effectTwo')
	})
})
