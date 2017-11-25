// tslint:disable:no-unsafe-any

import { Context } from '../page'
import { main as getCurrentContext } from './getCurrentContext'
import { Path, Pixel } from './types'

const buildPath: (_: { path: Path }) => void =
	({ path }: { path: Path }): void => {
		const context: Context = getCurrentContext()
		context.beginPath()
		context.moveTo(path[ 0 ][ 0 ], path[ 0 ][ 1 ])
		path.slice(1).forEach((pixel: Pixel) => context.lineTo(pixel[ 0 ], pixel[ 1 ]))
	}

export { buildPath as main }
