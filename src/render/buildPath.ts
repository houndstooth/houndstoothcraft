import { getCurrentContext } from '../canvas/getCurrentContext'
import { Path } from './types'

const buildPath: (_: { path: Path }) => void = ({ path }) => {
	const context = getCurrentContext()
	context.beginPath()
	context.moveTo(path[ 0 ][ 0 ], path[ 0 ][ 1 ])
	path.slice(1).forEach(pixel => context.lineTo(pixel[ 0 ], pixel[ 1 ]))
}

export { buildPath }
