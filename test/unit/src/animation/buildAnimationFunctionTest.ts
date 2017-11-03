import { buildAnimationFunction } from '../../../../src/animation/buildAnimationFunction'
import * as exportFrame from '../../../../src/animation/exportFrame'
import { Frame } from '../../../../src/animation/types'
import { Unit } from '../../../../src/components/types'
import * as execute from '../../../../src/execute'
import * as executeGridAndMaybeLogging from '../../../../src/execute/executeGridAndMaybeLogging'
import Spy = jasmine.Spy
import * as executeLayer from '../../../../src/execute/executeLayer'
import { SettingsFunctionObject } from '../../../../src/execute/types'
import * as render from '../../../../src/render'
import { state } from '../../../../src/state'
import { getFromBaseOrDefaultPattern } from '../../../../src/store/getFromBaseOrDefaultPattern'
import { setSetting } from '../../../../src/store/setSetting'
import * as from from '../../../../src/utilities/from'
import * as to from '../../../../src/utilities/to'
import { NullaryVoidPromise } from '../../../../src/utilities/types'

describe('build animation function returns an animation function', () => {
	let animationFunction: NullaryVoidPromise
	let executeGridSpy: Spy
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
		executeGridSpy = spyOn(execute, 'executePattern')
		callFunctionsPerSettingSpy = spyOn(execute, 'callFunctionsPerSetting')
		spyOn(render, 'clear')
		spyOn(exportFrame, 'exportFrame')

		animationFunction = buildAnimationFunction({
			animationFunctionObjects,
			layerFunctionObjects,
		})
	})

	it('executes a grid with the layer functions', async (done: DoneFn) => {
		await animationFunction()

		expect(executeGridSpy).toHaveBeenCalledWith({ layerFunctionObjects })

		done()
	})

	// tslint:disable-next-line:max-line-length
	it('animates based on the first layer, so reset the pattern to the first layer after each frame', async (done: DoneFn) => {
		setSetting('tileSize', to.Unit(0))
		setSetting('endLayer', to.Layer(3))
		executeGridSpy.and.callThrough()
		callFunctionsPerSettingSpy.and.callThrough()
		const executeLayerSpy: Spy = spyOn(executeLayer, 'executeLayer').and.callThrough()
		spyOn(executeGridAndMaybeLogging, 'executeGridAndMaybeLogging')

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

		expect(execute.callFunctionsPerSetting).toHaveBeenCalledWith({
			settingsFunctionObjects: animationFunctionObjects,
		})

		done()
	})

	describe('canvas clearing', () => {
		it('clears the canvas by default', async (done: DoneFn) => {
			await animationFunction()

			expect(render.clear).toHaveBeenCalled()

			done()
		})

		it('does not clear the canvas if refreshing the canvas is off', async (done: DoneFn) => {
			setSetting('refreshCanvas', false)

			await animationFunction()

			expect(render.clear).not.toHaveBeenCalled()

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
				expect(executeGridSpy).not.toHaveBeenCalled()
			})

			it('does not increment the current frame', () => {
				expect(state.currentFrame).toBe(currentFrame)
			})

			it('does not update the settings for the next frame', () => {
				expect(execute.callFunctionsPerSetting).not.toHaveBeenCalled()
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
				expect(executeGridSpy).toHaveBeenCalled()
			})

			it('increments the current frame', () => {
				expect(state.currentFrame).toBe(to.Frame(6))
			})

			it('still updates the settings for the next frame', () => {
				expect(execute.callFunctionsPerSetting).toHaveBeenCalled()
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

			expect(executeGridSpy).not.toHaveBeenCalled()

			done()
		})
	})
})
