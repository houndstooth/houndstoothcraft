import { Context } from '../page'

const resetClip: { ({}: { context: Context }): void } = ({ context }) => context.restore()

export default resetClip
