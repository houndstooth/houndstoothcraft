// tslint:disable:no-unsafe-any

import Spy = jasmine.Spy
import { applyViewForGrid, appState, grid, ReferencedGridAddress } from '../../../../../src'
import { setPatternStateForTest } from '../../../helpers'

const subject: (_: { gridTile: (_: ReferencedGridAddress) => void, thisPatternRef: number }) => void = grid.default

describe('grid', () => {
	let gridTileSpy: Spy
	const tileResolution: number = 2
	const thisPatternRef: number = 99
	beforeEach(() => {
		setPatternStateForTest('tileResolution', tileResolution)
		gridTileSpy = jasmine.createSpy('gridTile')
		spyOn(applyViewForGrid, 'default')
	})

	it('applies view for the grid', () => {
		subject({ gridTile: gridTileSpy, thisPatternRef })

		expect(applyViewForGrid.default).toHaveBeenCalled()
	})

	it('uses the given grid size', () => {
		subject({ gridTile: gridTileSpy, thisPatternRef })

		expect(gridTileSpy.calls.all().length).toBe(Math.pow(tileResolution, 2))
	})

	describe('when negative quadrants are excluded', () => {
		beforeEach(() => {
			setPatternStateForTest('includeNegativeQuadrants', false)
		})

		it('only makes tiles with positive addresses', () => {
			subject({ gridTile: gridTileSpy, thisPatternRef })

			expect(gridTileSpy.calls.count()).toEqual(Math.pow(tileResolution, 2))
			expect(gridTileSpy.calls.all()[ 0 ].args[ 0 ].gridAddress).toEqual([ 0, 0 ])
			expect(gridTileSpy.calls.all()[ 1 ].args[ 0 ].gridAddress).toEqual([ 0, 1 ])
			expect(gridTileSpy.calls.all()[ 2 ].args[ 0 ].gridAddress).toEqual([ 1, 0 ])
			expect(gridTileSpy.calls.all()[ 3 ].args[ 0 ].gridAddress).toEqual([ 1, 1 ])
		})

		it('sets the tile count on the app state correctly', () => {
			appState.execute.tileCount = 0

			subject({ gridTile: gridTileSpy, thisPatternRef })

			expect(appState.execute.tileCount).toBe(Math.pow(tileResolution, 2))
		})
	})

	describe('when negative quadrants are included', () => {
		beforeEach(() => {
			setPatternStateForTest('includeNegativeQuadrants', true)
		})

		// tslint:disable-next-line:max-line-length
		it('makes tiles with positive and negative addresses, the negative ones starting at -1 (whereas the positive ones start at 0)', () => {
			const quadrantCount: number = 4

			subject({ gridTile: gridTileSpy, thisPatternRef })

			expect(gridTileSpy.calls.count()).toEqual(Math.pow(tileResolution, 2) * quadrantCount)
			expect(gridTileSpy.calls.all()[ 0 ].args[ 0 ].gridAddress).toEqual([ -2, -2 ])
			expect(gridTileSpy.calls.all()[ 1 ].args[ 0 ].gridAddress).toEqual([ -2, -1 ])
			expect(gridTileSpy.calls.all()[ 2 ].args[ 0 ].gridAddress).toEqual([ -2, 0 ])
			expect(gridTileSpy.calls.all()[ 3 ].args[ 0 ].gridAddress).toEqual([ -2, 1 ])
			expect(gridTileSpy.calls.all()[ 4 ].args[ 0 ].gridAddress).toEqual([ -1, -2 ])
			expect(gridTileSpy.calls.all()[ 5 ].args[ 0 ].gridAddress).toEqual([ -1, -1 ])
			expect(gridTileSpy.calls.all()[ 6 ].args[ 0 ].gridAddress).toEqual([ -1, 0 ])
			expect(gridTileSpy.calls.all()[ 7 ].args[ 0 ].gridAddress).toEqual([ -1, 1 ])
			expect(gridTileSpy.calls.all()[ 8 ].args[ 0 ].gridAddress).toEqual([ 0, -2 ])
			expect(gridTileSpy.calls.all()[ 9 ].args[ 0 ].gridAddress).toEqual([ 0, -1 ])
			expect(gridTileSpy.calls.all()[ 10 ].args[ 0 ].gridAddress).toEqual([ 0, 0 ])
			expect(gridTileSpy.calls.all()[ 11 ].args[ 0 ].gridAddress).toEqual([ 0, 1 ])
			expect(gridTileSpy.calls.all()[ 12 ].args[ 0 ].gridAddress).toEqual([ 1, -2 ])
			expect(gridTileSpy.calls.all()[ 13 ].args[ 0 ].gridAddress).toEqual([ 1, -1 ])
			expect(gridTileSpy.calls.all()[ 14 ].args[ 0 ].gridAddress).toEqual([ 1, 0 ])
			expect(gridTileSpy.calls.all()[ 15 ].args[ 0 ].gridAddress).toEqual([ 1, 1 ])
		})

		it('sets the tile count on the app state correctly', () => {
			appState.execute.tileCount = 0

			subject({ gridTile: gridTileSpy, thisPatternRef })

			expect(appState.execute.tileCount).toBe(Math.pow(tileResolution, 2) * 4)
		})
	})
})
