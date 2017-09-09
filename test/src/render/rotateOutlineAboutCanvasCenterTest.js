// import viewUtilities from '../../../src/utilities/viewUtilities'
// import composeMainHoundstooth from '../../../src/store/composeMainHoundstooth'
// import coordinatesMatch from '../helpers/coordinatesMatch'
// import store from '../../../store'
// import resetStore from '../../../src/store/resetStore'

// describe('#rotateOutlineAboutCanvasCenter', () => {
// 	const zoom = 10
// 	const tileSize = 40
// 	const canvasSize = 200

// 	beforeEach(() => {
// 		resetStore(store)
// 		composeMainHoundstooth()
// 	})

// 	it('works', () => {
// 		store.mainHoundstooth.basePattern.viewSettings.rotateViewAboutCanvasCenter = Math.PI / 2
// 		store.mainHoundstooth.basePattern.viewSettings.canvasSize = canvasSize
// 		const outline = [
// 			[ 0, 0 ],
// 			[ 40, 0 ],
// 			[ 0, 40 ],
// 		]

// 		const actualOutline = viewUtilities.rotateOutlineAboutCanvasCenter(outline)

// 		const expectedOutline = [
// 			[ 200, 0 ],
// 			[ 200, 40 ],
// 			[ 160, 0 ],
// 		]
// 		expect(coordinatesMatch(expectedOutline, actualOutline)).toBe(true)
// 	})

// 	it('does nothing if rotateViewAboutCanvasCenter is undefined or 0', () => {
// 		const outline = [
// 			[ 0, 0 ],
// 			[ 0, 40 ],
// 			[ 40, 40 ],
// 		]

// 		const actualOutline = viewUtilities.rotateOutlineAboutCanvasCenter(outline)

// 		expect(actualOutline).toEqual(outline)
// 		expect(actualOutline).toBe(outline)
// 	})
// })
// 