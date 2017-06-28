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
		execute.__ResetDependency__('grid')
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

			describe('animating', () => {
				describe('when animating', () => {
					beforeEach(() => {
						animating = true
						settings.initial.animation = {
							startAnimationFrame: 2,
							endAnimationFrame: 5
						}
					})

					it('calls grid once for each iteration within each animation, both inclusively', () => {
						execute({ iterating, animating, exportFrames, performanceLogging })

						expect(gridSpy.calls.count()).toBe(16)
					})

					it('calls animation functions once for each animation, including before rendering starts', () => {
						const animationFunction = jasmine.createSpy().and.callFake(p => p * 2)
						settings.initial.exampleConfig = { exampleProperty: 1 }
						settings.animations.exampleConfig = { exampleProperty: animationFunction }

						execute({ iterating, animating, exportFrames, performanceLogging })

						const animationFunctionCalls = animationFunction.calls.all()
						expect(animationFunctionCalls.length).toBe(4)
						expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(1)
						expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(2)
						expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(4)
						expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(8)
					})

					it('handles animation functions of the current animation frame (doubling up on the first one...??)', () => {
						const animationFunction = jasmine.createSpy().and.callFake(() => 1000 - current.animation)
						settings.initial.exampleConfig = { exampleProperty: 1000 }
						settings.animations.exampleConfig = { exampleProperty: animationFunction }

						execute({ iterating, animating, exportFrames, performanceLogging })

						const animationFunctionCalls = animationFunction.calls.all()
						expect(animationFunctionCalls.length).toBe(4)
						expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(1000)
						expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(998)
						expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(997)
						expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(996)
					})

					it('calls iteration functions once for each iteration, each animation frame, starting over each animation frame', () => {
						settings.initial.exampleConfig = { exampleProperty: 0 }

						const animationFunction = jasmine.createSpy().and.callFake(p => p + 10)
						settings.animations.exampleConfig = { exampleProperty: animationFunction }

						const iterationFunction = jasmine.createSpy().and.callFake(p => p + 1)
						settings.iterations.exampleConfig = { exampleProperty: iterationFunction }

						execute({ iterating, animating, exportFrames, performanceLogging })

						const animationFunctionCalls = animationFunction.calls.all()
						expect(animationFunctionCalls.length).toBe(4)
						expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(0)
						expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(10)
						expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(20)
						expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(30)

						const iterationFunctionCalls = iterationFunction.calls.all()
						expect(iterationFunctionCalls.length).toBe(36)
						expect(iterationFunctionCalls[ 0 ].args[ 0 ]).toBe(0)
						expect(iterationFunctionCalls[ 1 ].args[ 0 ]).toBe(1)
						expect(iterationFunctionCalls[ 2 ].args[ 0 ]).toBe(2)
						expect(iterationFunctionCalls[ 3 ].args[ 0 ]).toBe(3)
						expect(iterationFunctionCalls[ 4 ].args[ 0 ]).toBe(4)
						expect(iterationFunctionCalls[ 5 ].args[ 0 ]).toBe(5)
						expect(iterationFunctionCalls[ 6 ].args[ 0 ]).toBe(6)
						expect(iterationFunctionCalls[ 7 ].args[ 0 ]).toBe(7)
						expect(iterationFunctionCalls[ 8 ].args[ 0 ]).toBe(8)
						
						expect(iterationFunctionCalls[ 9 ].args[ 0 ]).toBe(10)
						expect(iterationFunctionCalls[ 10 ].args[ 0 ]).toBe(11)
						expect(iterationFunctionCalls[ 11 ].args[ 0 ]).toBe(12)
						expect(iterationFunctionCalls[ 12 ].args[ 0 ]).toBe(13)
						expect(iterationFunctionCalls[ 13 ].args[ 0 ]).toBe(14)
						expect(iterationFunctionCalls[ 14 ].args[ 0 ]).toBe(15)
						expect(iterationFunctionCalls[ 15 ].args[ 0 ]).toBe(16)
						expect(iterationFunctionCalls[ 16 ].args[ 0 ]).toBe(17)
						expect(iterationFunctionCalls[ 17 ].args[ 0 ]).toBe(18)

						expect(iterationFunctionCalls[ 18 ].args[ 0 ]).toBe(20)
						expect(iterationFunctionCalls[ 19 ].args[ 0 ]).toBe(21)
						expect(iterationFunctionCalls[ 20 ].args[ 0 ]).toBe(22)
						expect(iterationFunctionCalls[ 21 ].args[ 0 ]).toBe(23)
						expect(iterationFunctionCalls[ 22 ].args[ 0 ]).toBe(24)
						expect(iterationFunctionCalls[ 23 ].args[ 0 ]).toBe(25)
						expect(iterationFunctionCalls[ 24 ].args[ 0 ]).toBe(26)
						expect(iterationFunctionCalls[ 25 ].args[ 0 ]).toBe(27)
						expect(iterationFunctionCalls[ 26 ].args[ 0 ]).toBe(28)

						expect(iterationFunctionCalls[ 27 ].args[ 0 ]).toBe(30)
						expect(iterationFunctionCalls[ 28 ].args[ 0 ]).toBe(31)
						expect(iterationFunctionCalls[ 29 ].args[ 0 ]).toBe(32)
						expect(iterationFunctionCalls[ 30 ].args[ 0 ]).toBe(33)
						expect(iterationFunctionCalls[ 31 ].args[ 0 ]).toBe(34)
						expect(iterationFunctionCalls[ 32 ].args[ 0 ]).toBe(35)
						expect(iterationFunctionCalls[ 33 ].args[ 0 ]).toBe(36)
						expect(iterationFunctionCalls[ 34 ].args[ 0 ]).toBe(37)
						expect(iterationFunctionCalls[ 35 ].args[ 0 ]).toBe(38)
					})
				})

				describe('when not animating', () => {
					beforeEach(() => {
						animating = false
					})

					it('calls grid once for each iteration between start and end, inclusive', () => {
						execute({ iterating, animating, exportFrames, performanceLogging })

						expect(gridSpy.calls.count()).toBe(4)
					})

					it('calls iteration functions once for each iteration, including before rendering starts', () => {
						const iterationFunction = jasmine.createSpy().and.callFake(p => p * 2)
						settings.initial.exampleConfig = { exampleProperty: 1 }
						settings.iterations.exampleConfig = { exampleProperty: iterationFunction }

						execute({ iterating, animating, exportFrames, performanceLogging })

						const iterationFunctionCalls = iterationFunction.calls.all()
						expect(iterationFunctionCalls.length).toBe(9)
						expect(iterationFunctionCalls[ 0 ].args[ 0 ]).toBe(1)
						expect(iterationFunctionCalls[ 1 ].args[ 0 ]).toBe(2)
						expect(iterationFunctionCalls[ 2 ].args[ 0 ]).toBe(4)
						expect(iterationFunctionCalls[ 3 ].args[ 0 ]).toBe(8)
						expect(iterationFunctionCalls[ 4 ].args[ 0 ]).toBe(16)
						expect(iterationFunctionCalls[ 5 ].args[ 0 ]).toBe(32)
						expect(iterationFunctionCalls[ 6 ].args[ 0 ]).toBe(64)
						expect(iterationFunctionCalls[ 7 ].args[ 0 ]).toBe(128)
						expect(iterationFunctionCalls[ 8 ].args[ 0 ]).toBe(256)
					})

					it('handles iteration functions of the iteration frame (but does not affect the first run for no good reason...)', () => {
						const iterationFunction = jasmine.createSpy().and.callFake(() => 1000 - current.iteration)
						settings.initial.exampleConfig = { exampleProperty: 1000 }
						settings.iterations.exampleConfig = { exampleProperty: iterationFunction }

						execute({ iterating, animating, exportFrames, performanceLogging })

						const iterationFunctionCalls = iterationFunction.calls.all()
						expect(iterationFunctionCalls.length).toBe(9)
						expect(iterationFunctionCalls[ 0 ].args[ 0 ]).toBe(1000)
						expect(iterationFunctionCalls[ 1 ].args[ 0 ]).toBe(1000)
						expect(iterationFunctionCalls[ 2 ].args[ 0 ]).toBe(999)
						expect(iterationFunctionCalls[ 3 ].args[ 0 ]).toBe(998)
						expect(iterationFunctionCalls[ 4 ].args[ 0 ]).toBe(997)
						expect(iterationFunctionCalls[ 5 ].args[ 0 ]).toBe(996)
						expect(iterationFunctionCalls[ 6 ].args[ 0 ]).toBe(995)
						expect(iterationFunctionCalls[ 7 ].args[ 0 ]).toBe(994)
						expect(iterationFunctionCalls[ 8 ].args[ 0 ]).toBe(993)
					})
				})
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

			it('does not call iteration functions', () => {
				const iterationFunction = jasmine.createSpy()
				settings.iterations.exampleProperty = iterationFunction

				execute({ iterating, animating, exportFrames, performanceLogging })

				expect(iterationFunction).not.toHaveBeenCalled()
			})
		})
	})
})
