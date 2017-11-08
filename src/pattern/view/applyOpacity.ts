import { Context, getCurrentContext } from '../../app'
import { getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import { NullarySideEffector } from '../../utilities'

const applyOpacity: NullarySideEffector =
	(): void => {
		const opacity: number = getFromBaseOrDefaultPattern('opacity')
		if (!opacity || opacity === 1) {
			return
		}

		const context: Context = getCurrentContext()
		context.globalAlpha = opacity
	}

export { applyOpacity }
