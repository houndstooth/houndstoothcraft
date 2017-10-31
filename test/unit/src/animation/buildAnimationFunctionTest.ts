import { buildAnimationFunction } from '../../../../src/animation/buildAnimationFunction'
import * as exportFrame from '../../../../src/animation/exportFrame'
import * as canvas from '../../../../src/canvas'
import { Unit } from '../../../../src/components/types'
import * as execute from '../../../../src/execute'
import { SettingsFunctionObject } from '../../../../src/execute/types'
import { state } from '../../../../src/state'
import { setSetting } from '../../../../src/store/setSetting'
import * as from from '../../../../src/utilities/from'
import * as to from '../../../../src/utilities/to'
import { NullarySideEffector } from '../../../../src/utilities/types'
import { Frame } from '../../../../src/animation/types'
import { getFromBaseOrDefaultPattern } from '../../../../src/store/getFromBaseOrDefaultPattern'
import Spy = jasmine.Spy
import { callFunctionsPerSetting } from '../../../../src/execute/callFunctionsPerSetting'
import * as executeLayer from '../../../../src/execute/executeLayer'
import * as gridAndMaybeLogging from '../../../../src/execute/gridAndMaybeLogging'

describe('build animation function returns an animation function', () => {
	let animationFunction: NullarySideEffector
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
		executeGridSpy = spyOn(execute, 'executeGrid')
		callFunctionsPerSettingSpy = spyOn(execute, 'callFunctionsPerSetting')
		spyOn(canvas, 'clear')
		spyOn(exportFrame, 'exportFrame')

		animationFunction = buildAnimationFunction({
			animationFunctionObjects,
			layerFunctionObjects,
		})
	})

	it('executes a grid with the layer functions', () => {
		animationFunction()

		expect(executeGridSpy).toHaveBeenCalledWith({ layerFunctionObjects })
	})

	it('animates based on the first layer, so reset the pattern to the first layer after each frame', () => {
		setSetting('tileSize', to.Unit(0))
		setSetting('endLayer', to.Layer(3))
		executeGridSpy.and.callThrough()
		callFunctionsPerSettingSpy.and.callThrough()
		const executeLayerSpy: Spy = spyOn(executeLayer, 'executeLayer').and.callThrough()
		spyOn(gridAndMaybeLogging, 'gridAndMaybeLogging')

		animationFunction()

		expect(executeLayerSpy.calls.all().length).toBe(4)
		expect(executeLayerSpy.calls.all()[0].args[0]).toEqual(jasmine.objectContaining({ currentLayer: 0}))
		expect(executeLayerSpy.calls.all()[1].args[0]).toEqual(jasmine.objectContaining({ currentLayer: 1}))
		expect(executeLayerSpy.calls.all()[2].args[0]).toEqual(jasmine.objectContaining({ currentLayer: 2}))
		expect(executeLayerSpy.calls.all()[3].args[0]).toEqual(jasmine.objectContaining({ currentLayer: 3}))
		expect(getFromBaseOrDefaultPattern('tileSize')).toBe(to.Unit(10))

		animationFunction()

		expect(executeLayerSpy.calls.all().length).toBe(8)
		expect(executeLayerSpy.calls.all()[0].args[0]).toEqual(jasmine.objectContaining({ currentLayer: 0}))
		expect(executeLayerSpy.calls.all()[1].args[0]).toEqual(jasmine.objectContaining({ currentLayer: 1}))
		expect(executeLayerSpy.calls.all()[2].args[0]).toEqual(jasmine.objectContaining({ currentLayer: 2}))
		expect(executeLayerSpy.calls.all()[3].args[0]).toEqual(jasmine.objectContaining({ currentLayer: 3}))
		expect(getFromBaseOrDefaultPattern('tileSize')).toBe(to.Unit(20))
	})

	it('updates settings for the next frame', () => {
		animationFunction()

		expect(execute.callFunctionsPerSetting).toHaveBeenCalledWith({
			settingsFunctionObjects: animationFunctionObjects,
		})
	})

	describe('canvas clearing', () => {
		it('clears the canvas by default', () => {
			animationFunction()

			expect(canvas.clear).toHaveBeenCalled()
		})

		it('does not clear the canvas if refreshing the canvas is off', () => {
			setSetting('refreshCanvas', false)

			animationFunction()

			expect(canvas.clear).not.toHaveBeenCalled()
		})
	})

	describe('frame exporting', () => {
		const currentFrame: Frame = to.Frame(5)
		beforeEach(() => {
			state.exportFrames = true
			state.currentFrame = currentFrame
		})

		describe('when the current frame has not yet completed exporting', () => {
			beforeEach(() => {
				state.lastSavedFrame = to.Frame(4)

				animationFunction()
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
			beforeEach(() => {
				state.lastSavedFrame = currentFrame

				animationFunction()
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
		it('does not execute the grid if the current frame is less than the start frame', () => {
			state.currentFrame = to.Frame(5)
			setSetting('startFrame', to.Frame(8))

			animationFunction()

			expect(executeGridSpy).not.toHaveBeenCalled()
		})
	})

})
