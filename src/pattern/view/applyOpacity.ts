import { Context, getCurrentContext } from '../../app'
// tslint:disable-next-line:no-reaching-imports
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
