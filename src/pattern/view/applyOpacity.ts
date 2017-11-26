import { Context, getCurrentContext, getFromBaseOrDefaultPattern } from '../../app'
import { NullarySideEffector } from '../../utilities'

const applyOpacity: NullarySideEffector =
	(): void => {
		const opacity: number = getFromBaseOrDefaultPattern.main('opacity')
		if (!opacity || opacity === 1) {
			return
		}

		const context: Context = getCurrentContext.main()
		context.globalAlpha = opacity
	}

export { applyOpacity as main }
