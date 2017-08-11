describe('canvas', () => {
	beforeEach(() => {
		delete require.cache[ require.resolve('../../../src/interface/canvas') ]

		const preexistingCanvas = document.querySelector('.realCanvas')
		if (preexistingCanvas) preexistingCanvas.parentNode.removeChild(preexistingCanvas)
	})

	describe('when the canvas already exists on the document', () => {
		let realCanvas
		beforeEach(() => {
			realCanvas = document.createElement('canvas')
			realCanvas.classList.add('realCanvas')
			document.body.appendChild(realCanvas)
		})

		it('returns the canvas', () => {
			const returnedCanvas = require('../../../src/interface/canvas').default

			expect(returnedCanvas.isSameNode(realCanvas)).toBe(true)
		})
	})

	describe('when the canvas does not already exist on the document', () => {
		let returnedCanvas
		beforeEach(() => returnedCanvas = require('../../../src/interface/canvas').default)

		it('returns the newly created canvas', () => {
			const realCanvas = document.querySelector('.realCanvas')
			expect(returnedCanvas.isSameNode(realCanvas)).toBe(true)
		})

		it('creates the canvas and adds it to the document', () => {
			const expectedCanvas = document.createElement('canvas')
			expectedCanvas.classList.add('realCanvas')
			expect(returnedCanvas.isEqualNode(expectedCanvas)).toBe(true)
		})
	})
})
