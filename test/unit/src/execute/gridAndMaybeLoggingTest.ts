import * as components from '../../../../src/components'
import { gridAndMaybeLogging } from '../../../../src/execute/gridAndMaybeLogging'
import { state } from '../../../../src/state'
import * as to from '../../../../src/utilities/to'
import { console } from '../../../../src/utilities/windowWrapper'

describe('grid and maybe logging', () => {
	beforeEach(() => {
		state.currentAnimationFrame = to.Frame(96)
		state.currentLayer = to.Layer(54)

		spyOn(components, 'grid')
		spyOn(console, 'time')
		spyOn(console, 'timeEnd')
		spyOn(console, 'log')
	})

	it('calls grid', () => {
		gridAndMaybeLogging()

		expect(components.grid).toHaveBeenCalled()
	})

	describe('when performance logging', () => {
		beforeEach(() => state.performanceLogging = true)

		describe('when not animating', () => {
			it('logs only the performance of the grid', () => {
				gridAndMaybeLogging()

				expect(console.time).toHaveBeenCalledWith('grid')
				expect(console.timeEnd).toHaveBeenCalledWith('grid')
				expect(console.log).toHaveBeenCalledWith('current layer: 54')
			})
		})

		describe('when animating', () => {
			beforeEach(() => state.animating = true)

			it('logs the current animation frame along with the performance measurement', () => {
				gridAndMaybeLogging()

				expect(console.time).toHaveBeenCalledWith('grid')
				expect(console.timeEnd).toHaveBeenCalledWith('grid')
				expect(console.log).toHaveBeenCalledWith('current animation frame / layer: 96/54')
			})
		})
	})

	describe('when not performance logging', () => {
		beforeEach(() => state.performanceLogging = false)

		it('does not track performance or log it', () => {
			gridAndMaybeLogging()

			expect(console.time).not.toHaveBeenCalled()
			expect(console.timeEnd).not.toHaveBeenCalled()
			expect(console.log).not.toHaveBeenCalled()
		})
	})
})
