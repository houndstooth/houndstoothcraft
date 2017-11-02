import * as createEffectToggle from '../../../../src/page/createEffectToggle'
import { maybeCreateEffectToggles } from '../../../../src/page/maybeCreateEffectToggles'
import * as window from '../../../../src/utilities/windowWrapper'
import Spy = jasmine.Spy

describe('maybe create effect toggles', () => {
	let createEffectToggleSpy: Spy
	beforeEach(() => createEffectToggleSpy = spyOn(createEffectToggle, 'createEffectToggle'))
	it('adds an effect toggle for each effect', () => {
		maybeCreateEffectToggles([ { name: 'effectOne' }, { name: 'effectTwo' } ])

		expect(createEffectToggleSpy.calls.all()[ 0 ].args[ 0 ]).toEqual({ name: 'effectOne' })
		expect(createEffectToggleSpy.calls.all()[ 1 ].args[ 0 ]).toEqual({ name: 'effectTwo' })
	})

	it('does not add the effects if the container is already on the page', () => {
		spyOn(window.document, 'querySelector').and.returnValue({})

		maybeCreateEffectToggles([ { name: 'effectOne' }, { name: 'effectTwo' } ])

		expect(createEffectToggleSpy).not.toHaveBeenCalled()
	})
})
