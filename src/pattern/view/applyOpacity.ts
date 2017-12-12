import { getCurrentContext } from '../../app'
import { NullarySideEffector } from '../../utilities'
import { patternState } from '../patternState'

const applyOpacity: NullarySideEffector =
	(): void => {
		const opacity: number = patternState.colorSettings.opacity
		if (!opacity || opacity === 1) {
			return
		}

		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.globalAlpha = opacity
	}

export default applyOpacity
