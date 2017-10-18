import { Context } from '../page'

const resetClip: (_: { context: Context }) => void = ({ context }) => context.restore()

export { resetClip }
