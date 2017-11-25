// tslint:disable:no-unsafe-any

import { consoleWrapper, executeGrid, executeGridAndMaybeLogging, state, to } from '../../../../../src'

describe('execute grid and maybe logging', () => {
	const thisPatternRef: number = 99

	beforeEach(() => {
		state.currentFrame = to.Frame(96)
		state.currentLayer = to.Layer(54)

		spyOn(executeGrid, 'main')
		spyOn(consoleWrapper, 'time')
		spyOn(consoleWrapper, 'timeEnd')
		spyOn(consoleWrapper, 'log')
	})

	it('calls grid', async (done: DoneFn) => {
		await executeGridAndMaybeLogging.main({ thisPatternRef })

		expect(executeGrid.main).toHaveBeenCalledWith({ thisPatternRef })

		done()
	})

	describe('when performance logging', () => {
		beforeEach(() => state.performanceLogging = true)

		describe('when not animating', () => {
			it('logs only the performance of the grid', async (done: DoneFn) => {
				await executeGridAndMaybeLogging.main({ thisPatternRef })

				expect(consoleWrapper.time).toHaveBeenCalledWith('grid')
				expect(consoleWrapper.timeEnd).toHaveBeenCalledWith('grid')
				expect(consoleWrapper.log).toHaveBeenCalledWith('current layer: 54')

				done()
			})
		})

		describe('when animating', () => {
			beforeEach(() => state.animating = true)

			it('logs the current animation frame along with the performance measurement', async (done: DoneFn) => {
				await executeGridAndMaybeLogging.main({ thisPatternRef })

				expect(consoleWrapper.time).toHaveBeenCalledWith('grid')
				expect(consoleWrapper.timeEnd).toHaveBeenCalledWith('grid')
				expect(consoleWrapper.log).toHaveBeenCalledWith('current animation frame / layer: 96/54')

				done()
			})
		})
	})

	describe('when not performance logging', () => {
		beforeEach(() => state.performanceLogging = false)

		it('does not track performance or log it', async (done: DoneFn) => {
			await executeGridAndMaybeLogging.main({ thisPatternRef })

			expect(consoleWrapper.time).not.toHaveBeenCalled()
			expect(consoleWrapper.timeEnd).not.toHaveBeenCalled()
			expect(consoleWrapper.log).not.toHaveBeenCalled()

			done()
		})
	})
})
