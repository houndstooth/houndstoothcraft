// describe('neither layering nor animating', () => {
// 	beforeEach(() => {
// 		state.animating = false
// 	})

// 	it('executes grid only once', () => {
// 		executeSelectedHoundstoothEffects()

// 		expect(executeGridSpy.calls.count()).toBe(1)
// 	})

// 	describe('mixing down canvases', () => {
// 		fit('mixes down canvases, also once, if mixing down', () => {
// 			state.mixingDown = true

// 			executeSelectedHoundstoothEffects()

// 			expect(mixDownContextsSpy.calls.count()).toBe(1)
// 		})

// 		it('does not mix down canvases if not mixing down', () => {
// 			executeSelectedHoundstoothEffects()

// 			expect(mixDownContextsSpy).not.toHaveBeenCalled()
// 		})
// 	})

// 	it('does not call layer functions', () => {
// 		const layerFunction = jasmine.createSpy()
// 		state.mainHoundstooth.layersPattern.tileSettings = { tileSizeSetting: layerFunction }

// 		executeSelectedHoundstoothEffects()

// 		expect(layerFunction).not.toHaveBeenCalled()
// 	})
// })

// describe('layering (but not animating)', () => {
// 	let houndstoothOverrides
// 	beforeEach(() => {
// 		state.animating = false
// 		houndstoothOverrides = {
// 			basePattern: {
// 				layerSettings: {
// 					startLayer: 5,
// 					endLayer: 8,
// 				},
// 			},
// 		}
// 	})

// 	it('executes grid once for each layer between start and end, inclusive', () => {
// 		executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 		expect(executeGridSpy.calls.count()).toBe(4)
// 	})

// 	describe('mixing down canvases', () => {
// 		it('mixes down canvases, just once, if mixing down', () => {
// 			state.mixingDown = true

// 			executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 			expect(mixDownContextsSpy.calls.count()).toBe(1)
// 		})

// 		it('does not mix down canvases if not mixing down', () => {
// 			executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 			expect(mixDownContextsSpy).not.toHaveBeenCalled()
// 		})
// 	})

// 	it('calls layer functions once for each layer, including before rendering starts', () => {
// 		const layerFunction = jasmine.createSpy().and.callFake(p => p * 2)
// 		houndstoothOverrides.basePattern.tileSettings = { tileSizeSetting: 1 }
// 		houndstoothOverrides.layersPattern = {
// 			tileSettings: {
// 				tileSizeSetting: layerFunction,
// 			},
// 		}

// 		executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 		const layerFunctionCalls = layerFunction.calls.all()
// 		expect(layerFunctionCalls.length).toBe(8)
// 		expect(layerFunctionCalls[ 0 ].args[ 0 ]).toBe(1)
// 		expect(layerFunctionCalls[ 1 ].args[ 0 ]).toBe(2)
// 		expect(layerFunctionCalls[ 2 ].args[ 0 ]).toBe(4)
// 		expect(layerFunctionCalls[ 3 ].args[ 0 ]).toBe(8)
// 		expect(layerFunctionCalls[ 4 ].args[ 0 ]).toBe(16)
// 		expect(layerFunctionCalls[ 5 ].args[ 0 ]).toBe(32)
// 		expect(layerFunctionCalls[ 6 ].args[ 0 ]).toBe(64)
// 		expect(layerFunctionCalls[ 7 ].args[ 0 ]).toBe(128)
// 	})

// 	it('handles layer functions of the current layer', () => {
// 		const layerFunction = jasmine.createSpy().and.callFake(() => 1000 - (state.currentLayer + 1))
// 		houndstoothOverrides.basePattern.tileSettings = { tileSizeSetting: 1000 }
// 		houndstoothOverrides.layersPattern = {
// 			tileSettings: {
// 				tileSizeSetting: layerFunction,
// 			},
// 		}
// 		executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 		const layerFunctionCalls = layerFunction.calls.all()
// 		expect(layerFunctionCalls.length).toBe(8)
// 		expect(layerFunctionCalls[ 0 ].args[ 0 ]).toBe(1000)
// 		expect(layerFunctionCalls[ 1 ].args[ 0 ]).toBe(999)
// 		expect(layerFunctionCalls[ 2 ].args[ 0 ]).toBe(998)
// 		expect(layerFunctionCalls[ 3 ].args[ 0 ]).toBe(997)
// 		expect(layerFunctionCalls[ 4 ].args[ 0 ]).toBe(996)
// 		expect(layerFunctionCalls[ 5 ].args[ 0 ]).toBe(995)
// 		expect(layerFunctionCalls[ 6 ].args[ 0 ]).toBe(994)
// 		expect(layerFunctionCalls[ 7 ].args[ 0 ]).toBe(993)
// 	})
// })

