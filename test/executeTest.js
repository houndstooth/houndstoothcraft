import execute from '../src/execute'
import consoleWrapper from '../src/consoleWrapper'

describe('execute', () => {
	let iterating, animating, exportFrames, performanceLogging

	let consoleWrapperLogSpy
	beforeEach(() => {
		execute.__Rewire__('animator', ({ animationFunction, stopCondition }) => {
			while (!stopCondition()) animationFunction()
		})
		consoleWrapperLogSpy = spyOn(consoleWrapper, 'log')
		spyOn(consoleWrapper, 'time')
		spyOn(consoleWrapper, 'timeEnd')
	})

	afterEach(() => {
		execute.__ResetDependency__('animator')
	})

	describe('performance logging', () => {
		describe('when performance logging', () => {
			beforeEach(() => {
				performanceLogging = true
			})

			describe('animating', () => {
				describe('when animating', () => {
					beforeEach(() => {
						animating = true
						settings.initial.animation = { endAnimationFrame: 10 }
					})

					it('logs the current animation frame along with the performance measurement', () => {
						execute({ iterating, animating, exportFrames, performanceLogging })

						const consoleWrapperLogSpyCalls = consoleWrapperLogSpy.calls.all()
						consoleWrapperLogSpyCalls.forEach((call, index) => {
							expect(call.args[ 0 ]).toEqual('current animation frame: ' + (index + 1))
						})
					})
				})

				describe('when not animating', () => {
					beforeEach(() => {
						animating = false
					})

					it('does not log a current animation frame along with the performance measurement', () => {
						execute({ iterating, animating, exportFrames, performanceLogging })

						const consoleWrapperLogSpyCalls = consoleWrapperLogSpy.calls.all()
						consoleWrapperLogSpyCalls.forEach(call => {
							expect(call.args[ 0 ]).not.toContain('current animation frame')
						})
					})
				})
			})

			describe('iterating', () => {
				describe('when iterating', () => {
					beforeEach(() => {
						iterating = true
					})

					it('logs the current iteration frame along with the performance measurement', () => {
						execute({ iterating, animating, exportFrames, performanceLogging })

						expect(consoleWrapper.log).toHaveBeenCalledWith('current iteration frame: ' + 0)
					})
				})

				describe('when not iterating', () => {
					beforeEach(() => {
						iterating = false
					})

					it('does not log a current iteration frame along with the performance measurement', () => {
						execute({ iterating, animating, exportFrames, performanceLogging })

						const consoleWrapperCalls = consoleWrapper.log.calls.all()
						consoleWrapperCalls.forEach(call => {
							expect(call.args[ 0 ]).not.toContain('current iteration frame')
						})
					})
				})
			})

			it('tracks performance of rendering a grid and logs it', () => {
				execute({ iterating, animating, exportFrames, performanceLogging })

				expect(consoleWrapper.time).toHaveBeenCalledWith('grid')
				expect(consoleWrapper.timeEnd).toHaveBeenCalledWith('grid')
			})
		})

		describe('when not performance logging', () => {
			beforeEach(() => {
				performanceLogging = false
			})

			it('does not track performance or log it', () => {
				execute({ iterating, animating, exportFrames, performanceLogging })

				expect(consoleWrapper.log).not.toHaveBeenCalled()
				expect(consoleWrapper.time).not.toHaveBeenCalled()
				expect(consoleWrapper.timeEnd).not.toHaveBeenCalled()
			})
		})
	})
})
