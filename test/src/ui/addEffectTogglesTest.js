import addEffectToggles from '../../../src/ui/addEffectToggles'
import * as addEffectToggle from '../../../src/ui/addEffectToggle'

describe('add effect toggles', () => {
	it('adds an effect toggle for each effect', () => {
		const addEffectToggleSpy = spyOn(addEffectToggle, 'default')

		addEffectToggles([ 'effectOne', 'effectTwo' ])

		expect(addEffectToggleSpy.calls.all()[ 0 ].args[ 0 ]).toBe('effectOne')
		expect(addEffectToggleSpy.calls.all()[ 1 ].args[ 0 ]).toBe('effectTwo')
	})
})