// describe('animating (but not layering)', () => {
// 	let houndstoothOverrides
// 	beforeEach(() => {
// 		state.animating = true
// 		houndstoothOverrides = {
// 			basePattern: {
// 				animationSettings: {
// 					frameRate: 1.120,
// 					startAnimationFrame: 2,
// 					endAnimationFrame: 5,
// 				},
// 			},
// 		}
// 	})

// 	it('executes grid once for each animation between start and end, inclusive', () => {
// 		executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 		expect(executeGridSpy.calls.count()).toBe(4)
// 	})

// 	describe('mixing down canvases', () => {
// 		it('mixes down canvases once for each animation between start and end, inclusive, if mixing down', () => {
// 			state.mixingDown = true

// 			executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 			expect(mixDownContextsSpy.calls.count()).toBe(4)
// 		})

// 		it('does not mix down canvases if not mixing down', () => {
// 			executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 			expect(mixDownContextsSpy).not.toHaveBeenCalled()
// 		})
// 	})

// 	it('calls the animator with the frame rate, which is defaulted', () => {
// 		executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 		expect(animatorSpy).toHaveBeenCalledWith(jasmine.objectContaining({ frameRate: 1.120 }))
// 	})

// 	it('calls animation functions once for each animation, including before rendering starts', () => {
// 		const animationFunction = jasmine.createSpy().and.callFake(p => p * 2)
// 		houndstoothOverrides.basePattern.tileSettings = { tileSizeSetting: 1 }
// 		houndstoothOverrides.animationsPattern = {
// 			tileSettings: {
// 				tileSizeSetting: animationFunction,
// 			},
// 		}

// 		executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 		const animationFunctionCalls = animationFunction.calls.all()
// 		expect(animationFunctionCalls.length).toBe(6)
// 		expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(1)
// 		expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(2)
// 		expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(4)
// 		expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(8)
// 		expect(animationFunctionCalls[ 4 ].args[ 0 ]).toBe(16)
// 		expect(animationFunctionCalls[ 5 ].args[ 0 ]).toBe(32)
// 	})

// 	it('handles animation functions of the current animation frame', () => {
// 		const animationFunction = jasmine.createSpy().and.callFake(() => 1000 - (state.currentAnimationFrame + 1))
// 		houndstoothOverrides.basePattern.tileSettings = { tileSizeSetting: 1000 }
// 		houndstoothOverrides.animationsPattern = {
// 			tileSettings: {
// 				tileSizeSetting: animationFunction,
// 			},
// 		}

// 		executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 		const animationFunctionCalls = animationFunction.calls.all()
// 		expect(animationFunctionCalls.length).toBe(6)
// 		expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(1000)
// 		expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(999)
// 		expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(998)
// 		expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(997)
// 		expect(animationFunctionCalls[ 4 ].args[ 0 ]).toBe(996)
// 		expect(animationFunctionCalls[ 5 ].args[ 0 ]).toBe(995)
// 	})

// 	it('defaults refreshing the canvas to true, and calls clear once for every rendered frame', () => {
// 		const clearSpy = spyOn(canvas, 'clear')

// 		executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 		expect(clearSpy.calls.all().length).toBe(4)
// 	})
// })

// describe('layering and animating', () => {
// 	let houndstoothOverrides
// 	beforeEach(() => {
// 		state.animating = true
// 		houndstoothOverrides = {
// 			basePattern: {
// 				layerSettings: {
// 					startLayer: 5,
// 					endLayer: 8,
// 				},
// 				animationSettings: {
// 					startAnimationFrame: 2,
// 					endAnimationFrame: 5,
// 				},
// 			},
// 		}
// 	})

// 	it('executes grid once for each layer within each animation, both inclusively', () => {
// 		executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 		expect(executeGridSpy.calls.count()).toBe(16)
// 	})

// 	describe('mixing down canvases', () => {
// 		it('mixes down canvases once for each animation between start and end, inclusive, if mixing down', () => {
// 			state.mixingDown = true

// 			executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 			expect(mixDownContextsSpy.calls.count()).toBe(4)
// 		})

// 		it('does not mix down canvases if not mixing down', () => {
// 			executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 			expect(mixDownContextsSpy).not.toHaveBeenCalled()
// 		})
// 	})

// 	it('calls layer functions once for each layer, each animation frame, starting the layer over each animation frame', () => {
// 		houndstoothOverrides.basePattern.tileSettings = { tileSizeSetting: 0 }

