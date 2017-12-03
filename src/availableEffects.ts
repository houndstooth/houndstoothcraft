import { NamedEffect } from './pattern'

let effects: NamedEffect[] = []

const set: (_: NamedEffect[]) => void =
	(effectsToSet: NamedEffect[]): void => {
		effects = effectsToSet
	}

const get: () => NamedEffect[] =
	(): NamedEffect[] => effects

export { get, set }
