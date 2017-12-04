import { composeMainHoundstooth, Effect, NullarySideEffector, resetSettings, state } from '../../../../../src'

const subject: NullarySideEffector = resetSettings.default

describe('reset state', () => {
	it('increments the pattern ref', () => {
		state.patternRef = 4

		subject()

		expect(state.patternRef).toEqual(5)
	})

	it('returns the main houndstooth to its original state', () => {
		const houndstoothOverrides: Effect = {
			basePattern: { colorSettings: { opacity: 0 }}
		}
		composeMainHoundstooth.default({ houndstoothOverrides })
		// tslint:disable-next-line:max-line-length
		expect(state.mainHoundstooth.basePattern.colorSettings && state.mainHoundstooth.basePattern.colorSettings.opacity).toBe(0)

		subject()

		// tslint:disable-next-line:max-line-length
		expect(state.mainHoundstooth.basePattern.colorSettings && state.mainHoundstooth.basePattern.colorSettings.opacity).toBe(1)
	})
})
