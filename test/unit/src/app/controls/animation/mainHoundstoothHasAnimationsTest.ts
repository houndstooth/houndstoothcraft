import {
	appState,
	composeMainHoundstooth,
	mainHoundstoothHasAnimations,
	to,
	Unit,
} from '../../../../../../src/indexForTest'

describe('main houndstooth has animations', () => {
	let subject: () => boolean
	beforeEach(() => {
		subject = mainHoundstoothHasAnimations.default
	})

	it('is true if the animations pattern of the main houndstooth has any keys', () => {
		appState.settings.overrides = { animationsPattern: { tileSettings: { tileSize: (): Unit => to.Unit(0) } } }
		composeMainHoundstooth.default()

		expect(subject()).toBe(true)
	})

	it('is false by default', () => {
		expect(subject()).toBe(false)
	})
})
