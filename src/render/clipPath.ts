import { Context } from '../page'

const clipPath: (_: { context: Context }) => void = ({ context }) => {
	context.save()
	context.clip()
}

export default clipPath
