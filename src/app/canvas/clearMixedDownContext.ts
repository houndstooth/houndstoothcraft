import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { getSetting } from '../store'
import clearContext from './clearContext'

const clearMixedDownContext: NullarySideEffector =
	(): void =>	{
		clearContext({ canvasSize: getSetting.default('canvasSize'), context: state.mixedDownContext })
	}

export default clearMixedDownContext
