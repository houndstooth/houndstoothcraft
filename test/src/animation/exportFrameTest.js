import exportFrame from '../../../src/animation/exportFrame'
import fileSaver from 'file-saver'
import state from '../../../src/state'

describe('export frame', () => {
	let toBlobSpy
	beforeEach(() => {
		state.lastSavedAnimationFrame = 666

		toBlobSpy = jasmine.createSpy()
		toBlobSpy.and.callFake(callTheFunctionThrough => callTheFunctionThrough())
		state.mixedDownContext = { context: { canvas: { toBlob: toBlobSpy } } }

		spyOn(fileSaver, 'saveAs')

		exportFrame()
	})

	it('calls toBlob on the mixed down canvas', () => {
		expect(toBlobSpy).toHaveBeenCalled()
	})

	it('saves the frame as a png with the frame number as file name', () => {
		expect(fileSaver.saveAs.calls.all()[ 0 ].args[ 1 ]).toBe('666.png')
	})

	it('increments the last saved frame', () => {
		expect(state.lastSavedAnimationFrame).toBe(667)
	})
})
