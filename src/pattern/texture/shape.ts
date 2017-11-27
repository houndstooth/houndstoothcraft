import { getSetting } from '../../app'
import { codeUtilities } from '../../utilities'
import { ShapeColorIndex } from '../color'
import { Outline } from '../stripe'
import solid from './solid'
import texture from './texture'
import { TextureSettings } from './textureSettings'
import { ShapeParams } from './types'

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

		const { executeTexture }: TextureSettings = getSetting.default('textureSettings')

		if (executeTexture) {
			texture({ outline, tileSize, executeTexture, shapeColorIndex })
		}
		else {
			solid({ outline, shapeColorIndex })
		}
	}

export default shape
