import grid from '../../../src/components/grid'
import state from '../../../src/state'
import resetState from '../../../src/store/resetState'
import * as view from '../../../src/view'
import * as tile from '../../../src/components/tile'

describe('grid', () => {
	const gridSize = 2

	beforeEach(() => {
		resetState(state)
		spyOn(tile, 'default')
		state.mainHoundstooth.basePattern.gridSettings = { gridSize }
	})

	it('uses the given grid size', () => {
		grid()

		expect(tile.default.calls.all().length).toBe(Math.pow(gridSize, 2))
	})

	describe('when negative quadrants are excluded', () => {
		beforeEach(() => {
			state.mainHoundstooth.basePattern.gridSettings.includeNegativeQuadrants = false
		})

		it('only makes tiles with positive addresses', () => {
			grid()

			expect(tile.default.calls.count()).toEqual(Math.pow(gridSize, 2))
			expect(tile.default.calls.all()[ 0 ].args).toEqual([ { gridAddress: [ 0, 0 ] } ])
			expect(tile.default.calls.all()[ 1 ].args).toEqual([ { gridAddress: [ 0, 1 ] } ])
			expect(tile.default.calls.all()[ 2 ].args).toEqual([ { gridAddress: [ 1, 0 ] } ])
			expect(tile.default.calls.all()[ 3 ].args).toEqual([ { gridAddress: [ 1, 1 ] } ])
		})
	})

	describe('when negative quadrants are included', () => {
		beforeEach(() => {
			state.mainHoundstooth.basePattern.gridSettings.includeNegativeQuadrants = true
		})

		it('makes tiles with positive and negative addresses, the negative ones starting at -1 (whereas the positive ones start at 0)', () => {
			const quadrantCount = 4

			grid()

			expect(tile.default.calls.count()).toEqual(Math.pow(gridSize, 2) * quadrantCount)
			expect(tile.default.calls.all()[ 0 ].args).toEqual([ { gridAddress: [ -2, -2 ] } ])
			expect(tile.default.calls.all()[ 1 ].args).toEqual([ { gridAddress: [ -2, -1 ] } ])
			expect(tile.default.calls.all()[ 2 ].args).toEqual([ { gridAddress: [ -2, 0 ] } ])
			expect(tile.default.calls.all()[ 3 ].args).toEqual([ { gridAddress: [ -2, 1 ] } ])
			expect(tile.default.calls.all()[ 4 ].args).toEqual([ { gridAddress: [ -1, -2 ] } ])
			expect(tile.default.calls.all()[ 5 ].args).toEqual([ { gridAddress: [ -1, -1 ] } ])
			expect(tile.default.calls.all()[ 6 ].args).toEqual([ { gridAddress: [ -1, 0 ] } ])
			expect(tile.default.calls.all()[ 7 ].args).toEqual([ { gridAddress: [ -1, 1 ] } ])
			expect(tile.default.calls.all()[ 8 ].args).toEqual([ { gridAddress: [ 0, -2 ] } ])
			expect(tile.default.calls.all()[ 9 ].args).toEqual([ { gridAddress: [ 0, -1 ] } ])
			expect(tile.default.calls.all()[ 10 ].args).toEqual([ { gridAddress: [ 0, 0 ] } ])
			expect(tile.default.calls.all()[ 11 ].args).toEqual([ { gridAddress: [ 0, 1 ] } ])
			expect(tile.default.calls.all()[ 12 ].args).toEqual([ { gridAddress: [ 1, -2 ] } ])
			expect(tile.default.calls.all()[ 13 ].args).toEqual([ { gridAddress: [ 1, -1 ] } ])
			expect(tile.default.calls.all()[ 14 ].args).toEqual([ { gridAddress: [ 1, 0 ] } ])
			expect(tile.default.calls.all()[ 15 ].args).toEqual([ { gridAddress: [ 1, 1 ] } ])
		})
	})

	it('applies background color', () => {
		spyOn(view, 'applyBackgroundColor')

		grid()

		expect(view.applyBackgroundColor).toHaveBeenCalled()
	})

	it('applies opacity', () => {
		spyOn(view, 'applyOpacity')

		grid()

		expect(view.applyOpacity).toHaveBeenCalled()
	})
})
