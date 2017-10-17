import { Context } from '../page'

const fillPath: (_: { context: Context }) => void = ({ context }) => {
	context.closePath()
	context.fill()
}

export default fillPath
