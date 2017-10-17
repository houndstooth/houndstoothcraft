import * as addEffectToggle from '../../../../src/ui/addEffectToggle'
import maybeAddEffectToggles from '../../../../src/ui/maybeAddEffectToggles'
import * as window from '../../../../src/utilities/windowWrapper'

describe('add effect toggles', () => {
	let addEffectToggleSpy
	beforeEach(() => addEffectToggleSpy = spyOn(addEffectToggle, 'default'))
	it('adds an effect toggle for each effect', () => {
		maybeAddEffectToggles([ { name: 'effectOne' }, { name: 'effectTwo' } ])

		expect(addEffectToggleSpy.calls.all()[ 0 ].args[ 0 ]).toEqual({ name: 'effectOne' })
		expect(addEffectToggleSpy.calls.all()[ 1 ].args[ 0 ]).toEqual({ name: 'effectTwo' })
	})

	it('does not add the effects if the container is already on the page', () => {
		spyOn(window.document, 'querySelector').and.returnValue({})

		maybeAddEffectToggles([ { name: 'effectOne' }, { name: 'effectTwo' } ])

		expect(addEffectToggleSpy).not.toHaveBeenCalled()
	})
})
