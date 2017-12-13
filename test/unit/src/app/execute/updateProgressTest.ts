import { appState, to, updateProgress } from '../../../../../src/indexForTest'

describe('update progress', () => {
	let subject: () => void
	beforeEach(() => {
		subject = updateProgress.default
		appState.controls.currentFrame = to.Frame(909)
		appState.execute.tileCount = 200000
		appState.execute.tilesCompleted = 180001
	})

	it('updates the progress bar', () => {
		subject()

		expect(appState.dom.progressBar.style.width).toBe('91%')
	})

	describe('layers progress bar', () => {
		it('when layering, shows the total progress toward all layers done', () => {
			appState.execute.currentLayer = to.Layer(5)
			appState.controls.endLayer = to.Layer(9)

			subject()

			expect(appState.dom.layersProgressBar.style.width).toBe('59.1%')
		})

		it('when not layering, is the same as the grid progress bar', () => {
			subject()

			expect(appState.dom.layersProgressBar.style.width).toBe('91%')
		})
	})

	describe('progress message', () => {
		it('when animating and layering', () => {
			appState.execute.currentLayer = to.Layer(5)
			appState.controls.endLayer = to.Layer(9)
			appState.controls.animating = true

			subject()

			expect(appState.dom.progressMessage.textContent).toBe('Rendering frame 909, layer 5/9: 91%')
		})

		it('when only animating', () => {
			appState.controls.animating = true

			subject()

			expect(appState.dom.progressMessage.textContent).toBe('Rendering frame 909: 91%')
		})

		it('when only layering', () => {
			appState.execute.currentLayer = to.Layer(5)
			appState.controls.endLayer = to.Layer(9)

			subject()

			expect(appState.dom.progressMessage.textContent).toBe('Rendering layer 5/9: 91%')
		})

		it('when neither animating nor layering', () => {
			subject()

			expect(appState.dom.progressMessage.textContent).toBe('Rendering: 91%')
		})
	})
})
