import { Context } from '../page'

const fillPath: { ({}: { context: Context }): void } = ({ context }) => {
	context.closePath()
	context.fill()
}

export default fillPath
