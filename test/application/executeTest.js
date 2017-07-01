import execute from '../../src/application/execute'
import consoleWrapper from '../../src/application/consoleWrapper'
import { FRAME_RATE } from '../../src/defaults'

describe('execute', () => {
	let iterating, animating, exportFrames, performanceLogging
	let consoleWrapperLogSpy, gridSpy, animatorSpy, exportFrameSpy
	beforeEach(() => {
		iterating = undefined
		animating = undefined
		exportFrames = undefined
		performanceLogging = undefined

		consoleWrapperLogSpy = spyOn(consoleWrapper, 'log')
		spyOn(consoleWrapper, 'time')
		spyOn(consoleWrapper, 'timeEnd')

		gridSpy = jasmine.createSpy()
		execute.__Rewire__('grid', gridSpy)

		animatorSpy = jasmine.createSpy().and.callFake(({ animationFunction, stopCondition }) => {
			while (!stopCondition()) animationFunction()
		})
		execute.__Rewire__('animator', animatorSpy)

		exportFrameSpy = jasmine.createSpy()
		execute.__Rewire__('exportFrame', exportFrameSpy) 

		settings.initial.animation = { endAnimationFrame: 100 }
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

			describe('when not iterating nor animating', () => {
				it('logs only the performance of the grid', () => {
					execute({ iterating, animating, exportFrames, performanceLogging })

					expect(consoleWrapper.time.calls.all().length).toBe(1)
					expect(consoleWrapper.timeEnd.calls.all().length).toBe(1)
					expect(consoleWrapper.time).toHaveBeenCalledWith('grid')
					expect(consoleWrapper.timeEnd).toHaveBeenCalledWith('grid')
				})
			})

			describe('when iterating (but not animating)', () => {
				beforeEach(() => {
					iterating = true
					settings.initial.iteration = { endIteration: 10 }
				})

				it('logs the current iteration frame along with the performance measurement', () => {
					execute({ iterating, animating, exportFrames, performanceLogging })

					const consoleWrapperLogSpyCalls = consoleWrapper.log.calls.all()
					expect(consoleWrapperLogSpyCalls.length).toBe(11)
					consoleWrapperLogSpyCalls.forEach((call, index) => {
						expect(call.args[ 0 ]).toBe(`current iteration frame: ${  index}`)
					})

					const consoleWrapperTimeCalls = consoleWrapper.time.calls.all()
					expect(consoleWrapperTimeCalls.length).toBe(11)
					consoleWrapperTimeCalls.forEach(call => {
						expect(call.args[ 0 ]).toBe('grid')
					})

					const consoleWrapperTimeEndCalls = consoleWrapper.timeEnd.calls.all()
					expect(consoleWrapperTimeEndCalls.length).toBe(11)
					consoleWrapperTimeEndCalls.forEach(call => {
						expect(call.args[ 0 ]).toBe('grid')
					})
				})
			})

			describe('when animating (but not iterating)', () => {
				beforeEach(() => {
					animating = true
					settings.initial.animation = { endAnimationFrame: 10 }
				})

				it('logs the current animation frame along with the performance measurement', () => {
					execute({ iterating, animating, exportFrames, performanceLogging })

					const consoleWrapperLogSpyCalls = consoleWrapperLogSpy.calls.all()
					expect(consoleWrapperLogSpyCalls.length).toBe(11)
					consoleWrapperLogSpyCalls.forEach((call, index) => {
						expect(call.args[ 0 ]).toEqual(`current animation frame: ${  index}`)
					})

					const consoleWrapperTimeCalls = consoleWrapper.time.calls.all()
					expect(consoleWrapperTimeCalls.length).toBe(11)
					consoleWrapperTimeCalls.forEach(call => {
						expect(call.args[ 0 ]).toBe('grid')
					})

					const consoleWrapperTimeEndCalls = consoleWrapper.timeEnd.calls.all()
					expect(consoleWrapperTimeEndCalls.length).toBe(11)
					consoleWrapperTimeEndCalls.forEach(call => {
						expect(call.args[ 0 ]).toBe('grid')
					})
				})
			})

			describe('when animating and iterating', () => {
				beforeEach(() => {
					iterating = true
					animating = true
					settings.initial.iteration = { endIteration: 10 }
					settings.initial.animation = { endAnimationFrame: 10 }
				})

				it('logs the animation frames, iteration frames, and grid performance', () => {
					execute({ iterating, animating, exportFrames, performanceLogging })

					const consoleWrapperLogSpyCalls = consoleWrapperLogSpy.calls.all()
					expect(consoleWrapperLogSpyCalls.length).toBe(121)
					consoleWrapperLogSpyCalls.forEach((call, index) => {
						const animationFrame = Math.floor(index / 11)
						const iterationFrame = index % 11
						expect(call.args[ 0 ]).toEqual(
							`current animation/iteration frame: ${animationFrame}/${iterationFrame}`
						)
					})

					const consoleWrapperTimeCalls = consoleWrapper.time.calls.all()
					expect(consoleWrapperTimeCalls.length).toBe(121)
					consoleWrapperTimeCalls.forEach(call => {
						expect(call.args[ 0 ]).toBe('grid')
					})

					const consoleWrapperTimeEndCalls = consoleWrapper.timeEnd.calls.all()
					expect(consoleWrapperTimeEndCalls.length).toBe(121)
					consoleWrapperTimeEndCalls.forEach(call => {
						expect(call.args[ 0 ]).toBe('grid')
					})
				})
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

	describe('neither iterating nor animating', () => {
		beforeEach(() => {
			iterating = false
			animating = false
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

	describe('iterating (but not animating)', () => {
		beforeEach(() => {
			iterating = true
			animating = false
			settings.initial.iteration = {
				startIteration: 5,
				endIteration: 8,
			}
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

		it('handles iteration functions of the iteration frame', () => {
			const iterationFunction = jasmine.createSpy().and.callFake(() => 1000 - (current.iterationFrame + 1))
			settings.initial.exampleConfig = { exampleProperty: 1000 }
			settings.iterations.exampleConfig = { exampleProperty: iterationFunction }

			execute({ iterating, animating, exportFrames, performanceLogging })

			const iterationFunctionCalls = iterationFunction.calls.all()
			expect(iterationFunctionCalls.length).toBe(9)
			expect(iterationFunctionCalls[ 0 ].args[ 0 ]).toBe(1000)
			expect(iterationFunctionCalls[ 1 ].args[ 0 ]).toBe(999)
			expect(iterationFunctionCalls[ 2 ].args[ 0 ]).toBe(998)
			expect(iterationFunctionCalls[ 3 ].args[ 0 ]).toBe(997)
			expect(iterationFunctionCalls[ 4 ].args[ 0 ]).toBe(996)
			expect(iterationFunctionCalls[ 5 ].args[ 0 ]).toBe(995)
			expect(iterationFunctionCalls[ 6 ].args[ 0 ]).toBe(994)
			expect(iterationFunctionCalls[ 7 ].args[ 0 ]).toBe(993)
			expect(iterationFunctionCalls[ 8 ].args[ 0 ]).toBe(992)
		})

		it('defaults the start iteration frame to 0 and the end to its default', () => {
			settings.initial.iteration = {}
			const iterationFunction = jasmine.createSpy()
			settings.iterations.exampleConfig = { exampleProperty: iterationFunction }
			
			execute({ iterating, animating, exportFrames, performanceLogging })

			expect(iterationFunction.calls.all().length).toBe(101)
		})
	})

	describe('animating (but not iterating)', () => {
		beforeEach(() => {
			animating = true
			iterating = false
			settings.initial.animation = {
				startAnimationFrame: 2,
				endAnimationFrame: 5,
			}
		})

		it('calls grid once for each animation between start and end, inclusive', () => {
			execute({ iterating, animating, exportFrames, performanceLogging })

			expect(gridSpy.calls.count()).toBe(4)
		})

		it('calls the animator with the frame rate, which is defaulted', () => {
			execute({ iterating, animating, exportFrames, performanceLogging })

			expect(animatorSpy).toHaveBeenCalledWith(jasmine.objectContaining({ frameRate: FRAME_RATE }))
		})

		it('calls animation functions once for each animation, including before rendering starts', () => {
			const animationFunction = jasmine.createSpy().and.callFake(p => p * 2)
			settings.initial.exampleConfig = { exampleProperty: 1 }
			settings.animations.exampleConfig = { exampleProperty: animationFunction }

			execute({ iterating, animating, exportFrames, performanceLogging })

			const animationFunctionCalls = animationFunction.calls.all()
			expect(animationFunctionCalls.length).toBe(6)
			expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(1)
			expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(2)
			expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(4)
			expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(8)
			expect(animationFunctionCalls[ 4 ].args[ 0 ]).toBe(16)
			expect(animationFunctionCalls[ 5 ].args[ 0 ]).toBe(32)
		})

		it('handles animation functions of the current animation frame', () => {
			const animationFunction = jasmine.createSpy().and.callFake(() => 1000 - (current.animationFrame + 1))
			settings.initial.exampleConfig = { exampleProperty: 1000 }
			settings.animations.exampleConfig = { exampleProperty: animationFunction }

			execute({ iterating, animating, exportFrames, performanceLogging })

			const animationFunctionCalls = animationFunction.calls.all()
			expect(animationFunctionCalls.length).toBe(6)
			expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(1000)
			expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(999)
			expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(998)
			expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(997)
			expect(animationFunctionCalls[ 4 ].args[ 0 ]).toBe(996)
			expect(animationFunctionCalls[ 5 ].args[ 0 ]).toBe(995)
		})

		it('defaults refreshing the canvas to true, and calls clear once for every rendered frame', () => {
			const clearSpy = jasmine.createSpy()
			execute.__Rewire__('clear', clearSpy)

			execute({ iterating, animating, exportFrames, performanceLogging })

			expect(clearSpy.calls.all().length).toBe(4)
			execute.__ResetDependency__('clear')
		})
	})

	describe('iterating and animating', () => {
		beforeEach(() => {
			animating = true
			iterating = true
			settings.initial.iteration = {
				startIteration: 5,
				endIteration: 8,
			}
			settings.initial.animation = {
				startAnimationFrame: 2,
				endAnimationFrame: 5,
			}
		})

		it('calls grid once for each iteration within each animation, both inclusively', () => {
			execute({ iterating, animating, exportFrames, performanceLogging })

			expect(gridSpy.calls.count()).toBe(16)
		})

		it('calls iteration functions once for each iteration, each animation frame, starting the iteration over each animation frame', () => {
			settings.initial.exampleConfig = { exampleProperty: 0 }

			const animationFunction = jasmine.createSpy().and.callFake(p => p + 100)
			settings.animations.exampleConfig = { exampleProperty: animationFunction }

			const iterationFunction = jasmine.createSpy().and.callFake(p => p + (current.iterationFrame + 1))
			settings.iterations.exampleConfig = { exampleProperty: iterationFunction }

			execute({ iterating, animating, exportFrames, performanceLogging })

			const animationFunctionCalls = animationFunction.calls.all()
			expect(animationFunctionCalls.length).toBe(6)
			expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(0)
			expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(100)
			expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(200)
			expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(300)
			expect(animationFunctionCalls[ 4 ].args[ 0 ]).toBe(400)
			expect(animationFunctionCalls[ 5 ].args[ 0 ]).toBe(500)

			const iterationFunctionCalls = iterationFunction.calls.all()
			expect(iterationFunctionCalls.length).toBe(36)
			expect(iterationFunctionCalls[ 0 ].args[ 0 ]).toBe(200)
			expect(iterationFunctionCalls[ 1 ].args[ 0 ]).toBe(201)
			expect(iterationFunctionCalls[ 2 ].args[ 0 ]).toBe(203)
			expect(iterationFunctionCalls[ 3 ].args[ 0 ]).toBe(206)
			expect(iterationFunctionCalls[ 4 ].args[ 0 ]).toBe(210)
			expect(iterationFunctionCalls[ 5 ].args[ 0 ]).toBe(215)
			expect(iterationFunctionCalls[ 6 ].args[ 0 ]).toBe(221)
			expect(iterationFunctionCalls[ 7 ].args[ 0 ]).toBe(228)
			expect(iterationFunctionCalls[ 8 ].args[ 0 ]).toBe(236)

			expect(iterationFunctionCalls[ 9 ].args[ 0 ]).toBe(300)
			expect(iterationFunctionCalls[ 10 ].args[ 0 ]).toBe(301)
			expect(iterationFunctionCalls[ 11 ].args[ 0 ]).toBe(303)
			expect(iterationFunctionCalls[ 12 ].args[ 0 ]).toBe(306)
			expect(iterationFunctionCalls[ 13 ].args[ 0 ]).toBe(310)
			expect(iterationFunctionCalls[ 14 ].args[ 0 ]).toBe(315)
			expect(iterationFunctionCalls[ 15 ].args[ 0 ]).toBe(321)
			expect(iterationFunctionCalls[ 16 ].args[ 0 ]).toBe(328)
			expect(iterationFunctionCalls[ 17 ].args[ 0 ]).toBe(336)

			expect(iterationFunctionCalls[ 18 ].args[ 0 ]).toBe(400)
			expect(iterationFunctionCalls[ 19 ].args[ 0 ]).toBe(401)
			expect(iterationFunctionCalls[ 20 ].args[ 0 ]).toBe(403)
			expect(iterationFunctionCalls[ 21 ].args[ 0 ]).toBe(406)
			expect(iterationFunctionCalls[ 22 ].args[ 0 ]).toBe(410)
			expect(iterationFunctionCalls[ 23 ].args[ 0 ]).toBe(415)
			expect(iterationFunctionCalls[ 24 ].args[ 0 ]).toBe(421)
			expect(iterationFunctionCalls[ 25 ].args[ 0 ]).toBe(428)
			expect(iterationFunctionCalls[ 26 ].args[ 0 ]).toBe(436)

			expect(iterationFunctionCalls[ 27 ].args[ 0 ]).toBe(500)
			expect(iterationFunctionCalls[ 28 ].args[ 0 ]).toBe(501)
			expect(iterationFunctionCalls[ 29 ].args[ 0 ]).toBe(503)
			expect(iterationFunctionCalls[ 30 ].args[ 0 ]).toBe(506)
			expect(iterationFunctionCalls[ 31 ].args[ 0 ]).toBe(510)
			expect(iterationFunctionCalls[ 32 ].args[ 0 ]).toBe(515)
			expect(iterationFunctionCalls[ 33 ].args[ 0 ]).toBe(521)
			expect(iterationFunctionCalls[ 34 ].args[ 0 ]).toBe(528)
			expect(iterationFunctionCalls[ 35 ].args[ 0 ]).toBe(536)
		})
	})

	describe('exporting frames (and of course animating)', () => {
		const startAnimationFrame = 2
		const endAnimationFrame = 5
		beforeEach(() => {
			animating = true
			exportFrames = true
			settings.initial.animation = {
				startAnimationFrame,
				endAnimationFrame,
			}
		})

		it('saves the canvas for each animation frame', done => {
			execute.__ResetDependency__('animator')

			const interval = setInterval(() => {
				current.lastSavedAnimationFrame++
				if (current.lastSavedAnimationFrame >= endAnimationFrame) {
					clearInterval(interval)
					done()
				}
				expect(exportFrameSpy.calls.all().length).toBe(
					current.lastSavedAnimationFrame - startAnimationFrame
				)
			}, 100)

			execute({ iterating, animating, exportFrames, performanceLogging })
		})
	})
})
