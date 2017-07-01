import 'jasmine'
import '../src/settings/settings'
import '../src/settings/current'

beforeEach(() => {
	Object.keys(settings.initial).forEach(key => delete settings.initial[key])
	Object.keys(settings.iterations).forEach(key => delete settings.iterations[key])
	Object.keys(settings.animations).forEach(key => delete settings.animations[key])
	current.iterationFrame = 0
	current.animationFrame = 0
})
