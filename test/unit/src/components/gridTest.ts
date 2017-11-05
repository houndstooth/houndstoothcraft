import Spy = jasmine.Spy
import { grid } from '../../../../src/components/grid'
import { state } from '../../../../src/state'
import { setSetting } from '../../../../src/store/setSetting'
import * as view from '../../../../src/view'

describe('grid', () => {
	let gridTileSpy: Spy
	const tileResolution: number = 2
	beforeEach(() => {
		setSetting('tileResolution', tileResolution)
		gridTileSpy = jasmine.createSpy('gridTile')
		spyOn(view, 'applyViewForGrid')
	})

	it('applies view for the grid', () => {
		grid({ gridTile: gridTileSpy })

		expect(view.applyViewForGrid).toHaveBeenCalled()
	})

	it('uses the given grid size', () => {
		grid({ gridTile: gridTileSpy })

		expect(gridTileSpy.calls.all().length).toBe(Math.pow(tileResolution, 2))
	})

	describe('when negative quadrants are excluded', () => {
		beforeEach(() => {
			setSetting('includeNegativeQuadrants', false)
		})

		it('only makes tiles with positive addresses', () => {
			grid({ gridTile: gridTileSpy })

			expect(gridTileSpy.calls.count()).toEqual(Math.pow(tileResolution, 2))
			expect(gridTileSpy.calls.all()[ 0 ].args).toEqual([ { gridAddress: [ 0, 0 ] } ])
			expect(gridTileSpy.calls.all()[ 1 ].args).toEqual([ { gridAddress: [ 0, 1 ] } ])
			expect(gridTileSpy.calls.all()[ 2 ].args).toEqual([ { gridAddress: [ 1, 0 ] } ])
			expect(gridTileSpy.calls.all()[ 3 ].args).toEqual([ { gridAddress: [ 1, 1 ] } ])
		})

		it('sets the tile count on the state correctly', () => {
			state.tileCount = 0

			grid({ gridTile: gridTileSpy })

			expect(state.tileCount).toBe(Math.pow(tileResolution, 2))
		})
	})

	describe('when negative quadrants are included', () => {
		beforeEach(() => {
			setSetting('includeNegativeQuadrants', true)
		})

		// tslint:disable-next-line:max-line-length
		it('makes tiles with positive and negative addresses, the negative ones starting at -1 (whereas the positive ones start at 0)', () => {
			const quadrantCount: number = 4

			grid({ gridTile: gridTileSpy })

			expect(gridTileSpy.calls.count()).toEqual(Math.pow(tileResolution, 2) * quadrantCount)
			expect(gridTileSpy.calls.all()[ 0 ].args).toEqual([ { gridAddress: [ -2, -2 ] } ])
			expect(gridTileSpy.calls.all()[ 1 ].args).toEqual([ { gridAddress: [ -2, -1 ] } ])
			expect(gridTileSpy.calls.all()[ 2 ].args).toEqual([ { gridAddress: [ -2, 0 ] } ])
			expect(gridTileSpy.calls.all()[ 3 ].args).toEqual([ { gridAddress: [ -2, 1 ] } ])
			expect(gridTileSpy.calls.all()[ 4 ].args).toEqual([ { gridAddress: [ -1, -2 ] } ])
			expect(gridTileSpy.calls.all()[ 5 ].args).toEqual([ { gridAddress: [ -1, -1 ] } ])
			expect(gridTileSpy.calls.all()[ 6 ].args).toEqual([ { gridAddress: [ -1, 0 ] } ])
			expect(gridTileSpy.calls.all()[ 7 ].args).toEqual([ { gridAddress: [ -1, 1 ] } ])
			expect(gridTileSpy.calls.all()[ 8 ].args).toEqual([ { gridAddress: [ 0, -2 ] } ])
			expect(gridTileSpy.calls.all()[ 9 ].args).toEqual([ { gridAddress: [ 0, -1 ] } ])
			expect(gridTileSpy.calls.all()[ 10 ].args).toEqual([ { gridAddress: [ 0, 0 ] } ])
			expect(gridTileSpy.calls.all()[ 11 ].args).toEqual([ { gridAddress: [ 0, 1 ] } ])
			expect(gridTileSpy.calls.all()[ 12 ].args).toEqual([ { gridAddress: [ 1, -2 ] } ])
			expect(gridTileSpy.calls.all()[ 13 ].args).toEqual([ { gridAddress: [ 1, -1 ] } ])
			expect(gridTileSpy.calls.all()[ 14 ].args).toEqual([ { gridAddress: [ 1, 0 ] } ])
			expect(gridTileSpy.calls.all()[ 15 ].args).toEqual([ { gridAddress: [ 1, 1 ] } ])
		})

		it('sets the tile count on the state correctly', () => {
			state.tileCount = 0

			grid({ gridTile: gridTileSpy })

			expect(state.tileCount).toBe(Math.pow(tileResolution, 2) * 4)
		})
	})
})
