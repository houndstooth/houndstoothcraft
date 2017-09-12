import addEffectToggles from '../../../src/ui/addEffectToggles'

describe('add effect toggles', () => {
	it('adds an effect toggle for each effect', () => {
		const addEffectToggleSpy = jasmine.createSpy()
		addEffectToggles.__Rewire__('addEffectToggle', addEffectToggleSpy)

		addEffectToggles([ 'effectOne', 'effectTwo' ])

		expect(addEffectToggleSpy.calls.all()[ 0 ].args[ 0 ]).toBe('effectOne')
		expect(addEffectToggleSpy.calls.all()[ 1 ].args[ 0 ]).toBe('effectTwo')
	})
})
