import composeMainHoundstooth from '../../../src/store/composeMainHoundstooth'
import execute from '../../../src/application/execute'
import consoleWrapper from '../../../src/utilities/consoleWrapper'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'

describe('execute', () => {
	let consoleWrapperLogSpy, gridSpy, animatorSpy, exportFrameSpy, mixDownCanvasesSpy
	beforeEach(() => {
		resetStore(store)
		composeMainHoundstooth()

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

		store.mainHoundstooth.basePattern.animationSettings = { endAnimationFrame: 100 }

		mixDownCanvasesSpy = jasmine.createSpy()
		execute.__Rewire__('mixDownCanvases', mixDownCanvasesSpy)
	})

	afterEach(() => {
		execute.__ResetDependency__('grid')
		execute.__ResetDependency__('animator')

		execute.__ResetDependency__('mixDownCanvases')
	})

	it('sets up for rendering', () => {
		const setupCanvasesSpy = jasmine.createSpy()
		execute.__Rewire__('setupCanvases', setupCanvasesSpy)
		const setupContextsSpy = jasmine.createSpy()
		execute.__Rewire__('setupContexts', setupContextsSpy)
		const setupMixedDownCanvasSpy = jasmine.createSpy()
		execute.__Rewire__('setupMixedDownCanvas', setupMixedDownCanvasSpy)

		execute()

		expect(setupCanvasesSpy).toHaveBeenCalled()
		expect(setupContextsSpy).toHaveBeenCalled()
		expect(setupMixedDownCanvasSpy).toHaveBeenCalled()

		execute.__ResetDependency__('setupCanvases')
		execute.__ResetDependency__('setupContexts')
		execute.__ResetDependency__('setupMixedDownCanvas')
	})

	describe('performance logging', () => {
		describe('when performance logging', () => {
			beforeEach(() => {
				store.performanceLogging = true
			})

			describe('when not layering nor animating', () => {
				it('logs only the performance of the grid', () => {
					execute()

					expect(consoleWrapper.time.calls.all().length).toBe(1)
					expect(consoleWrapper.timeEnd.calls.all().length).toBe(1)
					expect(consoleWrapper.time).toHaveBeenCalledWith('grid')
					expect(consoleWrapper.timeEnd).toHaveBeenCalledWith('grid')
				})
			})

			describe('when layering (but not animating)', () => {
				beforeEach(() => {
					store.mainHoundstooth.basePattern.layerSettings = { endLayer: 10 }
				})

				it('logs the current frame along with the performance measurement', () => {
					execute()

					const consoleWrapperLogSpyCalls = consoleWrapper.log.calls.all()
					expect(consoleWrapperLogSpyCalls.length).toBe(11)
					consoleWrapperLogSpyCalls.forEach((call, index) => {
						expect(call.args[ 0 ]).toBe(`current layer: ${  index}`)
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

			describe('when animating (but not layering)', () => {
				beforeEach(() => {
					store.animating = true
					store.mainHoundstooth.basePattern.animationSettings = { endAnimationFrame: 10 }
				})

				it('logs the current animation frame along with the performance measurement', () => {
					execute()

					const consoleWrapperLogSpyCalls = consoleWrapperLogSpy.calls.all()
					expect(consoleWrapperLogSpyCalls.length).toBe(11)
					consoleWrapperLogSpyCalls.forEach((call, index) => {
						expect(call.args[ 0 ]).toEqual(`current animation frame / layer: ${index}/0`)
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

			describe('when animating and layering', () => {
				beforeEach(() => {
					store.animating = true
					store.mainHoundstooth.basePattern.layerSettings = { endLayer: 10 }
					store.mainHoundstooth.basePattern.animationSettings = { endAnimationFrame: 10 }
				})

				it('logs the animation frames, current layer, and grid performance', () => {
					execute()

					const consoleWrapperLogSpyCalls = consoleWrapperLogSpy.calls.all()
					expect(consoleWrapperLogSpyCalls.length).toBe(121)
					consoleWrapperLogSpyCalls.forEach((call, index) => {
						const currentAnimationFrame = Math.floor(index / 11)
						const currentLayer = index % 11
						expect(call.args[ 0 ]).toEqual(`current animation frame / layer: ${currentAnimationFrame}/${currentLayer}`)
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
				store.performanceLogging = false
			})

			it('does not track performance or log it', () => {
				execute()

				expect(consoleWrapper.log).not.toHaveBeenCalled()
				expect(consoleWrapper.time).not.toHaveBeenCalled()
				expect(consoleWrapper.timeEnd).not.toHaveBeenCalled()
			})
		})
	})

	describe('neither layering nor animating', () => {
		beforeEach(() => {
			store.animating = false
		})

		it('calls grid only once', () => {
			execute()

			expect(gridSpy.calls.count()).toBe(1)
		})

		it('mixes down canvases, also once', () => {
			execute()

			expect(mixDownCanvasesSpy.calls.count()).toBe(1)
		})

		it('does not call layer functions', () => {
			const layerFunction = jasmine.createSpy()
			store.mainHoundstooth.layersPattern.exampleSetting = layerFunction

			execute()

			expect(layerFunction).not.toHaveBeenCalled()
		})
	})

	describe('layering (but not animating)', () => {
		beforeEach(() => {
			store.animating = false
			store.mainHoundstooth.basePattern.layerSettings = {
				startLayer: 5,
				endLayer: 8,
			}
		})

		it('calls grid once for each layer between start and end, inclusive', () => {
			execute()

			expect(gridSpy.calls.count()).toBe(4)
		})

		it('mixes down canvases, just once', () => {
			execute()

			expect(mixDownCanvasesSpy.calls.count()).toBe(1)
		})

		it('calls layer functions once for each layer, including before rendering starts', () => {
			const layerFunction = jasmine.createSpy().and.callFake(p => p * 2)
			store.mainHoundstooth.basePattern.exampleSettings = { exampleSetting: 1 }
			store.mainHoundstooth.layersPattern.exampleSettings = { exampleSetting: layerFunction }

			execute()

			const layerFunctionCalls = layerFunction.calls.all()
			expect(layerFunctionCalls.length).toBe(8)
			expect(layerFunctionCalls[ 0 ].args[ 0 ]).toBe(1)
			expect(layerFunctionCalls[ 1 ].args[ 0 ]).toBe(2)
			expect(layerFunctionCalls[ 2 ].args[ 0 ]).toBe(4)
			expect(layerFunctionCalls[ 3 ].args[ 0 ]).toBe(8)
			expect(layerFunctionCalls[ 4 ].args[ 0 ]).toBe(16)
			expect(layerFunctionCalls[ 5 ].args[ 0 ]).toBe(32)
			expect(layerFunctionCalls[ 6 ].args[ 0 ]).toBe(64)
			expect(layerFunctionCalls[ 7 ].args[ 0 ]).toBe(128)
		})

		it('handles layer functions of the current layer', () => {
			const layerFunction = jasmine.createSpy().and.callFake(() => 1000 - (store.currentLayer + 1))
			store.mainHoundstooth.basePattern.exampleSettings = { exampleSetting: 1000 }
			store.mainHoundstooth.layersPattern.exampleSettings = { exampleSetting: layerFunction }

			execute()

			const layerFunctionCalls = layerFunction.calls.all()
			expect(layerFunctionCalls.length).toBe(8)
			expect(layerFunctionCalls[ 0 ].args[ 0 ]).toBe(1000)
			expect(layerFunctionCalls[ 1 ].args[ 0 ]).toBe(999)
			expect(layerFunctionCalls[ 2 ].args[ 0 ]).toBe(998)
			expect(layerFunctionCalls[ 3 ].args[ 0 ]).toBe(997)
			expect(layerFunctionCalls[ 4 ].args[ 0 ]).toBe(996)
			expect(layerFunctionCalls[ 5 ].args[ 0 ]).toBe(995)
			expect(layerFunctionCalls[ 6 ].args[ 0 ]).toBe(994)
			expect(layerFunctionCalls[ 7 ].args[ 0 ]).toBe(993)
		})
	})

	describe('animating (but not layering)', () => {
		beforeEach(() => {
			store.animating = true
			store.mainHoundstooth.basePattern.animationSettings = {
				frameRate: 1.120,
				startAnimationFrame: 2,
				endAnimationFrame: 5,
			}
		})

		it('calls grid once for each animation between start and end, inclusive', () => {
			execute()

			expect(gridSpy.calls.count()).toBe(4)
		})

		it('mixes down canvases once for each animation between start and end, inclusive', () => {
			execute()

			expect(mixDownCanvasesSpy.calls.count()).toBe(4)
		})

		it('calls the animator with the frame rate, which is defaulted', () => {
			execute()

			expect(animatorSpy).toHaveBeenCalledWith(jasmine.objectContaining({ frameRate: 1.120 }))
		})

		it('calls animation functions once for each animation, including before rendering starts', () => {
			const animationFunction = jasmine.createSpy().and.callFake(p => p * 2)
			store.mainHoundstooth.basePattern.exampleSettings = { exampleSetting: 1 }
			store.mainHoundstooth.animationsPattern.exampleSettings = { exampleSetting: animationFunction }

			execute()

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
			const animationFunction = jasmine.createSpy().and.callFake(() => 1000 - (store.currentAnimationFrame + 1))
			store.mainHoundstooth.basePattern.exampleSettings = { exampleSetting: 1000 }
			store.mainHoundstooth.animationsPattern.exampleSettings = { exampleSetting: animationFunction }

			execute()

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

			execute()

			expect(clearSpy.calls.all().length).toBe(4)
			execute.__ResetDependency__('clear')
		})
	})

	describe('layering and animating', () => {
		beforeEach(() => {
			store.animating = true
			store.mainHoundstooth.basePattern.layerSettings = {
				startLayer: 5,
				endLayer: 8,
			}
			store.mainHoundstooth.basePattern.animationSettings = {
				startAnimationFrame: 2,
				endAnimationFrame: 5,
			}
		})

		it('calls grid once for each layer within each animation, both inclusively', () => {
			execute()

			expect(gridSpy.calls.count()).toBe(16)
		})

		it('mixes down canvases once for each animation between start and end, inclusive', () => {
			execute()

			expect(mixDownCanvasesSpy.calls.count()).toBe(4)
		})

		it('calls layer functions once for each layer, each animation frame, starting the layer over each animation frame', () => {
			store.mainHoundstooth.basePattern.exampleSettings = { exampleSetting: 0 }

			const animationFunction = jasmine.createSpy().and.callFake(p => p + 100)
			store.mainHoundstooth.animationsPattern.exampleSettings = { exampleSetting: animationFunction }

			const layerFunction = jasmine.createSpy().and.callFake(p => p + (store.currentLayer + 1))
			store.mainHoundstooth.layersPattern.exampleSettings = { exampleSetting: layerFunction }

			execute()

			const animationFunctionCalls = animationFunction.calls.all()
			expect(animationFunctionCalls.length).toBe(6)
			expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(0)
			expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(100)
			expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(200)
			expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(300)
			expect(animationFunctionCalls[ 4 ].args[ 0 ]).toBe(400)
			expect(animationFunctionCalls[ 5 ].args[ 0 ]).toBe(500)

			const layerFunctionCalls = layerFunction.calls.all()
			expect(layerFunctionCalls.length).toBe(32)
			expect(layerFunctionCalls[ 0 ].args[ 0 ]).toBe(200)
			expect(layerFunctionCalls[ 1 ].args[ 0 ]).toBe(201)
			expect(layerFunctionCalls[ 2 ].args[ 0 ]).toBe(203)
			expect(layerFunctionCalls[ 3 ].args[ 0 ]).toBe(206)
			expect(layerFunctionCalls[ 4 ].args[ 0 ]).toBe(210)
			expect(layerFunctionCalls[ 5 ].args[ 0 ]).toBe(215)
			expect(layerFunctionCalls[ 6 ].args[ 0 ]).toBe(221)
			expect(layerFunctionCalls[ 7 ].args[ 0 ]).toBe(228)

			expect(layerFunctionCalls[ 8 ].args[ 0 ]).toBe(300)
			expect(layerFunctionCalls[ 9 ].args[ 0 ]).toBe(301)
			expect(layerFunctionCalls[ 10 ].args[ 0 ]).toBe(303)
			expect(layerFunctionCalls[ 11 ].args[ 0 ]).toBe(306)
			expect(layerFunctionCalls[ 12 ].args[ 0 ]).toBe(310)
			expect(layerFunctionCalls[ 13 ].args[ 0 ]).toBe(315)
			expect(layerFunctionCalls[ 14 ].args[ 0 ]).toBe(321)
			expect(layerFunctionCalls[ 15 ].args[ 0 ]).toBe(328)

			expect(layerFunctionCalls[ 16 ].args[ 0 ]).toBe(400)
			expect(layerFunctionCalls[ 17 ].args[ 0 ]).toBe(401)
			expect(layerFunctionCalls[ 18 ].args[ 0 ]).toBe(403)
			expect(layerFunctionCalls[ 19 ].args[ 0 ]).toBe(406)
			expect(layerFunctionCalls[ 20 ].args[ 0 ]).toBe(410)
			expect(layerFunctionCalls[ 21 ].args[ 0 ]).toBe(415)
			expect(layerFunctionCalls[ 22 ].args[ 0 ]).toBe(421)
			expect(layerFunctionCalls[ 23 ].args[ 0 ]).toBe(428)

			expect(layerFunctionCalls[ 24 ].args[ 0 ]).toBe(500)
			expect(layerFunctionCalls[ 25 ].args[ 0 ]).toBe(501)
			expect(layerFunctionCalls[ 26 ].args[ 0 ]).toBe(503)
			expect(layerFunctionCalls[ 27 ].args[ 0 ]).toBe(506)
			expect(layerFunctionCalls[ 28 ].args[ 0 ]).toBe(510)
			expect(layerFunctionCalls[ 29 ].args[ 0 ]).toBe(515)
			expect(layerFunctionCalls[ 30 ].args[ 0 ]).toBe(521)
			expect(layerFunctionCalls[ 31 ].args[ 0 ]).toBe(528)
		})
	})

	describe('exporting frames (and of course animating)', () => {
		const startAnimationFrame = 2
		const endAnimationFrame = 5
		beforeEach(() => {
			store.animating = true
			store.exportFrames = true
			store.mainHoundstooth.basePattern.animationSettings = {
				startAnimationFrame,
				endAnimationFrame,
			}
		})

		it('saves the canvas for each animation frame', done => {
			execute.__ResetDependency__('animator')

			const interval = setInterval(() => {
				store.lastSavedAnimationFrame++
				if (store.lastSavedAnimationFrame >= endAnimationFrame) {
					clearInterval(interval)
					done()
				}
				expect(exportFrameSpy.calls.all().length).toBe(store.lastSavedAnimationFrame - startAnimationFrame)
			}, 200)

			execute()
		})
	})
})
