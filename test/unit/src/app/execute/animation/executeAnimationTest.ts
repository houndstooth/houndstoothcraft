import {
	animation,
	appState,
	executeAnimation,
	ExecuteParams,
	globalWrapper,
	SettingFunctionObject,
} from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('execute animation', () => {
	let subject: (_: ExecuteParams) => Promise<void>

	const animationInterval: number = 34987

	let layerFunctionObjects: SettingFunctionObject[]
	let animationFunctionObjects: SettingFunctionObject[]

	let setIntervalSpy: Spy

	beforeEach(() => {
		subject = executeAnimation.default
		layerFunctionObjects = []
		animationFunctionObjects = []
		setIntervalSpy = spyOn(globalWrapper.window, 'setInterval')
		setIntervalSpy.and.returnValue(animationInterval)

		spyOn(animation, 'default').and.callFake(async (): Promise<void> => undefined)
	})

	it('schedules a function to be run at the frame rate, 30', () => {
		subject({ layerFunctionObjects, animationFunctionObjects }).then().catch()

		expect(globalWrapper.window.setInterval).toHaveBeenCalledWith(jasmine.any(Function), 30)
	})

	it('the function scheduled to run includes animation', () => {
		subject({ layerFunctionObjects, animationFunctionObjects }).then().catch()
		expect(animation.default).not.toHaveBeenCalled()

		// tslint:disable-next-line:no-unsafe-any
		setIntervalSpy.calls.all()[0].args[0]()

		expect(animation.default).toHaveBeenCalledWith({ layerFunctionObjects, animationFunctionObjects })
	})

	it('saves this interval-repeating function where it can be found to be stopped later', () => {
		subject({ layerFunctionObjects, animationFunctionObjects }).then().catch()

		expect(appState.execute.animationInterval).toBe(animationInterval)
	})

	// tslint:disable-next-line:max-line-length
	it('stores the resolve function of a promise on the state where it can be found to be resolved from elsewhere later', () => {
		const oldResolveAnimation: () => void = appState.execute.resolveAnimation

		subject({ layerFunctionObjects, animationFunctionObjects }).then().catch()

		expect(appState.execute.resolveAnimation).not.toEqual(oldResolveAnimation)
	})
})
