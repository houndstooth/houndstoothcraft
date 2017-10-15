import { Context } from '../page'

const clipPath: { ({}: { context: Context }): void } = ({ context }) => {
	context.save()
	context.clip()
}

export default clipPath
