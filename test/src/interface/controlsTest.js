import interfaceUtilities from '../../../src/utilities/interfaceUtilities'
let canvas

describe('controls', () => {
	beforeEach(() => {
		delete require.cache[ require.resolve('../../../src/interface/warnings') ]
		delete require.cache[ require.resolve('../../../src/interface/controls') ]
		delete require.cache[ require.resolve('../../../src/interface/canvas') ]
		canvas = require('../../../src/interface/canvas').default

		const preexistingControls = document.querySelector('.controls')
		if (preexistingControls) preexistingControls.parentNode.removeChild(preexistingControls)
	})

	describe('when the controls already exist on the document', () => {
		let controls
		beforeEach(() => {
			controls = document.createElement('div')
			controls.classList.add('controls')
			document.body.appendChild(controls)
		})

		it('returns the controls', () => {
			const returnedControls = require('../../../src/interface/controls').default

			expect(returnedControls.isSameNode(controls)).toBe(true)
		})
	})

	describe('when the controls do not already exist on the document', () => {
		let returnedControls
		beforeEach(() => {
			spyOn(interfaceUtilities, 'insertElementRightAfter').and.callThrough()
			returnedControls = require('../../../src/interface/controls').default
		})

		it('returns the newly created controls', () => {
			const realControls = document.querySelector('.controls')
			expect(returnedControls.isSameNode(realControls)).toBe(true)
		})

		it('creates the controls and adds them to the document', () => {
			const expectedControls = document.createElement('div')
			expectedControls.classList.add('controls')
			expect(returnedControls.isEqualNode(expectedControls)).toBe(true)
		})

		it('inserts the controls after the canvas', () => {
			expect(interfaceUtilities.insertElementRightAfter).toHaveBeenCalledWith(returnedControls, canvas)
		})
	})
})
