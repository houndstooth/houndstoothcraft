import { appState, asyncMaybeTile, executeGrid, grid } from '../../../../../../src/indexForTest'

describe('execute grid', () => {
	let subject: (_: { patternId: number }) => Promise<void>
	const patternId: number = 23457
	beforeEach(() => {
		subject = executeGrid.default
		spyOn(grid, 'default')
	})

	it('calls grid with the id of the current pattern', () => {
		subject({ patternId }).then().catch()

		expect(grid.default).toHaveBeenCalledWith({ gridTile: asyncMaybeTile.default, patternId })
	})

	// tslint:disable-next-line:max-line-length
	it('stores the resolve function of a promise on the store where it can be found to be resolved from elsewhere later', () => {
		const oldResolveGrid: () => void = appState.execute.resolveGrid

		subject({ patternId }).then().catch()

		expect(appState.execute.resolveGrid).not.toEqual(oldResolveGrid)
	})
})
