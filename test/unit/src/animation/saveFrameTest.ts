import * as saveBlob from '../../../../src/animation/saveBlob'
import { saveFrame } from '../../../../src/animation/saveFrame'
import { DataBlob } from '../../../../src/page/types/DataBlob'
import { state } from '../../../../src/state'
import * as to from '../../../../src/utilities/to'

describe('save frame', () => {
	const result: DataBlob = {}
	beforeEach(() => {
		state.lastSavedAnimationFrame = to.Frame(666)
		spyOn(saveBlob, 'saveBlob')

		saveFrame(result)
	})

	it('saves the frame as a png with the frame number as file name', () => {
		expect(saveBlob.saveBlob).toHaveBeenCalledWith({ blob: result, name: '666.png' })
	})

	it('increments the last saved frame', () => {
		expect(state.lastSavedAnimationFrame).toBe(to.Frame(667))
	})
})
