import {
	appState,
	clearMixedDownContext,
	executePattern,
	overrideInputChangeHandler,
	updateOverrideLeafNode,
} from '../../../../../../src/indexForTest'

describe('override input change handler', () => {
	let subject: (_: Event) => void
	beforeEach(() => {
		subject = overrideInputChangeHandler.default

		spyOn(clearMixedDownContext, 'default')
		spyOn(executePattern, 'default')
		spyOn(updateOverrideLeafNode, 'default')

		// tslint:disable-next-line:no-any
		const event: any = { target: { parentNode: { id: 'basePattern-colorSettings-opacity' }, value: '0.3' } }

		// tslint:disable-next-line:no-unsafe-any
		subject(event)
	})

	it('updates the corresponding override', () => {
		if (appState.settings.overrides.basePattern && appState.settings.overrides.basePattern.colorSettings) {
			expect(appState.settings.overrides.basePattern.colorSettings.opacity).toBe(0.3)
		}
		else {
			fail()
		}
	})

	it('clears the mixed down canvas', () => {
		expect(clearMixedDownContext.default).toHaveBeenCalled()
	})

	it('executes the selected effect', () => {
		expect(executePattern.default).toHaveBeenCalled()
	})

	it('handles functions', () => {
		// tslint:disable-next-line:no-any
		const functionEvent: any = {
			target: {
				parentNode: {
					id: 'basePattern-colorSettings-opacity',

				},
				value: 'function (t) { return Math.random() * t > 10; }',
			},
		}

		// tslint:disable-next-line:no-unsafe-any
		subject(functionEvent)

		if (appState.settings.overrides.basePattern &&
			appState.settings.overrides.basePattern.colorSettings &&
			appState.settings.overrides.basePattern.colorSettings.opacity) {
			const actual: string = appState.settings.overrides.basePattern.colorSettings.opacity.toString()
			expect(actual).toBe('function (t) { return Math.random() * t > 10; }')
		}
		else {
			fail()
		}
	})

	it('handles garbage', () => {
		// tslint:disable-next-line:no-any
		const functionEvent: any = {
			target: {
				parentNode: {
					id: 'basePattern-colorSettings-opacity',
				},
				value: 'function (t) { return Math.random() * t > ',
			},
		}

		// tslint:disable-next-line:no-unsafe-any
		subject(functionEvent)

		if (appState.settings.overrides.basePattern && appState.settings.overrides.basePattern.colorSettings) {
			expect(appState.settings.overrides.basePattern.colorSettings.opacity).toBe(undefined)
		}
		else {
			fail()
		}
	})
})
