import * as app from '../../../../../src/app'
import { SettingsFunctionObject } from '../../../../../src/app/execute/types'
import { getFromBaseOrDefaultPattern } from '../../../../../src/app/store/getFromBaseOrDefaultPattern'
import { setSetting } from '../../../../../src/app/store/setSetting'
import * as from from '../../../../../src/from'
import { buildAnimationFunction } from '../../../../../src/pattern/animation/buildAnimationFunction'
import * as exportFrame from '../../../../../src/pattern/animation/exportFrame'
import { Frame } from '../../../../../src/pattern/animation/types'
import * as executePattern from '../../../../../src/pattern/executePattern'
import * as grid from '../../../../../src/pattern/grid'
import { Unit } from '../../../../../src/pattern/grid/types'
import Spy = jasmine.Spy
import * as layer from '../../../../../src/pattern/layer'
import { state } from '../../../../../src/state'
import * as to from '../../../../../src/to'
import { NullaryVoidPromise } from '../../../../../src/utilities/types'

describe('build animation function returns an animation function', () => {
	let animationFunction: NullaryVoidPromise
	let executePatternSpy: Spy
	let callFunctionsPerSettingSpy: Spy

	const layerFunctionObjects: SettingsFunctionObject[] = [ {
		settingName: to.SettingsStep('tileSize'),
		settingsFunction: (size: Unit): Unit => to.Unit(from.Unit(size) + 1),
		settingsPath: to.SettingsPath([ 'tileSettings' ]),
	} ]

	const animationFunctionObjects: SettingsFunctionObject[] = [ {
		settingName: to.SettingsStep('tileSize'),
		settingsFunction: (size: Unit): Unit => to.Unit(from.Unit(size) + 10),
		settingsPath: to.SettingsPath([ 'tileSettings' ]),
	} ]

	beforeEach(() => {
		executePatternSpy = spyOn(executePattern, 'executePattern')
		callFunctionsPerSettingSpy = spyOn(app, 'callFunctionsPerSetting')
		spyOn(app, 'clear')
		spyOn(exportFrame, 'exportFrame')

		animationFunction = buildAnimationFunction({
			animationFunctionObjects,
			layerFunctionObjects,
		})
	})

	it('executes a grid with the layer functions', async (done: DoneFn) => {
		await animationFunction()

		expect(executePatternSpy).toHaveBeenCalledWith({ layerFunctionObjects })

		done()
	})

	// tslint:disable-next-line:max-line-length
	it('animates based on the first layer, so reset the pattern to the first layer after each frame', async (done: DoneFn) => {
		setSetting('tileSize', to.Unit(0))
		setSetting('endLayer', to.Layer(3))
		executePatternSpy.and.callThrough()
		callFunctionsPerSettingSpy.and.callThrough()
		const executeLayerSpy: Spy = spyOn(layer, 'executeLayer').and.callThrough()
		spyOn(grid, 'executeGridAndMaybeLogging')

		await animationFunction()

		expect(executeLayerSpy.calls.all().length).toBe(4)
		expect(executeLayerSpy.calls.all()[0].args[0]).toEqual(jasmine.objectContaining({ layer: 0 }))
		expect(executeLayerSpy.calls.all()[1].args[0]).toEqual(jasmine.objectContaining({ layer: 1 }))
		expect(executeLayerSpy.calls.all()[2].args[0]).toEqual(jasmine.objectContaining({ layer: 2 }))
		expect(executeLayerSpy.calls.all()[3].args[0]).toEqual(jasmine.objectContaining({ layer: 3 }))
		expect(getFromBaseOrDefaultPattern('tileSize')).toBe(to.Unit(10))

		await animationFunction()

		expect(executeLayerSpy.calls.all().length).toBe(8)
		expect(executeLayerSpy.calls.all()[0].args[0]).toEqual(jasmine.objectContaining({ layer: 0 }))
		expect(executeLayerSpy.calls.all()[1].args[0]).toEqual(jasmine.objectContaining({ layer: 1 }))
		expect(executeLayerSpy.calls.all()[2].args[0]).toEqual(jasmine.objectContaining({ layer: 2 }))
		expect(executeLayerSpy.calls.all()[3].args[0]).toEqual(jasmine.objectContaining({ layer: 3 }))
		expect(getFromBaseOrDefaultPattern('tileSize')).toBe(to.Unit(20))

		done()
	})

	it('updates settings for the next frame', async (done: DoneFn) => {
		await animationFunction()

		expect(app.callFunctionsPerSetting).toHaveBeenCalledWith({
			settingsFunctionObjects: animationFunctionObjects,
		})

		done()
	})

	describe('canvas clearing', () => {
		it('clears the canvas by default', async (done: DoneFn) => {
			await animationFunction()

			expect(app.clear).toHaveBeenCalled()

			done()
		})

		it('does not clear the canvas if refreshing the canvas is off', async (done: DoneFn) => {
			setSetting('refreshCanvas', false)

			await animationFunction()

			expect(app.clear).not.toHaveBeenCalled()

			done()
		})
	})

	describe('frame exporting', () => {
		const currentFrame: Frame = to.Frame(5)
		beforeEach(() => {
			state.exportFrames = true
			state.currentFrame = currentFrame
		})

		describe('when the current frame has not yet completed exporting', () => {
			beforeEach(async (done: DoneFn) => {
				state.lastSavedFrame = to.Frame(4)

				await animationFunction()

				done()
			})

			it('does not execute the grid', () => {
				expect(executePatternSpy).not.toHaveBeenCalled()
			})

			it('does not increment the current frame', () => {
				expect(state.currentFrame).toBe(currentFrame)
			})

			it('does not update the settings for the next frame', () => {
				expect(app.callFunctionsPerSetting).not.toHaveBeenCalled()
			})

			it('does not export again', () => {
				expect(exportFrame.exportFrame).not.toHaveBeenCalled()
			})
		})

		describe('when the current frame has has already been exported', () => {
			beforeEach(async (done: DoneFn) => {
				state.lastSavedFrame = currentFrame

				await animationFunction()

				done()
			})

			it('still executes the grid', () => {
				expect(executePatternSpy).toHaveBeenCalled()
			})

			it('increments the current frame', () => {
				expect(state.currentFrame).toBe(to.Frame(6))
			})

			it('still updates the settings for the next frame', () => {
				expect(app.callFunctionsPerSetting).toHaveBeenCalled()
			})

			it('exports again', () => {
				expect(exportFrame.exportFrame).toHaveBeenCalled()
			})
		})
	})

	describe('starting to show the animation at a frame besides the first one', () => {
		it('does not execute the grid if the current frame is less than the start frame', async (done: DoneFn) => {
			state.currentFrame = to.Frame(5)
			setSetting('startFrame', to.Frame(8))

			await animationFunction()

			expect(executePatternSpy).not.toHaveBeenCalled()

			done()
		})
	})
})