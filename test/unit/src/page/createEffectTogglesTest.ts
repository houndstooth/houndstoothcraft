import * as createEffectToggle from '../../../../src/page/createEffectToggle'
import Spy = jasmine.Spy
import { createEffectToggles } from '../../../../src/page/createEffectToggles'

describe('create effect toggles', () => {
	let createEffectToggleSpy: Spy
	beforeEach(() => createEffectToggleSpy = spyOn(createEffectToggle, 'createEffectToggle'))
	it('adds an effect toggle for each effect', () => {
		createEffectToggles([ { name: 'effectOne' }, { name: 'effectTwo' } ])

		expect(createEffectToggleSpy.calls.all()[ 0 ].args[ 0 ]).toEqual({ name: 'effectOne' })
		expect(createEffectToggleSpy.calls.all()[ 1 ].args[ 0 ]).toEqual({ name: 'effectTwo' })
	})
})
