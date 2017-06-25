import setup from '../src/setup'
import state from '../src/state/state'
import animations from '../src/state/animations'
import iterations from '../src/state/iterations'

import _resetStatesForTest from './_resetStatesForTest'
beforeEach(() => _resetStatesForTest({ 
    state: typeof state === 'undefined' ? {} : state, 
    iterations: typeof iterations === 'undefined' ? {} : iterations, 
    animations: typeof animations === 'undefined' ? {} : animations, 
}))

describe('setup', () => {
    it('logs the state when logging mode is on', () => {
        const logSpy = jasmine.createSpy()
        setup.__Rewire__('log', logSpy)

        setup({ logging: true })

        expect(logSpy).toHaveBeenCalledWith(state)
        setup.__ResetDependency__('log')
    })

    it('does not log the state when logging mode is not on', () => {
        const logSpy = jasmine.createSpy()
        setup.__Rewire__('log', logSpy)

        setup()

        expect(logSpy).not.toHaveBeenCalled()
        setup.__ResetDependency__('log')
    })

    it('sets up the canvas', () => {
        const setupCanvasSpy = jasmine.createSpy()
        setup.__Rewire__('setupCanvas', setupCanvasSpy)

        setup()

        expect(setupCanvasSpy).toHaveBeenCalled()

        setup.__ResetDependency__('setupCanvas')
    })
})