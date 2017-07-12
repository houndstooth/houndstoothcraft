import 'jasmine'
import '../globalCurrent'
import clear from '../src/render/clear'
import testClear from './helpers/testClear'

beforeEach(() => {
	Object.keys(current.settings.initial).forEach(key => delete current.settings.initial[key])
	Object.keys(current.settings.iterations).forEach(key => delete current.settings.iterations[key])
	Object.keys(current.settings.animations).forEach(key => delete current.settings.animations[key])
	current.iterationFrame = 0
	current.animationFrame = 0
	current.lastSavedAnimationFrame = 0
	current.interval = null
	clear()
	testClear()
})

describe('clean up (the 2000 may need to be updated as test suite grows)', () => {
	it('removes canvases when you run the entire test suite', () => {
		setTimeout(() => {
			console.log("DIE CANVAS")
			const place = document.querySelector('.place')
			if (place) place.parentElement.removeChild(place)
			const realCanvas = document.querySelector('.realCanvas')
			if (realCanvas) realCanvas.parentElement.removeChild(realCanvas)
		}, 2000)
	})
})
