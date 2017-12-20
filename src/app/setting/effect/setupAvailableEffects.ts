import { NamedEffect } from '../../../types'
import { codeUtilities, ObjectOf } from '../../../utilities'
import { appState } from '../../appState'

const setupAvailableEffects: (_: NamedEffect[]) => void =
	(allEffects: NamedEffect[]): void => {
		// tslint:disable-next-line:no-object-literal-type-assertion
		appState.settings.availableEffects = allEffects.reduce(reduceAvailableEffects, {} as ObjectOf<NamedEffect>)
	}

const reduceAvailableEffects: (_: ObjectOf<NamedEffect>, __: NamedEffect) => ObjectOf<NamedEffect> =
	(availableEffects: ObjectOf<NamedEffect>, effect: NamedEffect): ObjectOf<NamedEffect> => ({
		...availableEffects,
		[ codeUtilities.idify(effect.name) ]: effect,
	})

export default setupAvailableEffects
