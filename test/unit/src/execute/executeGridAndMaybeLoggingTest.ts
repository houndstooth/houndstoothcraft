// tslint:disable:no-unsafe-any

import * as execute from '../../../../src/execute'
import { executeGridAndMaybeLogging } from '../../../../src/execute/executeGridAndMaybeLogging'
import { state } from '../../../../src/state'
import * as to from '../../../../src/utilities/to'
import { console } from '../../../../src/utilities/windowWrapper'

describe('execute grid and maybe logging', () => {
	beforeEach(() => {
		state.currentFrame = to.Frame(96)
		state.currentLayer = to.Layer(54)

		spyOn(execute, 'executeGrid')
		spyOn(console, 'time')
		spyOn(console, 'timeEnd')
		spyOn(console, 'log')
	})

	it('calls grid', async (done: DoneFn) => {
		await executeGridAndMaybeLogging()

		expect(execute.executeGrid).toHaveBeenCalled()

		done()
	})

	describe('when performance logging', () => {
		beforeEach(() => state.performanceLogging = true)

		describe('when not animating', () => {
			it('logs only the performance of the grid', async (done: DoneFn) => {
				await executeGridAndMaybeLogging()

				expect(console.time).toHaveBeenCalledWith('grid')
				expect(console.timeEnd).toHaveBeenCalledWith('grid')
				expect(console.log).toHaveBeenCalledWith('current layer: 54')

				done()
			})
		})

		describe('when animating', () => {
			beforeEach(() => state.animating = true)

			it('logs the current animation frame along with the performance measurement', async (done: DoneFn) => {
				await executeGridAndMaybeLogging()

				expect(console.time).toHaveBeenCalledWith('grid')
				expect(console.timeEnd).toHaveBeenCalledWith('grid')
				expect(console.log).toHaveBeenCalledWith('current animation frame / layer: 96/54')

				done()
			})
		})
	})

	describe('when not performance logging', () => {
		beforeEach(() => state.performanceLogging = false)

		it('does not track performance or log it', async (done: DoneFn) => {
			await executeGridAndMaybeLogging()

			expect(console.time).not.toHaveBeenCalled()
			expect(console.timeEnd).not.toHaveBeenCalled()
			expect(console.log).not.toHaveBeenCalled()

			done()
		})
	})
})
