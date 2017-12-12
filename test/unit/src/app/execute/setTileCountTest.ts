import { appState, setTileCount } from '../../../../../src/indexForTest'

describe('set tile count', () => {
	it('sets on the app state the total count of tiles for the current grid', () => {
		const subject: (_: number) => void = setTileCount.default

		subject(98)

		expect(appState.execute.tileCount).toBe(98)
	})
})
