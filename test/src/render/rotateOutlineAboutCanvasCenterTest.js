import coordinatesMatch from '../helpers/coordinatesMatch'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import rotateOutlineAboutCanvasCenter from '../../../src/outlines/rotateOutlineAboutCanvasCenter'

describe('rotate outline about canvas center', () => {
	const canvasSize = 200
	beforeEach(() => resetStore(store))

	it('works', () => {
		store.mainHoundstooth.basePattern.viewSettings = {
			rotateViewAboutCanvasCenter: Math.PI / 2,
			canvasSize,
		}
		const outline = [
			[ 0, 0 ],
			[ 40, 0 ],
			[ 0, 40 ],
		]

		const actualOutline = rotateOutlineAboutCanvasCenter(outline)

		const expectedOutline = [
			[ 200, 0 ],
			[ 200, 40 ],
			[ 160, 0 ],
		]
		expect(coordinatesMatch(expectedOutline, actualOutline)).toBe(true)
	})

	it('does nothing if rotateViewAboutCanvasCenter is undefined or 0', () => {
		const outline = [
			[ 0, 0 ],
			[ 0, 40 ],
			[ 40, 40 ],
		]

		const actualOutline = rotateOutlineAboutCanvasCenter(outline)

		expect(actualOutline).toEqual(outline)
		expect(actualOutline).toBe(outline)
	})
})
