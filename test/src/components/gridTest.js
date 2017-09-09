import grid from '../../../src/components/grid'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import render from '../../../src/render'
import display from '../../../src/display'

describe('grid', () => {
	let tileSpy
	const gridSize = 2

	beforeEach(() => {
		resetStore(store)
		tileSpy = jasmine.createSpy()
		grid.__Rewire__('tile', tileSpy)

		store.mainHoundstooth.basePattern.gridSettings = { gridSize }
	})

	it('uses the given grid size', () => {
		grid()

		expect(tileSpy.calls.all().length).toBe(Math.pow(gridSize, 2))
	})

	describe('when negative quadrants are excluded', () => {
		beforeEach(() => {
			store.mainHoundstooth.basePattern.gridSettings.includeNegativeQuadrants = false
		})

		it('only makes tiles with positive addresses', () => {
			grid()

			expect(tileSpy.calls.count()).toEqual(Math.pow(gridSize, 2))
			expect(tileSpy.calls.all()[ 0 ].args).toEqual([ { gridAddress: [ 0, 0 ] } ])
			expect(tileSpy.calls.all()[ 1 ].args).toEqual([ { gridAddress: [ 0, 1 ] } ])
			expect(tileSpy.calls.all()[ 2 ].args).toEqual([ { gridAddress: [ 1, 0 ] } ])
			expect(tileSpy.calls.all()[ 3 ].args).toEqual([ { gridAddress: [ 1, 1 ] } ])
		})
	})

	describe('when negative quadrants are included', () => {
		beforeEach(() => {
			store.mainHoundstooth.basePattern.gridSettings.includeNegativeQuadrants = true
		})

		it('makes tiles with positive and negative addresses, the negative ones starting at -1 (whereas the positive ones start at 0)', () => {
			const quadrantCount = 4

			grid()

			expect(tileSpy.calls.count()).toEqual(Math.pow(gridSize, 2) * quadrantCount)
			expect(tileSpy.calls.all()[ 0 ].args).toEqual([ { gridAddress: [ -2, -2 ] } ])
			expect(tileSpy.calls.all()[ 1 ].args).toEqual([ { gridAddress: [ -2, -1 ] } ])
			expect(tileSpy.calls.all()[ 2 ].args).toEqual([ { gridAddress: [ -2, 0 ] } ])
			expect(tileSpy.calls.all()[ 3 ].args).toEqual([ { gridAddress: [ -2, 1 ] } ])
			expect(tileSpy.calls.all()[ 4 ].args).toEqual([ { gridAddress: [ -1, -2 ] } ])
			expect(tileSpy.calls.all()[ 5 ].args).toEqual([ { gridAddress: [ -1, -1 ] } ])
			expect(tileSpy.calls.all()[ 6 ].args).toEqual([ { gridAddress: [ -1, 0 ] } ])
			expect(tileSpy.calls.all()[ 7 ].args).toEqual([ { gridAddress: [ -1, 1 ] } ])
			expect(tileSpy.calls.all()[ 8 ].args).toEqual([ { gridAddress: [ 0, -2 ] } ])
			expect(tileSpy.calls.all()[ 9 ].args).toEqual([ { gridAddress: [ 0, -1 ] } ])
			expect(tileSpy.calls.all()[ 10 ].args).toEqual([ { gridAddress: [ 0, 0 ] } ])
			expect(tileSpy.calls.all()[ 11 ].args).toEqual([ { gridAddress: [ 0, 1 ] } ])
			expect(tileSpy.calls.all()[ 12 ].args).toEqual([ { gridAddress: [ 1, -2 ] } ])
			expect(tileSpy.calls.all()[ 13 ].args).toEqual([ { gridAddress: [ 1, -1 ] } ])
			expect(tileSpy.calls.all()[ 14 ].args).toEqual([ { gridAddress: [ 1, 0 ] } ])
			expect(tileSpy.calls.all()[ 15 ].args).toEqual([ { gridAddress: [ 1, 1 ] } ])
		})
	})

	it('applies background color', () => {
		spyOn(display, 'applyBackgroundColor')

		grid()

		expect(display.applyBackgroundColor).toHaveBeenCalled()
	})

	it('applies opacity', () => {
		spyOn(render, 'applyOpacity')

		grid()

		expect(render.applyOpacity).toHaveBeenCalled()
	})

	afterEach(() => grid.__ResetDependency__('tile'))
})