// 		const animationFunction = jasmine.createSpy().and.callFake(p => p + 100)
// 		houndstoothOverrides.animationsPattern = {
// 			tileSettings: {
// 				tileSizeSetting: animationFunction,
// 			},
// 		}

// 		const layerFunction = jasmine.createSpy().and.callFake(p => p + (state.currentLayer + 1))
// 		houndstoothOverrides.layersPattern = {
// 			tileSettings: {
// 				tileSizeSetting: layerFunction,
// 			},
// 		}

// 		executeSelectedHoundstoothEffects({ houndstoothOverrides })

// 		const animationFunctionCalls = animationFunction.calls.all()
// 		expect(animationFunctionCalls.length).toBe(6)
// 		expect(animationFunctionCalls[ 0 ].args[ 0 ]).toBe(0)
// 		expect(animationFunctionCalls[ 1 ].args[ 0 ]).toBe(100)
// 		expect(animationFunctionCalls[ 2 ].args[ 0 ]).toBe(200)
// 		expect(animationFunctionCalls[ 3 ].args[ 0 ]).toBe(300)
// 		expect(animationFunctionCalls[ 4 ].args[ 0 ]).toBe(400)
// 		expect(animationFunctionCalls[ 5 ].args[ 0 ]).toBe(500)

// 		const layerFunctionCalls = layerFunction.calls.all()
// 		expect(layerFunctionCalls.length).toBe(32)
// 		expect(layerFunctionCalls[ 0 ].args[ 0 ]).toBe(200)
// 		expect(layerFunctionCalls[ 1 ].args[ 0 ]).toBe(201)
// 		expect(layerFunctionCalls[ 2 ].args[ 0 ]).toBe(203)
// 		expect(layerFunctionCalls[ 3 ].args[ 0 ]).toBe(206)
// 		expect(layerFunctionCalls[ 4 ].args[ 0 ]).toBe(210)
// 		expect(layerFunctionCalls[ 5 ].args[ 0 ]).toBe(215)
// 		expect(layerFunctionCalls[ 6 ].args[ 0 ]).toBe(221)
// 		expect(layerFunctionCalls[ 7 ].args[ 0 ]).toBe(228)

// 		expect(layerFunctionCalls[ 8 ].args[ 0 ]).toBe(300)
// 		expect(layerFunctionCalls[ 9 ].args[ 0 ]).toBe(301)
// 		expect(layerFunctionCalls[ 10 ].args[ 0 ]).toBe(303)
// 		expect(layerFunctionCalls[ 11 ].args[ 0 ]).toBe(306)
// 		expect(layerFunctionCalls[ 12 ].args[ 0 ]).toBe(310)
// 		expect(layerFunctionCalls[ 13 ].args[ 0 ]).toBe(315)
// 		expect(layerFunctionCalls[ 14 ].args[ 0 ]).toBe(321)
// 		expect(layerFunctionCalls[ 15 ].args[ 0 ]).toBe(328)

// 		expect(layerFunctionCalls[ 16 ].args[ 0 ]).toBe(400)
// 		expect(layerFunctionCalls[ 17 ].args[ 0 ]).toBe(401)
// 		expect(layerFunctionCalls[ 18 ].args[ 0 ]).toBe(403)
// 		expect(layerFunctionCalls[ 19 ].args[ 0 ]).toBe(406)
// 		expect(layerFunctionCalls[ 20 ].args[ 0 ]).toBe(410)
// 		expect(layerFunctionCalls[ 21 ].args[ 0 ]).toBe(415)
// 		expect(layerFunctionCalls[ 22 ].args[ 0 ]).toBe(421)
// 		expect(layerFunctionCalls[ 23 ].args[ 0 ]).toBe(428)

// 		expect(layerFunctionCalls[ 24 ].args[ 0 ]).toBe(500)
// 		expect(layerFunctionCalls[ 25 ].args[ 0 ]).toBe(501)
// 		expect(layerFunctionCalls[ 26 ].args[ 0 ]).toBe(503)
// 		expect(layerFunctionCalls[ 27 ].args[ 0 ]).toBe(506)
// 		expect(layerFunctionCalls[ 28 ].args[ 0 ]).toBe(510)
// 		expect(layerFunctionCalls[ 29 ].args[ 0 ]).toBe(515)
// 		expect(layerFunctionCalls[ 30 ].args[ 0 ]).toBe(521)
// 		expect(layerFunctionCalls[ 31 ].args[ 0 ]).toBe(528)
// 	})
// })

