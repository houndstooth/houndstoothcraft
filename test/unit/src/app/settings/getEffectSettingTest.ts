import { Effect, getEffectSetting, GetEffectSetting, SettingPath, to } from '../../../../../src/indexForTest'

describe('get effect setting', () => {
	let subject: GetEffectSetting
	let concatenatedFullSettingPath: SettingPath
	let actualValue: number | undefined
	let effect: Effect
	beforeEach(() => {
		concatenatedFullSettingPath = to.SettingPath([ 'basePattern', 'gridSettings', 'tileResolution' ])
		subject = getEffectSetting.default
	})

	describe('given a concatenated full setting path and an effect with a value on that path', () => {
		beforeEach(() => {
			effect = { basePattern: { gridSettings: { tileResolution: 44 } } }

			actualValue = subject({ concatenatedFullSettingPath, effect }) as number
		})

		it('returns the value', () => {
			expect(actualValue).toBe(44)
		})

		it('does not modify the effect', () => {
			expect(effect).toEqual({ basePattern: { gridSettings: { tileResolution: 44 } } })
		})
	})

	describe('given a concatenated full setting path and an effect with no value on that path', () => {
		beforeEach(() => {
			effect = { basePattern: { gridSettings: { } } }

			actualValue = subject({ concatenatedFullSettingPath, effect }) as undefined
		})

		it(', returns undefined', () => {
			expect(actualValue).toBe(undefined)
		})

		it('does not modify the effect', () => {
			expect(effect).toEqual({ basePattern: { gridSettings: { } } })

		})
	})
})
