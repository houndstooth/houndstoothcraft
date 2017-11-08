import { DataBlob } from '../../../../../src/app/page/types'
import * as saveBlob from '../../../../../src/pattern/animation/saveBlob'
import { saveFrame } from '../../../../../src/pattern/animation/saveFrame'
import { state } from '../../../../../src/state'
import * as to from '../../../../../src/to'

describe('save frame', () => {
	const result: DataBlob = {}
	beforeEach(() => {
		state.lastSavedFrame = to.Frame(666)
		spyOn(saveBlob, 'saveBlob')

		saveFrame(result)
	})

	it('saves the frame as a png with the frame number as file name', () => {
		expect(saveBlob.saveBlob).toHaveBeenCalledWith({ blob: result, name: '666.png' })
	})

	it('increments the last saved frame', () => {
		expect(state.lastSavedFrame).toBe(to.Frame(667))
	})
})
