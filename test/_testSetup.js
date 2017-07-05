import 'jasmine'
import '../globalCurrent'

beforeEach(() => {
	Object.keys(current.settings.initial).forEach(key => delete current.settings.initial[key])
	Object.keys(current.settings.iterations).forEach(key => delete current.settings.iterations[key])
	Object.keys(current.settings.animations).forEach(key => delete current.settings.animations[key])
	current.iterationFrame = 0
	current.animationFrame = 0
})
