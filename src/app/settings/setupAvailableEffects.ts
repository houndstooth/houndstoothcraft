import { NamedEffect } from '../../types'
import { ObjectOf } from '../../utilities'
import { appState } from '../appState'
import { makeId } from '../dom'

const setupAvailableEffects: (_: NamedEffect[]) => void =
	(allEffects: NamedEffect[]): void => {
		// tslint:disable-next-line:no-object-literal-type-assertion
		appState.settings.availableEffects = allEffects.reduce(reduceAvailableEffects, {} as ObjectOf<NamedEffect>)
	}

const reduceAvailableEffects: (_: ObjectOf<NamedEffect>, __: NamedEffect) => ObjectOf<NamedEffect> =
	(availableEffects: ObjectOf<NamedEffect>, effect: NamedEffect): ObjectOf<NamedEffect> => ({
		...availableEffects,
		[ makeId.default(effect.name) ]: effect,
	})

export default setupAvailableEffects
