import { NullarySideEffector, setSetting, state, to, updateProgress } from '../../../../../src'

const subject: NullarySideEffector = updateProgress.default

describe('update progress', () => {
	beforeEach(() => {
		state.controls.currentFrame = to.Frame(909)
		state.execute.tileCount = 200000
		state.execute.tilesCompleted = 180001
	})

	it('updates the progress bar', () => {
		subject()

		expect(state.dom.progressBar.style.width).toBe('91%')
	})

	describe('layers progress bar', () => {
		it('when layering, shows the total progress toward all layers done', () => {
			state.execute.currentLayer = to.Layer(5)
			setSetting.default('endLayer', to.Layer(9))

			subject()

			expect(state.dom.layersProgressBar.style.width).toBe('59.1%')
		})

		it('when not layering, is the same as the grid progress bar', () => {
			subject()

			expect(state.dom.layersProgressBar.style.width).toBe('91%')
		})
	})

	describe('progress message', () => {
		it('when animating and layering', () => {
			state.execute.currentLayer = to.Layer(5)
			setSetting.default('endLayer', to.Layer(9))
			state.controls.animating = true

			subject()

			expect(state.dom.progressMessage.textContent).toBe('Rendering frame 909, layer 5/9: 91%')
		})

		it('when only animating', () => {
			state.controls.animating = true

			subject()

			expect(state.dom.progressMessage.textContent).toBe('Rendering frame 909: 91%')
		})

		it('when only layering', () => {
			state.execute.currentLayer = to.Layer(5)
			setSetting.default('endLayer', to.Layer(9))

			subject()

			expect(state.dom.progressMessage.textContent).toBe('Rendering layer 5/9: 91%')
		})

		it('when neither animating nor layering', () => {
			subject()

			expect(state.dom.progressMessage.textContent).toBe('Rendering: 91%')
		})
	})
})
