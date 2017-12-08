import { appState, setTileCount } from '../../../../../src'

const subject: (_: number) => void = setTileCount.default

describe('set tile count', () => {
	it('sets on the app state the total count of tiles for the current grid', () => {
		subject(98)

		expect(appState.execute.tileCount).toBe(98)
	})
})
