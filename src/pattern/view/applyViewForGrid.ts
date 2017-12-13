import { getCurrentContext } from '../../app'
import { CANVAS_SIZE } from '../../constants'
import { Color } from '../../types'
import { from } from '../../utilities'
import { parseColor } from '../color'
import { patternState } from '../patternState'

const applyViewForGrid: () => void =
	(): void => {
		applyOpacity()
		applyBackgroundColor()
	}

const applyOpacity: () => void =
	(): void => {
		const opacity: number = patternState.colorSettings.opacity
		if (opacity === 1) {
			return
		}

		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.globalAlpha = opacity
	}

const applyBackgroundColor: () => void =
	(): void => {
		const backgroundColor: Color = patternState.colorSettings.backgroundColor
		if (backgroundColor.a === 0) {
			return
		}

		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.fillStyle = parseColor.default(backgroundColor)
		context.fillRect(0, 0, from.Px(CANVAS_SIZE), from.Px(CANVAS_SIZE))
	}

export default applyViewForGrid
