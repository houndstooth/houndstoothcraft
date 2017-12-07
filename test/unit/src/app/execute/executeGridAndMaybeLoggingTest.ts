import { appState, consoleWrapper, executeGrid, executeGridAndMaybeLogging, to } from '../../../../../src'

const subject: (_: { thisPatternRef: number }) => Promise<void> = executeGridAndMaybeLogging.default

describe('execute grid and maybe logging', () => {
	const thisPatternRef: number = 99

	beforeEach(() => {
		appState.controls.currentFrame = to.Frame(96)
		appState.execute.currentLayer = to.Layer(54)

		spyOn(executeGrid, 'default')
		spyOn(consoleWrapper, 'time')
		spyOn(consoleWrapper, 'timeEnd')
		spyOn(consoleWrapper, 'log')
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

				expect(consoleWrapper.time).toHaveBeenCalledWith('grid')
				expect(consoleWrapper.timeEnd).toHaveBeenCalledWith('grid')
				expect(consoleWrapper.log).toHaveBeenCalledWith('current layer: 54')

				done()
			})
		})

		describe('when animating', () => {
			beforeEach(() => appState.controls.animating = true)

			it('logs the current animation frame along with the performance measurement', async (done: DoneFn) => {
				await subject({ thisPatternRef })

				expect(consoleWrapper.time).toHaveBeenCalledWith('grid')
				expect(consoleWrapper.timeEnd).toHaveBeenCalledWith('grid')
				expect(consoleWrapper.log).toHaveBeenCalledWith('current animation frame / layer: 96/54')

				done()
			})
		})
	})

	describe('when not performance logging', () => {
		beforeEach(() => appState.execute.performanceLogging = false)

		it('does not track performance or log it', async (done: DoneFn) => {
			await subject({ thisPatternRef })

			expect(consoleWrapper.time).not.toHaveBeenCalled()
			expect(consoleWrapper.timeEnd).not.toHaveBeenCalled()
			expect(consoleWrapper.log).not.toHaveBeenCalled()

			done()
		})
	})
})
