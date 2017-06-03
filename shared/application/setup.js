import setupCanvas from '../render/setupCanvas'
import defaultIterations from '../state/defaultIterations'
import overrideIterations from '../state/overrideIterations'
import iterations from '../state/iterations'
import defaultAnimations from '../state/defaultAnimations'
import overrideAnimations from '../state/overrideAnimations'
import animations from '../state/animations'
import defaultState from '../state/defaultState'
import overrideState from '../state/overrideState'
import state from '../state/state'
import applicationUtilities from '../utilities/applicationUtilities'

const applyOverrides = ({ objectWithPropertiesToOverride, overrides, nestedPropertyPath = [] }) => {
	const { deeperPath, accessChildObjectOrCreatePath } = applicationUtilities
	overrides && Object.entries(overrides).forEach(([ propertyName, overridingProperty ]) => {
		if (overridingProperty && typeof overridingProperty === 'object' && !overridingProperty.length) {
			applyOverrides({
				objectWithPropertiesToOverride,
				overrides: overridingProperty,
				nestedPropertyPath: deeperPath({ nestedPropertyPath, propertyName })
			})
		} else {
			let objectWithPropertyToOverride = accessChildObjectOrCreatePath({
				parentObject: objectWithPropertiesToOverride,
				nestedPropertyPath
			})
			objectWithPropertyToOverride[ propertyName ] = overridingProperty
		}
	})
}

const setupObject = ({ objectToSetup, defaults, presets, overrides }) => {
	applicationUtilities.resetObject({ objectToReset: objectToSetup, objectToResetTo: defaults })
	applyOverrides({ objectWithPropertiesToOverride: objectToSetup, overrides: presets })
	applyOverrides({ objectWithPropertiesToOverride: objectToSetup, overrides: overrides })
}

const processPresets = ({ presets }) => {
	const presetState = {}
	const presetIterations = {}
	const presetAnimations = {}

	presets.forEach(preset => {
		applyOverrides({ objectWithPropertiesToOverride: presetState, overrides: preset.state })
		applyOverrides({ objectWithPropertiesToOverride: presetIterations, overrides: preset.iterations })
		applyOverrides({ objectWithPropertiesToOverride: presetAnimations, overrides: preset.animations })
	})

	return { presetState, presetIterations, presetAnimations }
}

export default ({ presets }) => {
	const { presetState, presetIterations, presetAnimations } = processPresets({ presets })
	setupObject({ objectToSetup: state, defaults: defaultState, presets: presetState, overrides: overrideState })
	setupObject({
		objectToSetup: iterations,
		defaults: defaultIterations,
		presets: presetIterations,
		overrides: overrideIterations
	})
	setupObject({
		objectToSetup: animations,
		defaults: defaultAnimations,
		presets: presetAnimations,
		overrides: overrideAnimations
	})
	setupCanvas()
	// console.log(state)
}