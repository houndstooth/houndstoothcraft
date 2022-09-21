import {
	applyViewForGrid,
	appState,
	executeTile,
	getAddresses,
	grid,
	PatternIdAsParam,
	to,
} from '../../../../../../src/indexForTest'

describe('grid', () => {
	let subject: (_: PatternIdAsParam) => void
	const patternId: number = 294587
	beforeEach(() => {
		subject = grid.default

		spyOn(getAddresses, 'default').and.returnValue([
			[
				to.Address([ 0, 0 ]),
				to.Address([ 0, 1 ]),
			],
			[
				to.Address([ 1, 0 ]),
				to.Address([ 1, 1 ]),
			],
		])
		spyOn(executeTile.wrapper, 'executeTile')
		spyOn(applyViewForGrid, 'default')

		subject({ patternId })
	})

	it('applies view for the grid', () => {
		expect(applyViewForGrid.default).toHaveBeenCalled()
	})

	it('sets the tile count to the total number of addresses', () => {
		expect(appState.execute.tileCount).toBe(4)
	})

	it('executes a tile for each address', () => {
		expect(executeTile.wrapper.executeTile).toHaveBeenCalledWith({ address: to.Address([ 0, 0 ]), patternId })
		expect(executeTile.wrapper.executeTile).toHaveBeenCalledWith({ address: to.Address([ 1, 0 ]), patternId })
		expect(executeTile.wrapper.executeTile).toHaveBeenCalledWith({ address: to.Address([ 0, 1 ]), patternId })
		expect(executeTile.wrapper.executeTile).toHaveBeenCalledWith({ address: to.Address([ 1, 1 ]), patternId })
	})
})
