import { documentWrapper, Frame, state, to, updateCurrentFrame } from '../../../../../src'
import { buildMockElement } from '../../../helpers'

const subject: (frame: Frame) => void = updateCurrentFrame.default

describe('update current frame', () => {
	let frameInput: HTMLInputElement
	beforeEach(() => {
		frameInput = buildMockElement() as HTMLInputElement
		spyOn(documentWrapper, 'querySelector').and.returnValue(frameInput)

		subject(to.Frame(543))
	})

	it('updates the current frame on the state', () => {
		expect(state.currentFrame).toBe(to.Frame(543))
	})

	it('updates the current frame in the frame input', () => {
		expect(frameInput.value).toBe('543')
	})
})
