import { appState, incrementTilesCompleted } from '../../../../../src/indexForTest'

describe('increment tiles completed', () => {
	it('increments the tiles of the current grid that have been completed, by 1', () => {
		const subject: () => void = incrementTilesCompleted.default
		appState.execute.tilesCompleted = 98

		subject()

		expect(appState.execute.tilesCompleted).toBe(99)
	})
})
