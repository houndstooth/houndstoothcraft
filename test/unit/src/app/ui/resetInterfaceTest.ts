import {
	clearContexts,
	clearInterval,
	clearMixedDownContext,
	Context,
	documentWrapper,
	NamedEffect,
	PageElement,
	resetInterface,
	resetMixedDownContext,
	state,
	to,
} from '../../../../../src'
import { buildMockContext } from '../../../../helpers'
import { buildMockElement } from '../../../helpers'

describe('reset interface', () => {
	const descriptionsContainer: PageElement = buildMockElement()
	const mixedDownContext: Context = buildMockContext()
	beforeEach(() => {
		spyOn(documentWrapper, 'querySelector').and.returnValue(descriptionsContainer)
		spyOn(clearMixedDownContext, 'default')
		spyOn(resetMixedDownContext, 'default').and.callFake(() => state.mixedDownContext = mixedDownContext)
		spyOn(clearContexts, 'default')
		spyOn(clearInterval, 'default')
	})

	it('clears descriptions', () => {
		resetInterface.default()

		expect(descriptionsContainer.innerHTML).toBe('')
	})

	it('clears contexts', () => {
		resetInterface.default()

		expect(clearContexts.default).toHaveBeenCalled()
	})

	it('clears the mixed down context', () => {
		resetInterface.default()

		expect(clearMixedDownContext.default).toHaveBeenCalled()
	})

	it('clears any active animation', () => {
		resetInterface.default()

		expect(clearInterval.default).toHaveBeenCalledWith('interval')
	})

	it('clears any active rendering progress measurement', () => {
		resetInterface.default()

		expect(clearInterval.default).toHaveBeenCalledWith('gridProgressInterval')
	})

	it('resets the state, except for selected effects, current frame, and mixed down context', () => {
		state.currentFrame = to.Frame(8001)
		const fakeHoundstoothEffect: NamedEffect = {
			animationsPattern: {},
			basePattern: {},
			description: '',
			layersPattern: {},
			name: 'fake',
		}
		state.selectedHoundstoothEffects.push(fakeHoundstoothEffect)

		resetInterface.default()

		expect(state.currentFrame).toBe(to.Frame(8001))
		expect(state.selectedHoundstoothEffects[ 0 ]).toEqual(fakeHoundstoothEffect)
		expect(state.mixedDownContext).toEqual(mixedDownContext)
	})
})
