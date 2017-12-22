// tslint:disable:no-unsafe-any

import { from } from '../../../utilities'
import { getCurrentContext } from '../canvas'
import { Path, Pixel } from './types'

const createPath: (_: { path: Path }) => void =
	({ path }: { path: Path }): void => {
		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.beginPath()
		context.moveTo(from.Px(path[ 0 ][ 0 ]), from.Px(path[ 0 ][ 1 ]))
		path.slice(1).forEach((pixel: Pixel): void => {
			context.lineTo(from.Px(pixel[ 0 ]), from.Px(pixel[ 1 ]))
		})
	}

export default createPath
