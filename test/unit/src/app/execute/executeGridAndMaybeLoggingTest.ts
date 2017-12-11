import { appState, executeGrid, executeGridAndMaybeLogging, globalWrapper, to } from '../../../../../src/indexForTest'

const subject: (_: { thisPatternRef: number }) => Promise<void> = executeGridAndMaybeLogging.default

describe('execute grid and maybe logging', () => {
	const thisPatternRef: number = 99

	beforeEach(() => {
		appState.controls.currentFrame = to.Frame(96)
		appState.execute.currentLayer = to.Layer(54)

		spyOn(executeGrid, 'default')
		spyOn(globalWrapper.console, 'time')
		spyOn(globalWrapper.console, 'timeEnd')
		spyOn(globalWrapper.console, 'log')
	})

	it('calls grid', async (done: DoneFn) => {
		await subject({ thisPatternRef })

		expect(executeGrid.default).toHaveBeenCalledWith({ thisPatternRef })

		done()
	})

	describe('when performance logging', () => {
		beforeEach(() => appState.execute.performanceLogging = true)

		describe('when not animating', () => {
			it('logs only the performance of the grid', async (done: DoneFn) => {
				await subject({ thisPatternRef })

				expect(globalWrapper.console.time).toHaveBeenCalledWith('grid')
				expect(globalWrapper.console.timeEnd).toHaveBeenCalledWith('grid')
				expect(globalWrapper.console.log).toHaveBeenCalledWith('current layer: 54')

				done()
			})
		})

		describe('when animating', () => {
			beforeEach(() => appState.controls.animating = true)

			it('logs the current animation frame along with the performance measurement', async (done: DoneFn) => {
				await subject({ thisPatternRef })

				expect(globalWrapper.console.time).toHaveBeenCalledWith('grid')
				expect(globalWrapper.console.timeEnd).toHaveBeenCalledWith('grid')
				expect(globalWrapper.console.log).toHaveBeenCalledWith('current animation frame / layer: 96/54')

				done()
			})
		})
	})

	describe('when not performance logging', () => {
		beforeEach(() => appState.execute.performanceLogging = false)

		it('does not track performance or log it', async (done: DoneFn) => {
			await subject({ thisPatternRef })

			expect(globalWrapper.console.time).not.toHaveBeenCalled()
			expect(globalWrapper.console.timeEnd).not.toHaveBeenCalled()
			expect(globalWrapper.console.log).not.toHaveBeenCalled()

			done()
		})
	})
})
