import { Context, getCurrentContext, getSetting } from '../../app'
import { NullarySideEffector } from '../../utilities'

const applyOpacity: NullarySideEffector =
	(): void => {
		const opacity: number = getSetting.default('opacity')
		if (!opacity || opacity === 1) {
			return
		}

		const context: Context = getCurrentContext.default()
		context.globalAlpha = opacity
	}

export default applyOpacity
