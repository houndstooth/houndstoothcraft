import { getCurrentContext } from '../../app'
import { NullarySideEffector } from '../../utilities'
import { get } from '../patternState'

const applyOpacity: NullarySideEffector =
	(): void => {
		const opacity: number = get('opacity')
		if (!opacity || opacity === 1) {
			return
		}

		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.globalAlpha = opacity
	}

export default applyOpacity
