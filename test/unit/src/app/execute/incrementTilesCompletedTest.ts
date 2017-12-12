import { appState, incrementTilesCompleted, NullarySideEffector } from '../../../../../src/indexForTest'


describe('increment tiles completed', () => {
	it('increments the tiles of the current grid that have been completed, by 1', () => {
		const subject: NullarySideEffector = incrementTilesCompleted.default
		appState.execute.tilesCompleted = 98

		subject()

		expect(appState.execute.tilesCompleted).toBe(99)
	})
})
