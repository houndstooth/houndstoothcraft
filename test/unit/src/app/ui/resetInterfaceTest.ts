import {
	cancelPreviousPattern,
	clearContexts,
	clearInterval,
	clearMixedDownContext,
	Context,
	documentWrapper,
	PageElement,
	resetInterface,
	resetMainHoundstooth,
	resetMixedDownContext,
	state,
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
		spyOn(cancelPreviousPattern, 'default')
		spyOn(resetMainHoundstooth, 'default')

		resetInterface.default()
	})

	it('clears descriptions', () => {
		expect(descriptionsContainer.innerHTML).toBe('')
	})

	it('clears contexts', () => {
		expect(clearContexts.default).toHaveBeenCalled()
	})

	it('clears the mixed down context', () => {
		expect(clearMixedDownContext.default).toHaveBeenCalled()
	})

	it('clears any active animation', () => {
		expect(clearInterval.default).toHaveBeenCalledWith('interval')
	})

	it('clears any active rendering progress measurement', () => {
		expect(clearInterval.default).toHaveBeenCalledWith('gridProgressInterval')
	})

	it('resets the main houndstooth', () => {
		expect(resetMainHoundstooth.default).toHaveBeenCalled()
	})

	it('cancels the previous pattern', () => {
		expect(cancelPreviousPattern.default).toHaveBeenCalled()
	})
})
