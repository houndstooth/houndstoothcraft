import { resetClip, setClip } from '../../app'
import { codeUtilities } from '../../utilities'
import { ShapeColorIndex } from '../color'
import { patternState } from '../patternState'
import { Outline } from '../stripe'
import solid from './solid'
import { TextureSettings } from './textureSettings'
import { ShapeParams, TextureParams } from './types'

const shape: (_: ShapeParams) => void =
	({ tileOrigin, tileSize, shapeColorIndices, stripeIndex, getOutline, outlineOptions }: ShapeParams): void => {
		const outline: Outline = getOutline({ tileOrigin, tileSize, outlineOptions })
		if (!outline) {
			return
		}

		const shapeColorIndex: ShapeColorIndex = codeUtilities.wrappedIndex({
			array: shapeColorIndices,
			index: stripeIndex,
		})

		const { executeTexture }: TextureSettings = patternState.textureSettings

		if (executeTexture) {
			texture({ outline, tileSize, executeTexture, shapeColorIndex })
		}
		else {
			solid({ outline, shapeColorIndex })
		}
	}

const texture: (_: TextureParams) => void =
	({ outline, tileSize, executeTexture, shapeColorIndex }: TextureParams): void => {
		setClip.default({ outline })

		executeTexture({ shapeColorIndex, tileSize })

		resetClip.default()
	}

export default shape
