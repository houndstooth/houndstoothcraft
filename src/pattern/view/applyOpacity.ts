import { getCurrentContext } from '../../app'
import { patternState } from '../patternState'

const applyOpacity: () => void =
	(): void => {
		const opacity: number = patternState.colorSettings.opacity
		if (opacity === 1) {
			return
		}

		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.globalAlpha = opacity
	}

export default applyOpacity
