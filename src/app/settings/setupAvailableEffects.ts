import { NamedEffect } from '../../types'
import { appState } from '../appState'
import { makeId } from '../dom'

const setupAvailableEffects: (_: NamedEffect[]) => void =
	(allEffects: NamedEffect[]): void => {
		// tslint:disable-next-line:no-object-literal-type-assertion
		appState.settings.availableEffects = allEffects.reduce(reduceAvailableEffects, {} as { [_: string]: NamedEffect })
	}

const reduceAvailableEffects: (_: { [_: string]: NamedEffect }, __: NamedEffect) => { [_: string]: NamedEffect } =
	(availableEffects: { [_: string]: NamedEffect }, effect: NamedEffect): { [_: string]: NamedEffect } => ({
		...availableEffects,
		[ makeId.default(effect.name) ]: effect,
	})

export default setupAvailableEffects