// describe('exporting frames (and of course animating)', () => {
// 	const startAnimationFrame = 2
// 	const endAnimationFrame = 5
// 	let houndstoothOverrides
// 	beforeEach(() => {
// 		state.animating = true
// 		state.exportFrames = true
// 		houndstoothOverrides = {
// 			basePattern: {
// 				animationSettings: {
// 					startAnimationFrame,
// 					endAnimationFrame,
// 				},
// 			},
// 		}
// 	})

// 	it('saves the canvas for each animation frame', done => {
// 		animatorSpy.and.callThrough()

// 		const interval = setInterval(() => {
// 			state.lastSavedAnimationFrame++
// 			if (state.lastSavedAnimationFrame >= endAnimationFrame) {
// 				clearInterval(interval)
// 				done()
// 			}
// 			expect(exportFrameSpy.calls.all().length).toBe(state.lastSavedAnimationFrame - startAnimationFrame)
// 		}, 400)

// 		executeSelectedHoundstoothEffects({ houndstoothOverrides })
// 	})
// })


// describe('when layering (but not animating)', () => {
// 			it('logs the current frame along with the performance measurement', () => {
// 				gridAndMaybeLogging()

// 				const consoleWrapperLogSpyCalls = consoleWrapper.log.calls.all()
// 				expect(consoleWrapperLogSpyCalls.length).toBe(11)
// 				consoleWrapperLogSpyCalls.forEach((call, index) => {
// 					expect(call.args[ 0 ]).toBe(`current layer: ${  index}`)
// 				})

// 				const consoleWrapperTimeCalls = consoleWrapper.time.calls.all()
// 				expect(consoleWrapperTimeCalls.length).toBe(11)
// 				consoleWrapperTimeCalls.forEach(call => {
// 					expect(call.args[ 0 ]).toBe('grid')
// 				})

// 				const consoleWrapperTimeEndCalls = consoleWrapper.timeEnd.calls.all()
// 				expect(consoleWrapperTimeEndCalls.length).toBe(11)
// 				consoleWrapperTimeEndCalls.forEach(call => {
// 					expect(call.args[ 0 ]).toBe('grid')
// 				})
// 			})
// 		})

// 		describe('when animating (but not layering)', () => {
// 			beforeEach(() => state.animating = true)

// 			it('logs the current animation frame along with the performance measurement', () => {
// 				gridAndMaybeLogging()

// 				const consoleWrapperLogSpyCalls = consoleWrapper.log.calls.all()
// 				expect(consoleWrapperLogSpyCalls.length).toBe(11)
// 				consoleWrapperLogSpyCalls.forEach((call, index) => {
// 					expect(call.args[ 0 ]).toEqual(`current animation frame / layer: ${index}/0`)
// 				})

// 				const consoleWrapperTimeCalls = consoleWrapper.time.calls.all()
// 				expect(consoleWrapperTimeCalls.length).toBe(11)
// 				consoleWrapperTimeCalls.forEach(call => {
// 					expect(call.args[ 0 ]).toBe('grid')
// 				})

// 				const consoleWrapperTimeEndCalls = consoleWrapper.timeEnd.calls.all()
// 				expect(consoleWrapperTimeEndCalls.length).toBe(11)
// 				consoleWrapperTimeEndCalls.forEach(call => {
// 					expect(call.args[ 0 ]).toBe('grid')
// 				})
// 			})
// 		})

// 		describe('when animating and layering', () => {
// 			beforeEach(() => state.animating = true)

// 			it('logs the animation frames, current layer, and grid performance', () => {
// 				gridAndMaybeLogging()

// 				const consoleWrapperLogSpyCalls = consoleWrapper.log.calls.all()
// 				expect(consoleWrapperLogSpyCalls.length).toBe(121)
// 				consoleWrapperLogSpyCalls.forEach((call, index) => {
// 					const currentAnimationFrame = Math.floor(index / 11)
// 					const currentLayer = index % 11
// 					expect(call.args[ 0 ]).toEqual(`current animation frame / layer: ${currentAnimationFrame}/${currentLayer}`)
// 				})

// 				const consoleWrapperTimeCalls = consoleWrapper.time.calls.all()
// 				expect(consoleWrapperTimeCalls.length).toBe(121)
// 				consoleWrapperTimeCalls.forEach(call => {
// 					expect(call.args[ 0 ]).toBe('grid')
// 				})

// 				const consoleWrapperTimeEndCalls = consoleWrapper.timeEnd.calls.all()
// 				expect(consoleWrapperTimeEndCalls.length).toBe(121)
// 				consoleWrapperTimeEndCalls.forEach(call => {
// 					expect(call.args[ 0 ]).toBe('grid')
// 				})
// 			})
// 		})
