import '../src/settings/settings'

beforeEach(() => {
	Object.keys(settings.initial).forEach(key => delete settings.initial[key])
	Object.keys(settings.iterations).forEach(key => delete settings.iterations[key])
	Object.keys(settings.animations).forEach(key => delete settings.animations[key])
})
