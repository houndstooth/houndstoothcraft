import execute from '../src/execute'
import consoleWrapper from '../src/consoleWrapper'

describe('execute', () => {
	let iterating, animating, exportFrames, performanceLogging

	let consoleWrapperLogSpy
	let gridSpy
	beforeEach(() => {
		execute.__Rewire__('animator', ({ animationFunction, stopCondition }) => {
			while (!stopCondition()) animationFunction()
		})
		consoleWrapperLogSpy = spyOn(consoleWrapper, 'log')
		spyOn(consoleWrapper, 'time')
		spyOn(consoleWrapper, 'timeEnd')
		gridSpy = jasmine.createSpy()
		execute.__Rewire__('grid', gridSpy)
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

	describe('iterating', () => {
		describe('when iterating', () => {
			beforeEach(() => {
				iterating = true
				settings.initial.iteration = {
					startIteration: 5,
					endIteration: 8
				}
			})

			it('calls grid once for each iteration between start and end, inclusive', () => {
				execute({ iterating, animating, exportFrames, performanceLogging })

				expect(gridSpy.calls.count()).toBe(4)
			})

			it('calls iteration functions once for each iteration, including before rendering starts', () => {
				const iterationFunction = jasmine.createSpy().and.callFake(p => p * 2)
				settings.initial.exampleProperty = 1;
				settings.iterations.exampleProperty = iterationFunction

				execute({ iterating, animating, exportFrames, performanceLogging })

				const iterationFunctionCalls = iterationFunction.calls.all()
				expect(iterationFunctionCalls.length).toBe(9)
				expect(iterationFunctionCalls[0].args[0]).toBe(1)
				expect(iterationFunctionCalls[1].args[0]).toBe(2)
				expect(iterationFunctionCalls[2].args[0]).toBe(4)
				expect(iterationFunctionCalls[3].args[0]).toBe(8)
				expect(iterationFunctionCalls[4].args[0]).toBe(16)
				expect(iterationFunctionCalls[5].args[0]).toBe(32)
				expect(iterationFunctionCalls[6].args[0]).toBe(64)
				expect(iterationFunctionCalls[7].args[0]).toBe(128)
				expect(iterationFunctionCalls[8].args[0]).toBe(256)
			})

			it('handles iteration functions of the iteration frame', () => {
				const iterationFunction = jasmine.createSpy().and.callFake(() => 1000 - current.iteration)
				settings.initial.exampleProperty = 1000;
				settings.iterations.exampleProperty = iterationFunction

				execute({ iterating, animating, exportFrames, performanceLogging })

				const iterationFunctionCalls = iterationFunction.calls.all()
				expect(iterationFunctionCalls.length).toBe(9)
				expect(iterationFunctionCalls[0].args[0]).toBe(1000)
				expect(iterationFunctionCalls[1].args[0]).toBe(1000)
				expect(iterationFunctionCalls[2].args[0]).toBe(999)
				expect(iterationFunctionCalls[3].args[0]).toBe(998)
				expect(iterationFunctionCalls[4].args[0]).toBe(997)
				expect(iterationFunctionCalls[5].args[0]).toBe(996)
				expect(iterationFunctionCalls[6].args[0]).toBe(995)
				expect(iterationFunctionCalls[7].args[0]).toBe(994)
				expect(iterationFunctionCalls[8].args[0]).toBe(993)
			})
		})

		describe('when not iterating', () => {
			beforeEach(() => {
				iterating = false
			})

			it('calls grid only once', () => {
				execute({ iterating, animating, exportFrames, performanceLogging })

				expect(gridSpy.calls.count()).toBe(1)
			})
		})
	})
})
