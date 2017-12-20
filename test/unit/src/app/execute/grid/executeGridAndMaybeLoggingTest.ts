import { appState, executeGrid, executeGridAndMaybeLogging, globalWrapper, to } from '../../../../../../src/indexForTest'

describe('execute grid and maybe logging', () => {
	let subject: (_: { frameId: number }) => Promise<void>
	const frameId: number = 99

	beforeEach(() => {
		subject = executeGridAndMaybeLogging.default
		appState.controls.currentFrame = to.Frame(96)
		appState.execute.currentLayer = to.Layer(54)

		spyOn(executeGrid, 'default')
		spyOn(globalWrapper.console, 'time')
		spyOn(globalWrapper.console, 'timeEnd')
		spyOn(globalWrapper.console, 'log')
	})

	it('calls grid', async (done: DoneFn) => {
		await subject({ frameId })

		expect(executeGrid.default).toHaveBeenCalledWith({ frameId })

		done()
	})

	describe('when performance logging', () => {
		beforeEach(() => appState.execute.performanceLogging = true)

		describe('when not animating', () => {
			it('logs only the performance of the grid', async (done: DoneFn) => {
				await subject({ frameId })

				expect(globalWrapper.console.time).toHaveBeenCalledWith('grid')
				expect(globalWrapper.console.timeEnd).toHaveBeenCalledWith('grid')
				expect(globalWrapper.console.log).toHaveBeenCalledWith('current layer: 54')

				done()
			})
		})

		describe('when animating', () => {
			beforeEach(() => appState.controls.animating = true)

			it('logs the current animation frame along with the performance measurement', async (done: DoneFn) => {
				await subject({ frameId })

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
			await subject({ frameId })

			expect(globalWrapper.console.time).not.toHaveBeenCalled()
			expect(globalWrapper.console.timeEnd).not.toHaveBeenCalled()
			expect(globalWrapper.console.log).not.toHaveBeenCalled()

			done()
		})
	})
})
