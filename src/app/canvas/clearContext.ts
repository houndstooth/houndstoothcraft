import { Context, Px } from '../page'

const clearContext: (_: { canvasSize: Px, context: Context }) => void =
	({ canvasSize, context }: { canvasSize: Px, context: Context }): void =>
		// tslint:disable-next-line:no-unsafe-any
		context.clearRect(0, 0, canvasSize, canvasSize)

export default clearContext
